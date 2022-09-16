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
RESOURCE_GROUP_NAME="${AZURE_RESOURCE_PREFIX}-${STAGE}-rg"

# create resource Group
az group create --name "$RESOURCE_GROUP_NAME" --location japaneast

az account set --subscription "$AZURE_SUBSCRIPTION_ID"
az configure -d group="$RESOURCE_GROUP_NAME"
#az storage account delete --name "$STORE_ACCOUNT_NAME" -y
az storage account create --name "$STORE_ACCOUNT_NAME"
az storage blob service-properties update --account-name "$STORE_ACCOUNT_NAME" --static-website --404-document 404.html --index-document index.html
az storage blob upload-batch --account-name "$STORE_ACCOUNT_NAME" --overwrite true -s ./public -d '$web'

#get and show static endpoint url
STATIC_ENDPOINT_URL=$(az storage account show -n ${STORE_ACCOUNT_NAME} --query "primaryEndpoints.web" --output tsv)
echo "Static endpoint: $STATIC_ENDPOINT_URL"

#create CDN and purge cache
CDN_PROFILE_NAME="${AZURE_RESOURCE_PREFIX}-${STAGE}-cdn"
CDN_ENDPOINT_NAME="${AZURE_RESOURCE_PREFIX}-${STAGE}-cdn-endpoint"
CDN_ORIGIN_HOST=$(sed 's/https:\/\///g;s/\///g' <<<"$STATIC_ENDPOINT_URL")

az cdn profile create -n "$CDN_PROFILE_NAME" --sku Standard_Microsoft
az cdn endpoint create --name "$CDN_ENDPOINT_NAME" --profile-name "$CDN_PROFILE_NAME" --origin "$CDN_ORIGIN_HOST" --origin-host-header "$CDN_ORIGIN_HOST"
#purge everything
az cdn endpoint purge --name "$CDN_ENDPOINT_NAME" --profile-name "$CDN_PROFILE_NAME" --no-wait --content-paths "/*"
#show CDN endpoint url
CDN_ENDPOINT_URL=$(az cdn endpoint show --profile-name ${CDN_PROFILE_NAME} --name ${CDN_ENDPOINT_NAME} --query "hostName" --output tsv)
echo "CDN endpoint: $CDN_ENDPOINT_URL"

# Azure logout
az logout
