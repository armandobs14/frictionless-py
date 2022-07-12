from __future__ import annotations
from typing import TYPE_CHECKING, Iterable, List, Type
from ..metadata import Metadata
from ..system import system
from .. import errors

if TYPE_CHECKING:
    from ..table import Row
    from ..error import Error
    from ..resource import Resource


# TODO: add support for validate_package/etc?
# TODO: sync API with Step (like "check.validate_resource_row")?
# TODO: API proposal: validate_package/resource=connect/resource_open/resource_row/resource_close
class Check(Metadata):
    """Check representation."""

    type: str = "check"
    # TODO: can it be just types not objects?
    Errors: List[Type[Error]] = []

    # Props

    @property
    def resource(self) -> Resource:
        """
        Returns:
            Resource?: resource object available after the `check.connect` call
        """
        return self.__resource

    # Connect

    def connect(self, resource: Resource):
        """Connect to the given resource

        Parameters:
            resource (Resource): data resource
        """
        self.__resource = resource

    # Validate

    def validate_start(self) -> Iterable[Error]:
        """Called to validate the resource after opening

        Yields:
            Error: found errors
        """
        yield from []

    def validate_row(self, row: Row) -> Iterable[Error]:
        """Called to validate the given row (on every row)

        Parameters:
            row (Row): table row

        Yields:
            Error: found errors
        """
        yield from []

    def validate_end(self) -> Iterable[Error]:
        """Called to validate the resource before closing

        Yields:
            Error: found errors
        """
        yield from []

    # Metadata

    metadata_Error = errors.CheckError

    @classmethod
    def metadata_import(cls, descriptor):
        if cls is Check:
            descriptor = cls.metadata_normalize(descriptor)
            return system.create_check(descriptor)  # type: ignore
        return super().metadata_import(descriptor)
