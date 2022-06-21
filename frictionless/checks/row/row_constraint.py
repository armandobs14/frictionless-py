import simpleeval
from dataclasses import dataclass
from ... import errors
from ...check import Check


@dataclass
class row_constraint(Check):
    """Check that every row satisfies a provided Python expression"""

    code = "row-constraint"
    Errors = [errors.RowConstraintError]

    # Properties

    formula: str
    """# TODO: add docs"""

    # Validate

    def validate_row(self, row):
        try:
            # This call should be considered as a safe expression evaluation
            # https://github.com/danthedeckie/simpleeval
            # NOTE: review EvalWithCompoundTypes/sync with steps
            evalclass = simpleeval.EvalWithCompoundTypes
            assert evalclass(names=row).eval(self.formula)
        except Exception:
            yield errors.RowConstraintError.from_row(
                row,
                note='the row constraint to conform is "%s"' % self.formula,
            )

    # Metadata

    metadata_profile = {  # type: ignore
        "type": "object",
        "requred": ["formula"],
        "properties": {
            "code": {},
            "formula": {"type": "string"},
        },
    }
