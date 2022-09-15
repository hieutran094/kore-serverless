#!/bin/sh
if [[ -z "$AZURE_SUBSCRIPTION_ID" ]]; then
    echo "Must provide AZURE_SUBSCRIPTION_ID in environment" 1>&2
    exit 1
fi
if [[ -z "$AZURE_RESOURCE_PREFIX" ]]; then
    echo "Must provide AZURE_RESOURCE_PREFIX in environment" 1>&2
    exit 1
fi
if [[ -z "$STAGE" ]]; then
    echo "Must provide STAGE in environment" 1>&2
    exit 1
fi

# remove [-_] character and convert to lower-case
RAW_NAME="${AZURE_RESOURCE_PREFIX//[-_]/}" 
STORE_ACCOUNT_NAME="${RAW_NAME,,}${STAGE}staticsa"

az account set --subscription "$AZURE_SUBSCRIPTION_ID"
az configure -d group="${AZURE_RESOURCE_PREFIX}-${STAGE}-rg"
#az storage account delete --name "$STORE_ACCOUNT_NAME" -y
az storage account create --name "$STORE_ACCOUNT_NAME"
az storage blob service-properties update --account-name "$STORE_ACCOUNT_NAME" --static-website --404-document 404.html --index-document index.html
az storage blob upload-batch --account-name "$STORE_ACCOUNT_NAME" --overwrite true -s ./public -d '$web'