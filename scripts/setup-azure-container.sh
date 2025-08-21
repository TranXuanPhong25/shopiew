#!/bin/bash
# filepath: scripts/setup-azure-container.sh

set -e

RESOURCE_GROUP="shopiew-rg"
LOCATION="Indonesia Central"
REGISTRY_NAME="shopiewregistry"
APP_SERVICE_PLAN="shopiew-plan"

echo "🐳 Setting up Azure Container Registry and Web Apps..."

# Create Container Registry
echo "📦 Creating Azure Container Registry: $REGISTRY_NAME"
az acr create \
    --resource-group $RESOURCE_GROUP \
    --name $REGISTRY_NAME \
    --sku Basic \
    --admin-enabled true \
    --location "$LOCATION"

# Get registry credentials
echo "🔑 Getting registry credentials..."
ACR_USERNAME=$(az acr credential show --name $REGISTRY_NAME --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name $REGISTRY_NAME --query passwords[0].value --output tsv)

echo "Registry Username: $ACR_USERNAME"
echo "Registry Password: $ACR_PASSWORD"

# Create Web Apps for Containers
apps=("main" "seller" "admin")
for app in "${apps[@]}"; do
    app_name="shopiew-$app"
    echo "🌐 Creating Web App for Container: $app_name"
    
    az webapp create \
        --resource-group $RESOURCE_GROUP \
        --plan $APP_SERVICE_PLAN \
        --name $app_name \
        --deployment-container-image-name "$REGISTRY_NAME.azurecr.io/shopiew-$app:latest"
    
    # Configure container settings
    az webapp config container set \
        --name $app_name \
        --resource-group $RESOURCE_GROUP \
        --docker-custom-image-name "$REGISTRY_NAME.azurecr.io/shopiew-$app:latest" \
        --docker-registry-server-url "https://$REGISTRY_NAME.azurecr.io" \
        --docker-registry-server-user $ACR_USERNAME \
        --docker-registry-server-password $ACR_PASSWORD
done

echo "✅ Azure Container setup completed!"
echo ""
echo "📋 Add these to GitHub Secrets:"
echo "   AZURE_REGISTRY_USERNAME: $ACR_USERNAME"
echo "   AZURE_REGISTRY_PASSWORD: $ACR_PASSWORD"