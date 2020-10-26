import os
import environ


env = environ.Env()

if env.str('DJANGO_SETTINGS_MODULE') == '{{cookiecutter.project_slug}}.settings':
    from .default import *
