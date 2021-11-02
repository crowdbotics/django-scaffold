import json

from pathlib import Path

GLOBAL_OPTIONS_FILE_PATH = f"{Path.cwd()}/modules/options.json"


def get_options(module_slug, option_key):
    with open(GLOBAL_OPTIONS_FILE_PATH, "r") as f:
        module_options = json.loads(f.read())

    option_value = [
        module.get(option_key)
        for module in module_options["module_options"]
        if module.get("slug") == module_slug
    ]

    # if option not in global options file then read default value from options.py
    return option_value[0] if option_value else "read from options.py"
