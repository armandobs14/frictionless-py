from frictionless import Package, helpers


IS_UNIX = not helpers.is_platform("windows")


# General


def test_describe_package():
    package = Package.describe("data/tables/chunk*.csv")
    assert package.metadata_valid
    if IS_UNIX:
        assert package == {
            "profile": "data-package",
            "resources": [
                {
                    "path": "data/tables/chunk1.csv",
                    "profile": "tabular-data-resource",
                    "name": "chunk1",
                    "scheme": "file",
                    "format": "csv",
                    "hashing": "md5",
                    "encoding": "utf-8",
                    "schema": {
                        "fields": [
                            {"name": "id", "type": "integer"},
                            {"name": "name", "type": "string"},
                        ]
                    },
                },
                {
                    "path": "data/tables/chunk2.csv",
                    "profile": "tabular-data-resource",
                    "name": "chunk2",
                    "scheme": "file",
                    "format": "csv",
                    "hashing": "md5",
                    "encoding": "utf-8",
                    "schema": {
                        "fields": [
                            {"name": "id", "type": "integer"},
                            {"name": "name", "type": "string"},
                        ]
                    },
                },
            ],
        }


def test_describe_package_with_stats():
    package = Package.describe("data/tables/chunk*.csv", stats=True)
    assert package.metadata_valid
    if IS_UNIX:
        assert package == {
            "profile": "data-package",
            "resources": [
                {
                    "path": "data/tables/chunk1.csv",
                    "profile": "tabular-data-resource",
                    "name": "chunk1",
                    "scheme": "file",
                    "format": "csv",
                    "hashing": "md5",
                    "encoding": "utf-8",
                    "schema": {
                        "fields": [
                            {"name": "id", "type": "integer"},
                            {"name": "name", "type": "string"},
                        ]
                    },
                    "stats": {
                        "hash": "8fff9d97e5c0cb77b7c469ec37c8e766",
                        "bytes": 18,
                        "fields": 2,
                        "rows": 1,
                    },
                },
                {
                    "path": "data/tables/chunk2.csv",
                    "profile": "tabular-data-resource",
                    "name": "chunk2",
                    "scheme": "file",
                    "format": "csv",
                    "hashing": "md5",
                    "encoding": "utf-8",
                    "schema": {
                        "fields": [
                            {"name": "id", "type": "integer"},
                            {"name": "name", "type": "string"},
                        ]
                    },
                    "stats": {
                        "hash": "ebfa07d04a148a92a18078f78468694d",
                        "bytes": 20,
                        "fields": 2,
                        "rows": 1,
                    },
                },
            ],
        }


def test_describe_package_basepath():
    package = Package.describe("chunk*.csv", basepath="data")
    assert package.get_resource("chunk1").path == "chunk1.csv"
    assert package.get_resource("chunk2").path == "chunk2.csv"
    assert package.get_resource("chunk1").basepath == "data"
    assert package.get_resource("chunk2").basepath == "data"


def test_describe_package_hashing():
    package = Package.describe("data/chunk*.csv", hashing="sha256", stats=True)
    assert package.get_resource("chunk1").hashing == "sha256"
    assert package.get_resource("chunk2").hashing == "sha256"
    if IS_UNIX:
        assert (
            package.get_resource("chunk1").stats["hash"]
            == "3872c98bd72eb4a91ac666f7758cd83da904c61a35178ca1ce9e10d6b009cd21"
        )
        assert (
            package.get_resource("chunk2").stats["hash"]
            == "556e92cdacfc46c2338ab0b88daf9d560c6760eac2d4cb6f7df589c108fc07ce"
        )


def test_describe_package_expand():
    package = Package.describe("data/chunk*.csv", expand=True)
    assert package.get_resource("chunk1").layout.header is True
    assert package.get_resource("chunk1").schema.missing_values == [""]


def test_describe_package_with_dialect_1126():
    package = Package.describe("data/country-2.csv", dialect={"delimiter": ";"})
    assert package.get_resource("country-2")["schema"] == {
        "fields": [
            {"type": "integer", "name": "id"},
            {"type": "integer", "name": "neighbor_id"},
            {"type": "string", "name": "name"},
            {"type": "integer", "name": "population"},
        ]
    }


def test_describe_package_with_dialect_path_1126():
    package = Package.describe("data/country-2.csv", dialect="data/dialect.json")
    assert package.get_resource("country-2")["schema"] == {
        "fields": [
            {"type": "integer", "name": "id"},
            {"type": "integer", "name": "neighbor_id"},
            {"type": "string", "name": "name"},
            {"type": "integer", "name": "population"},
        ]
    }


def test_describe_package_with_incorrect_dialect_1126():
    package = Package.describe("data/country-2.csv", dialect={"delimiter": ","})
    assert package.get_resource("country-2")["schema"] == {
        "fields": [{"type": "string", "name": "# Author: the scientist"}]
    }


def test_describe_package_with_glob_having_one_incorrect_dialect_1126():
    package = Package.describe("data/country-*.csv", dialect={"delimiter": ","})
    resource_1 = package.get_resource("country-1")
    resource_2 = package.get_resource("country-2")
    assert resource_1["schema"] == {
        "fields": [
            {"type": "integer", "name": "id"},
            {"type": "integer", "name": "neighbor_id"},
            {"type": "string", "name": "name"},
            {"type": "integer", "name": "population"},
        ]
    }
    assert resource_2["schema"] == {
        "fields": [{"type": "string", "name": "# Author: the scientist"}]
    }
