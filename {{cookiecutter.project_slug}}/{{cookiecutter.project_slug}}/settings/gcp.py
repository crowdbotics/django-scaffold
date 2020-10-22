import google.auth
from google.cloud import secretmanager_v1beta1 as sm

from .base import *


env_file = os.path.join(BASE_DIR,  ".env")
SETTINGS_NAME = "application_settings"

_, project = google.auth.default()

if project:
    client = sm.SecretManagerServiceClient()
    path = client.secret_version_path(project, SETTINGS_NAME, "latest")
    payload = client.access_secret_version(path).payload.data.decode("UTF-8")

    with open(env_file, "w") as f:
        f.write(payload)

env.read_env(env_file)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str("SECRET_KEY")

# Could be more explicitly set (see "Improvements")
ALLOWED_HOSTS = ["*"]

# Setting this value from django-environ
DATABASES = {"default": env.db()}

INSTALLED_APPS += ["storages"] # for django-storages

# Define static storage via django-storages[google]
GS_BUCKET_NAME = env("GS_BUCKET_NAME")
DEFAULT_FILE_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
STATICFILES_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
GS_DEFAULT_ACL = "publicRead"
