#!/bin/bash

cat > "home/migrations/0002_load_initial_data.py" << EOF
from django.db import migrations


def create_customtext(apps, schema_editor):
    CustomText = apps.get_model("home", "CustomText")
    customtext_title = "{{cookiecutter.project_name}}"

    CustomText.objects.create(title=customtext_title)


def create_homepage(apps, schema_editor):
    HomePage = apps.get_model("home", "HomePage")
    homepage_body = """
        <h1 class="display-4 text-center">{{cookiecutter.project_name}}</h1>
        <p class="lead">
            This is the sample application created and deployed from the Crowdbotics app.
            You can view list of packages selected for this application below.
        </p>"""

    HomePage.objects.create(body=homepage_body)


def create_site(apps, schema_editor):
    Site = apps.get_model('sites', 'Site')

    site, _ = Site.objects.get_or_create(
        name="{{cookiecutter.project_name}}",
        domain="{{cookiecutter.custom_domain}}" or site.domain,
    )


class Migration(migrations.Migration):

    dependencies = [("home", "0001_initial")]

    operations = [
        migrations.RunPython(create_customtext),
        migrations.RunPython(create_homepage),
        migrations.RunPython(create_site),
    ]
EOF

rm -- "$0"
