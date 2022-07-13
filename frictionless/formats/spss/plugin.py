from __future__ import annotations
from ...plugin import Plugin
from .control import SpssControl
from .parser import SpssParser


class SpssPlugin(Plugin):
    """Plugin for SPSS"""

    # Hooks

    def create_control(self, descriptor):
        if descriptor.get("type") == "spss":
            return SpssControl.from_descriptor(descriptor)

    def create_parser(self, resource):
        if resource.format in ["sav", "zsav"]:
            return SpssParser(resource)

    def detect_resource(self, resource):
        if resource.format in ["sav", "zsav"]:
            resource.type = "table"
