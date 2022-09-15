#!/bin/sh
if [[ -z "$AZURE_SUBSCRIPTION_ID" ]]; then
    echo "Must provide AZURE_SUBSCRIPTION_ID in environment" 1>&2
    exit 1
fi
if [[ -z "$STORAGE_ACCOUNT_NAME" ]]; then
    echo "Must provide STORAGE_ACCOUNT_NAME in environment" 1>&2
    exit 1
fi
if [[ -z "$RESOURCE_GROUP_NAME" ]]; then
    echo "Must provide STORAGE_ACCOUNT_NAME in environment" 1>&2
    exit 1
fi

az account set --subscription "$AZURE_SUBSCRIPTION_ID"
az configure -d group="$RESOURCE_GROUP_NAME"
az storage account delete --name "$STORAGE_ACCOUNT_NAME" -y
az storage account create --name "$STORAGE_ACCOUNT_NAME"
az storage blob service-properties update --account-name "$STORAGE_ACCOUNT_NAME" --static-website --404-document 404.html --index-document index.html
az storage blob upload-batch --account-name "$STORAGE_ACCOUNT_NAME" -s ./public -d '$web'