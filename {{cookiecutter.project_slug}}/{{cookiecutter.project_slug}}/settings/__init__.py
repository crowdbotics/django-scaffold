import os
import environ


env = environ.Env()

if env.str('DJANGO_SETTINGS_MODULE') == 'gcpscaffold.settings':
    from .default import *
