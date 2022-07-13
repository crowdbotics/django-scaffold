import importlib
import json

from pathlib import Path

GLOBAL_OPTIONS_FILE_PATH = f"{Path.cwd()}/modules/options.json"


def posixpath_to_modulepath(posixpath):
    module_parent_path = posixpath.parent.as_posix().replace("/", ".")
    return f"{module_parent_path}.{posixpath.stem}"


def get_options(module_slug, option_key):
    with open(GLOBAL_OPTIONS_FILE_PATH, "r") as f:
        all_module_options = json.loads(f.read())
        all_module_options = all_module_options.get("module_options", None)

    option_value = None

    if all_module_options:
        module_options = all_module_options.get(module_slug, None)
        if module_options:
            option_value = module_options.get(option_key, None)

    module_options_file = next(
        Path(".").rglob(f"**/{module_slug.replace('-', '_')}/**/options.py")
    )

    options_module = posixpath_to_modulepath(module_options_file)
    default_value = getattr(
        importlib.import_module(options_module), option_key
    )

    return option_value if option_value else default_value
