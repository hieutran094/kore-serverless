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
RESOURCE_GROUP_NAME="${AZURE_RESOURCE_PREFIX}-${STAGE}-rg"
COSMOSDB_NAME="${AZURE_RESOURCE_PREFIX}-${STAGE}-mongocosmosdb"
DATABASE_NAME="${AZURE_RESOURCE_PREFIX}-${STAGE}"

# create resource Group
az group create --name "$RESOURCE_GROUP_NAME" --location japaneast
az account set --subscription "$AZURE_SUBSCRIPTION_ID"
az configure -d group="$RESOURCE_GROUP_NAME"

# create cosmosdb
az cosmosdb create --name $COSMOSDB_NAME --kind MongoDB --locations regionName=koreacentral

#create database
az cosmosdb mongodb database create --account-name $COSMOSDB_NAME --name $DATABASE_NAME

# Azure logout
az logout
