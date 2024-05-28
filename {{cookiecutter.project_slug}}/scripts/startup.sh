#!/bin/bash

python manage.py migrate --noinput

waitress-serve --port=$PORT {{cookiecutter.project_slug}}.wsgi:application
