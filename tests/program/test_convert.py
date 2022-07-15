from typer.testing import CliRunner
from frictionless import program


runner = CliRunner()


def test_program_convert_yaml():
    result = runner.invoke(program, "convert data/datapackage.json --yaml")
    assert result.exit_code == 0

    # Read
    output_file_path = "data/fixtures/convert/package.yaml"
    with open(output_file_path, encoding="utf-8") as file:
        assert result.stdout.count(file.read().strip())


def test_program_convert_markdown():
    result = runner.invoke(program, "convert data/datapackage.json --markdown")
    assert result.exit_code == 0

    # Read
    output_file_path = "data/fixtures/convert/package.md"
    with open(output_file_path, encoding="utf-8") as file:
        assert result.stdout.count(file.read().strip())


def test_program_convert_yaml_with_path(tmpdir):

    # Write
    output_file_path = f"{tmpdir}/package.yaml"
    result = runner.invoke(
        program, f"convert data/datapackage.json --path {output_file_path} --yaml"
    )
    assert result.exit_code == 0

    # Read
    output_file_path = "data/fixtures/convert/package.yaml"
    with open(output_file_path, encoding="utf-8") as file:
        assert result.stdout.count(file.read().strip())


def test_program_convert_markdown_with_path(tmpdir):

    # Write
    output_file_path = f"{tmpdir}/package.md"
    result = runner.invoke(
        program, f"convert data/datapackage.json --path {output_file_path} --markdown"
    )
    assert result.exit_code == 0

    # Read
    output_file_path = "data/fixtures/convert/package.md"
    with open(output_file_path, encoding="utf-8") as file:
        assert result.stdout.count(file.read().strip())


def test_program_convert_er_diagram(tmpdir):

    # Write
    output_file_path = f"{tmpdir}/package.dot"
    result = runner.invoke(
        program, f"convert data/datapackage.json --path {output_file_path} --er-diagram"
    )
    assert result.exit_code == 0

    # Read
    expected_file_path = "data/fixtures/convert/package.dot"
    with open(expected_file_path, encoding="utf-8") as file:
        expected = file.read()
    with open(output_file_path, encoding="utf-8") as file:
        assert expected.strip() == file.read().strip()


def test_program_convert_yaml_without_source():
    result = runner.invoke(program, "convert")
    assert result.exit_code == 1
    assert result.stdout.count('Providing package "source" is required')


def test_program_convert_yaml_without_target():
    result = runner.invoke(program, "convert data/datapackage.json ")
    assert result.exit_code == 1
    assert result.stdout.count("No target specified. For example --yaml")


def test_program_convert_with_wrong_source_file():
    result = runner.invoke(program, "convert data/datapackages.json --yaml")
    assert result.exit_code == 1
    assert result.stdout.count("Errno 2] No such file or directory")
