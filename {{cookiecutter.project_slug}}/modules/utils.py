import importlib
import json

from pathlib import Path

GLOBAL_OPTIONS_FILE_PATH = f"{Path.cwd()}/modules/options.json"


def get_options(module_slug, option_key):
    with open(GLOBAL_OPTIONS_FILE_PATH, "r") as f:
        all_module_options = json.loads(f.read())
        all_module_options = all_module_options["module_options"]

    option_value = all_module_options[module_slug].get(option_key, False)

    default_value = getattr(
        importlib.import_module(f"modules.{module_slug}.options"), option_key
    )

    return option_value if option_value else default_value
