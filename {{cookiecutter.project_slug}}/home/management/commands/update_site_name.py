from django.contrib.sites.models import Site
from django.core.management import BaseCommand


def update_site_name():
    custom_domain = "{{cookiecutter.custom_domain}}"

    site_params = {
        "name": "{{cookiecutter.project_name}}",
    }
    if custom_domain:
        site_params["domain"] = custom_domain

    Site.objects.update_or_create(defaults=site_params, id=1)


class Command(BaseCommand):
    can_import_settings = True
    help = "Load initial data to db"

    def handle(self, *args, **options):
        update_site_name()
