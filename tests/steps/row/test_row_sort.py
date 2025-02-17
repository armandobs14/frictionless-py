from frictionless import Resource, transform, steps


# General


def test_step_row_sort():
    source = Resource("data/transform.csv")
    target = transform(
        source,
        steps=[
            steps.row_sort(field_names=["name"]),
        ],
    )
    assert target.schema == {
        "fields": [
            {"name": "id", "type": "integer"},
            {"name": "name", "type": "string"},
            {"name": "population", "type": "integer"},
        ]
    }
    assert target.read_rows() == [
        {"id": 2, "name": "france", "population": 66},
        {"id": 1, "name": "germany", "population": 83},
        {"id": 3, "name": "spain", "population": 47},
    ]


def test_step_row_sort_with_reverse():
    source = Resource("data/transform.csv")
    target = transform(
        source,
        steps=[
            steps.row_sort(field_names=["id"], reverse=True),
        ],
    )
    assert target.schema == {
        "fields": [
            {"name": "id", "type": "integer"},
            {"name": "name", "type": "string"},
            {"name": "population", "type": "integer"},
        ]
    }
    assert target.read_rows() == [
        {"id": 3, "name": "spain", "population": 47},
        {"id": 2, "name": "france", "population": 66},
        {"id": 1, "name": "germany", "population": 83},
    ]


def test_step_row_sort_with_reverse_in_desriptor_issue_996():
    source = Resource("data/transform.csv")
    target = transform(
        source,
        steps=[
            steps.row_sort({"fieldNames": ["id"], "reverse": True}),
        ],
    )
    assert target.schema == {
        "fields": [
            {"name": "id", "type": "integer"},
            {"name": "name", "type": "string"},
            {"name": "population", "type": "integer"},
        ]
    }
    assert target.read_rows() == [
        {"id": 3, "name": "spain", "population": 47},
        {"id": 2, "name": "france", "population": 66},
        {"id": 1, "name": "germany", "population": 83},
    ]
