import importlib
import json

from pathlib import Path

GLOBAL_OPTIONS_FILE_PATH = f"{Path.cwd()}/modules/options.json"


def get_options(module_slug, option_key):
    with open(GLOBAL_OPTIONS_FILE_PATH, "r") as f:
        all_module_options = json.loads(f.read())
        all_module_options = all_module_options.get("module_options", None)

    option_value = None

    if all_module_options:
        module_options = all_module_options.get(model_slug, None)
        if module_options:
            option_value = module_options.get(option_key, None)

    default_value = getattr(
        importlib.import_module(f"modules.{module_slug}.options"), option_key
    )

    return option_value if option_value else default_value
