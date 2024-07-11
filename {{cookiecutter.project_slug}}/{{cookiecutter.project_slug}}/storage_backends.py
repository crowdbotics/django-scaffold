from django.conf import settings
from storages.backends.azure_storage import AzureStorage

class AzureStaticStorage(AzureStorage):
    azure_container = settings.AS_STATIC_CONTAINER
    expiration_secs = None

class AzureMediaStorage(AzureStorage):
    azure_container = settings.AS_MEDIA_CONTAINER
