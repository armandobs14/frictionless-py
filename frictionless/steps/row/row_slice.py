from __future__ import annotations
import attrs
from typing import Optional
from ...pipeline import Step


# NOTE:
# We need to review simpleeval perfomance for using it with row_filter
# Currently, metadata profiles are not fully finished; will require improvements


@attrs.define(kw_only=True)
class row_slice(Step):
    """Slice rows"""

    type = "row-slice"

    # State

    start: Optional[int] = None
    """TODO: add docs"""

    stop: Optional[int] = None
    """TODO: add docs"""

    step: Optional[int] = None
    """TODO: add docs"""

    head: Optional[int] = None
    """TODO: add docs"""

    tail: Optional[int] = None
    """TODO: add docs"""

    # Transform

    def transform_resource(self, resource):
        table = resource.to_petl()
        if self.head:
            resource.data = table.head(self.head)  # type: ignore
        elif self.tail:
            resource.data = table.tail(self.tail)  # type: ignore
        else:
            resource.data = table.rowslice(self.start, self.stop, self.step)  # type: ignore

    # Metadata

    metadata_profile_patch = {
        "properties": {
            "start": {},
            "stop": {},
            "step": {},
            "head": {},
            "tail": {},
        },
    }
