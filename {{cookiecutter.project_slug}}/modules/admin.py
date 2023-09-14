from importlib import import_module
from pathlib import Path

from .utils import posixpath_to_modulepath

# BE CAREFUL! Do not remove or change this code snippet, this is needed to get
# Crowdbotics' official modules working properly.

try:
    admins = Path(".").rglob("admin.py")

    for admin in admins:
        module = import_module(posixpath_to_modulepath(admin), package="modules")
        from module import *  # noqa
except (ImportError, IndexError):
    pass
