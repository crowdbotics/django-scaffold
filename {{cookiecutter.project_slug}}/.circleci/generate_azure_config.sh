#!/bin/bash
set -o pipefail

BACKEND_PATH=$1

mkdir configs/
cat <<EOF >configs/generated_config.yml
version: 2.1

executors:
  python-executor:
    docker:
      - image: circleci/python:3.9

jobs:
  build:
    executor: python-executor
    steps:
      - checkout
      - setup_remote_docker:
          version: 20.10.7
          docker_layer_caching: true
      - run:
          name: Install Azure CLI
          command: |
            curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
      
      - run:
          name: Build Docker image
          command: docker build -t "$AZURE_REGISTRY_NAME.azurecr.io/$AZURE_APP_NAME:latest" --build-arg SECRET_KEY="build" "."
      - run:
          name: Login to Azure Container Registry
          command: |
            az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
            az acr login --name $AZURE_REGISTRY_NAME
      - run:
          name: Push Docker image to ACR
          command: docker push "$AZURE_REGISTRY_NAME.azurecr.io/$AZURE_APP_NAME:latest"
      - run:
          name: Webhook Failed
          command: bash "$BACKEND_PATH.circleci/webhook_callback.sh" "failure"
          when: on_fail

  deploy:
    executor: python-executor
    steps:
      - checkout
      - run:
          name: Install Azure CLI
          command: |
            curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
      - run:
          name: Login to Azure
          command: |
            az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
      - run:
          name: Set Azure subscription
          command: |
            az account set --subscription $AZURE_SUBSCRIPTION_ID
      - run:
          name: Deploy to Azure App Service
          command: |
            az webapp config container set --name $AZURE_APP_NAME --resource-group $AZURE_RESOURCE_GROUP_NAME --container-image-name "$AZURE_REGISTRY_NAME.azurecr.io/$AZURE_APP_NAME:latest" --container-registry-url "https://$AZURE_REGISTRY_NAME.azurecr.io"
      - run:
          name: Restart App Service
          command: |
            az webapp restart --name $AZURE_APP_NAME --resource-group $AZURE_RESOURCE_GROUP_NAME
      - run:
          name: Webhook Success
          command: bash "$BACKEND_PATH.circleci/webhook_callback.sh" "success"
          when: on_success

      - run:
          name: Webhook Failed
          command: bash "$BACKEND_PATH.circleci/webhook_callback.sh" "failure"
          when: on_fail

workflows:
  version: 2
  build_and_deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build

EOF
