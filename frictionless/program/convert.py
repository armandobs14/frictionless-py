import typer
from .main import program
from ..package import Package
from . import common


@program.command(name="convert")
def program_convert(
    # Source
    source: str = common.source,
    path: str = common.output_file_path,
    # Command
    yaml: bool = common.yaml,
    er_diagram: bool = common.er_diagram,
    markdown: bool = common.markdown,
):
    """Convert metadata to various output"""

    # Validate input
    if not source:
        message = 'Providing package "source" is required'
        typer.secho(message, err=True, fg=typer.colors.RED, bold=True)
        raise typer.Exit(1)

    # Initialize Package
    try:
        package = Package(source)
    except Exception as exception:
        typer.secho(str(exception), err=True, fg=typer.colors.RED, bold=True)
        raise typer.Exit(1)

    # Return yaml
    if yaml:
        content = package.to_yaml(path)
        typer.secho(content)
        raise typer.Exit()

    # Return ER Diagram
    if er_diagram:
        content = package.to_er_diagram(path)
        typer.secho(content)
        raise typer.Exit()

    # Return markdown
    if markdown:
        content = package.to_markdown(path)
        typer.secho(content)
        raise typer.Exit()

    # Return retcode
    message = "No target specified. For example --yaml"
    typer.secho(message, err=True, fg=typer.colors.RED, bold=True)
    raise typer.Exit(1)
