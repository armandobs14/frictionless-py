import pytest
from frictionless import Package, Resource, Layout, helpers
from frictionless import FrictionlessException


IS_UNIX = not helpers.is_platform("windows")
BASEURL = "https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/%s"


# Resources


def test_package_resources():
    package = Package("data/package.json")
    assert package.name == "name"
    assert package.basepath == "data"
    assert package.profile == "data-package"
    assert package.resources == [
        {"name": "name", "path": "table.csv"},
    ]


def test_package_resources_inline():
    data = [["id", "name"], ["1", "english"], ["2", "中国人"]]
    package = Package({"resources": [{"name": "name", "data": data}]})
    resource = package.get_resource("name")
    assert len(package.resources) == 1
    assert resource.path is None
    assert resource.data == data
    assert resource.fullpath is None
    assert resource.read_rows() == [
        {"id": 1, "name": "english"},
        {"id": 2, "name": "中国人"},
    ]


def test_package_resources_empty():
    package = Package()
    assert package.resources == []


def test_package_add_resource():
    package = Package({})
    resource = package.add_resource({"name": "name", "data": []})
    assert len(package.resources) == 1
    assert package.resources[0].name == "name"
    assert resource.name == "name"


def test_package_get_resource():
    package = Package("data/package/datapackage.json")
    resource = package.get_resource("data")
    assert resource.name == "data"


def test_package_get_resource_error_not_found():
    package = Package("data/package/datapackage.json")
    with pytest.raises(FrictionlessException) as excinfo:
        package.get_resource("bad")
    error = excinfo.value.error
    assert error.code == "package-error"
    assert error.note == 'resource "bad" does not exist'


def test_package_remove_resource():
    package = Package("data/package/datapackage.json")
    resource = package.remove_resource("data")
    assert package.resource_names == ["data2"]
    assert resource.name == "data"


def test_package_remove_resource_error_not_found():
    package = Package("data/package/datapackage.json")
    with pytest.raises(FrictionlessException) as excinfo:
        package.remove_resource("bad")
    error = excinfo.value.error
    assert error.code == "package-error"
    assert error.note == 'resource "bad" does not exist'


def test_package_update_resource():
    data = [["id", "name"], ["1", "english"], ["2", "中国人"]]
    package = Package({"resources": [{"name": "name", "data": data}]})
    resource = package.get_resource("name")
    resource.name = "newname"
    assert package == {"resources": [{"name": "newname", "data": data}]}


def test_package_resources_append_in_place():
    data = [["id", "name"], ["1", "english"], ["2", "中国人"]]
    package = Package({"resources": []})
    package.resources.append({"name": "newname", "data": data})
    assert package == {"resources": [{"name": "newname", "data": data}]}


def test_package_resources_remove_in_place():
    data = [["id", "name"], ["1", "english"], ["2", "中国人"]]
    package = Package({"resources": [{"name": "newname", "data": data}]})
    del package.resources[0]
    assert package == {"resources": []}


def test_package_resources_respect_layout_set_after_creation_issue_503():
    package = Package(resources=[Resource(path="data/table.csv")])
    resource = package.get_resource("table")
    resource.layout = Layout(limit_rows=1)
    assert resource.read_rows() == [{"id": 1, "name": "english"}]
    assert resource.header == ["id", "name"]
