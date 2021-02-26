import os
import shutil
import sys

REMOVE_PATHS = [
    '{% if cookiecutter.is_mobile != "y" %} web_build {% endif %}',
]

for path in REMOVE_PATHS:
    path = path.strip()
    if not path or not os.path.exists(path):
        continue
    if os.path.isdir(path):
        shutil.rmtree(path)
    else:
        os.unlink(path)