from frictionless import validate, checks
import pytest
import sys


# Issues


def test_validate_ascii_value_845():
    report = validate(
        "data/ascii.csv",
        checks=[checks.ascii_value()],
    )
    assert report.flatten(["rowPosition", "fieldPosition", "code"]) == []


def test_validate_ascii_value_descriptor_845():
    report = validate(
        "data/ascii.csv",
        checks=[{"code": "ascii-value"}],
    )
    assert report.flatten(["rowPosition", "fieldPosition", "code"]) == []


@pytest.mark.skipif(sys.version_info < (3, 7), reason="requires python3.7 or higher")
def test_validate_ascii_not_valid_845():
    report = validate(
        "data/ascii-notvalid.csv",
        checks=[checks.ascii_value()],
    )
    assert report.flatten(["rowPosition", "fieldPosition", "code"]) == [
        [2, 2, "non-ascii"],
        [2, 3, "non-ascii"],
    ]
