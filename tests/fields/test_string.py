import pytest
from frictionless import Field2


# General


@pytest.mark.parametrize(
    "format, source, target",
    [
        ("default", "string", "string"),
        ("default", "", None),
        ("default", 0, None),
        ("uri", "http://google.com", "http://google.com"),
        ("uri", "://no-scheme.test", None),
        ("uri", "string", None),
        ("uri", "", None),
        ("uri", 0, None),
        ("email", "name@gmail.com", "name@gmail.com"),
        ("email", "http://google.com", None),
        ("email", "string", None),
        ("email", "", None),
        ("email", 0, None),
        ("binary", "dGVzdA==", "dGVzdA=="),
        ("binary", "", None),
        ("binary", "string", None),
        ("binary", 0, None),
    ],
)
def test_string_read_cell(format, source, target):
    field = Field2.from_descriptor({"name": "name", "type": "string", "format": format})
    cell, _ = field.read_cell(source)
    assert cell == target
