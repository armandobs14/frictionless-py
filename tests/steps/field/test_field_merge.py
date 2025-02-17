from frictionless import Resource, transform, steps


def test_step_field_merge_907():
    source = Resource("data/transform.csv")
    target = transform(
        source,
        steps=[steps.field_merge(name="details", from_names=["name", "population"])],
    )
    assert target.schema == {
        "fields": [
            {"name": "id", "type": "integer"},
            {"name": "details", "type": "string"},
        ]
    }
    assert target.read_rows()[0] == {
        "id": 1,
        "details": "germany-83",
    }


def test_step_field_merge_preserve_907():
    source = Resource("data/transform.csv")
    target = transform(
        source,
        steps=[
            steps.field_merge(
                name="details", from_names=["name", "population"], preserve=True
            )
        ],
    )
    assert target.schema == {
        "fields": [
            {"name": "id", "type": "integer"},
            {"name": "name", "type": "string"},
            {"name": "population", "type": "integer"},
            {"name": "details", "type": "string"},
        ]
    }
    assert target.read_rows()[0] == {
        "id": 1,
        "name": "germany",
        "population": 83,
        "details": "germany-83",
    }
