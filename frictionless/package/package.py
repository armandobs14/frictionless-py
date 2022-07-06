from __future__ import annotations
import os
import json
import glob
import jinja2
import zipfile
import tempfile
from pathlib import Path
from copy import deepcopy
from collections.abc import Mapping
from typing import TYPE_CHECKING, Optional, List, Any
from ..exception import FrictionlessException
from ..metadata import Metadata
from ..detector import Detector
from ..resource import Resource
from ..system import system
from .. import settings
from .. import helpers
from .. import errors
from .. import fields
from . import methods

if TYPE_CHECKING:
    from ..interfaces import IDescriptorSource, IOnerror


# TODO: add create_package hook
class Package(Metadata):
    """Package representation

    This class is one of the cornerstones of of Frictionless framework.
    It manages underlaying resource and provides an ability to describe a package.

    ```python
    package = Package(resources=[Resource(path="data/table.csv")])
    package.get_resoure('table').read_rows() == [
        {'id': 1, 'name': 'english'},
        {'id': 2, 'name': '中国人'},

    ```

    """

    describe = methods.describe
    extract = methods.extract
    transform = methods.transform
    validate = methods.validate

    def __init__(
        self,
        source: Optional[Any] = None,
        *,
        # Standard
        resources: List[Resource] = [],
        id: Optional[str] = None,
        name: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        profiles: List[str] = [],
        licenses: List[dict] = [],
        sources: List[dict] = [],
        homepage: Optional[str] = None,
        version: Optional[str] = None,
        contributors: List[dict] = [],
        keywords: List[str] = [],
        image: Optional[str] = None,
        created: Optional[str] = None,
        # Software
        innerpath: str = settings.DEFAULT_PACKAGE_INNERPATH,
        basepath: str = settings.DEFAULT_BASEPATH,
        onerror: IOnerror = settings.DEFAULT_ONERROR,
        trusted: bool = settings.DEFAULT_TRUSTED,
        detector: Optional[Detector] = None,
    ):

        # Store state
        self.resources = resources.copy()
        self.id = id
        self.name = name
        self.title = title
        self.description = description
        self.profiles = profiles.copy()
        self.licenses = licenses.copy()
        self.sources = sources.copy()
        self.homepage = homepage
        self.version = version
        self.contributors = contributors.copy()
        self.keywords = keywords.copy()
        self.image = image
        self.created = created
        self.innerpath = innerpath
        self.basepath = basepath
        self.onerror = onerror
        self.trusted = trusted
        self.detector = detector or Detector()

        # Connect resources
        for resource in self.resources:
            resource.package = self

        # Handled by __create__
        assert source is None

    # TODO: support list of paths
    @classmethod
    def __create__(cls, source: Optional[Any] = None, **options):
        if source is not None:

            # Path
            if isinstance(source, Path):
                source = str(source)

            # Mapping
            elif isinstance(source, Mapping):
                source = {key: value for key, value in source.items()}

            # Compressed
            elif helpers.is_zip_descriptor(source):
                innerpath = options.get("innerpath", settings.DEFAULT_PACKAGE_INNERPATH)
                source = helpers.unzip_descriptor(source, innerpath)

            # Expandable
            elif isinstance(source, str) and helpers.is_expandable_path(source):
                options["resources"] = []
                pattern = f"{source}/*" if os.path.isdir(source) else source
                configs = {"recursive": True} if "**" in pattern else {}
                for path in sorted(glob.glob(pattern, **configs)):
                    options["resources"].append({"path": path})

            # Descriptor
            options.setdefault("trusted", False)
            return Package.from_descriptor(source, **options)

    # State

    resources: List[Resource]
    """
    A list of resource descriptors.
    It can be dicts or Resource instances
    """

    id: Optional[str]
    """
    A property reserved for globally unique identifiers.
    Examples of identifiers that are unique include UUIDs and DOIs.
    """

    name: Optional[str]
    """
    A short url-usable (and preferably human-readable) name.
    This MUST be lower-case and contain only alphanumeric characters
    along with “.”, “_” or “-” characters.
    """

    title: Optional[str]
    """
    A Package title according to the specs
    It should a human-oriented title of the resource.
    """

    description: Optional[str]
    """
    A Package description according to the specs
    It should a human-oriented description of the resource.
    """

    profiles: List[str]
    """
    A strings identifying the profiles of this descriptor.
    For example, `fiscal-data-package`.
    """

    licenses: List[dict]
    """
    The license(s) under which the package is provided.
    """

    sources: List[dict]
    """
    The raw sources for this data package.
    It MUST be an array of Source objects.
    Each Source object MUST have a title and
    MAY have path and/or email properties.
    """

    homepage: Optional[str]
    """
    A URL for the home on the web that is related to this package.
    For example, github repository or ckan dataset address.
    """

    version: Optional[str]
    """
    A version string identifying the version of the package.
    It should conform to the Semantic Versioning requirements and
    should follow the Data Package Version pattern.
    """

    contributors: List[dict]
    """
    The people or organizations who contributed to this package.
    It MUST be an array. Each entry is a Contributor and MUST be an object.
    A Contributor MUST have a title property and MAY contain
    path, email, role and organization properties.
    """

    keywords: List[str]
    """
    An Array of string keywords to assist users searching.
    For example, ['data', 'fiscal']
    """

    image: Optional[str]
    """
    An image to use for this data package.
    For example, when showing the package in a listing.
    """

    created: Optional[str]
    """
    The datetime on which this was created.
    The datetime must conform to the string formats for RFC3339 datetime,
    """

    innerpath: str
    """
    A ZIP datapackage descriptor inner path.
    Path to the package descriptor inside the ZIP datapackage.
    Example: some/folder/datapackage.yaml
    Default: datapackage.json
    """

    basepath: str
    """
    A basepath of the resource
    The fullpath of the resource is joined `basepath` and /path`
    """

    onerror: IOnerror
    """
    Behaviour if there is an error.
    It defaults to 'ignore'. The default mode will ignore all errors
    on resource level and they should be handled by the user
    being available in Header and Row objects.
    """

    trusted: bool
    """
    Don't raise an exception on unsafe paths.
    A path provided as a part of the descriptor considered unsafe
    if there are path traversing or the path is absolute.
    A path provided as `source` or `path` is alway trusted.
    """

    detector: Detector
    """
    File/table detector.
    For more information, please check the Detector documentation.
    """

    # Props

    @property
    def description_html(self):
        """Package description in HTML"""
        return helpers.md_to_html(self.description)

    @property
    def description_text(self):
        """Package description in Text"""
        return helpers.html_to_text(self.description_html)

    @property
    def resource_names(self):
        """Return names of resources"""
        return [resource.name for resource in self.resources]

    # Resources

    def add_resource(self, resource: Resource) -> None:
        """Add new resource to the package"""
        self.resources.append(resource)
        resource.package = self

    def has_resource(self, name: str) -> bool:
        """Check if a resource is present"""
        for resource in self.resources:
            if resource.name == name:
                return True
        return False

    def get_resource(self, name: str) -> Resource:
        """Get resource by name"""
        for resource in self.resources:
            if resource.name == name:
                return resource
        error = errors.PackageError(note=f'resource "{name}" does not exist')
        raise FrictionlessException(error)

    def set_resource(self, resource: Resource) -> Optional[Resource]:
        """Set resource by name"""
        assert resource.name
        if self.has_resource(resource.name):
            prev_resource = self.get_resource(resource.name)
            index = self.resources.index(prev_resource)
            self.resources[index] = resource
            resource.package = self
            return prev_resource
        self.add_resource(resource)

    def remove_resource(self, name: str) -> Resource:
        """Remove resource by name"""
        resource = self.get_resource(name)
        self.resources.remove(resource)
        return resource

    def clear_resources(self):
        """Remove all the resources"""
        self.resources = []

    # Infer

    def infer(self, *, stats=False):
        """Infer package's attributes

        Parameters:
            stats? (bool): stream files completely and infer stats
        """

        # General
        self.setdefault("profile", settings.DEFAULT_PACKAGE_PROFILE)
        for resource in self.resources:
            resource.infer(stats=stats)

        # Deduplicate names
        if len(self.resource_names) != len(set(self.resource_names)):
            seen_names = []
            for index, name in enumerate(self.resource_names):
                count = seen_names.count(name) + 1
                if count > 1:
                    self.resources[index].name = "%s%s" % (name, count)
                seen_names.append(name)

    # Convert

    def to_copy(self):
        """Create a copy of the package"""
        return super().to_copy(
            resources=[resource.to_copy() for resource in self.resources],
            basepath=self.basepath,
            onerror=self.onerror,
            trusted=self.trusted,
            detector=self.detector,
        )

    @classmethod
    def from_descriptor(cls, descriptor: IDescriptorSource, **options):
        if isinstance(descriptor, str):
            options["basepath"] = helpers.parse_basepath(descriptor)
        descriptor = super().metadata_normalize(descriptor)

        # Profile
        profile = descriptor.pop("profile", None)
        if profile:
            descriptor.setdefault("profiles", [])
            descriptor["profiles"].append(profile)

        return super().from_descriptor(descriptor, **options)

    def to_descriptor(self, *, exclude=[]):
        descriptor = super().to_descriptor(exclude=exclude)
        if system.standards_version == "v1":

            # Profile
            profiles = descriptor.pop("profiles", None)
            if profiles:
                descriptor["profile"] = profiles[0]

        return descriptor

    # TODO: if path is not provided return as a string
    def to_er_diagram(self, path=None) -> str:
        """Generate ERD(Entity Relationship Diagram) from package resources
        and exports it as .dot file

        Based on:
        - https://github.com/frictionlessdata/frictionless-py/issues/1118

        Parameters:
            path (str): target path

        Returns:
            path(str): location of the .dot file

        """

        # Render diagram
        template_dir = os.path.join(os.path.dirname(__file__), "../assets/templates/erd")
        environ = jinja2.Environment(
            loader=jinja2.FileSystemLoader(template_dir),
            lstrip_blocks=True,
            trim_blocks=True,
        )
        table_template = environ.get_template("table.html")
        field_template = environ.get_template("field.html")
        primary_key_template = environ.get_template("primary_key_field.html")
        graph = environ.get_template("graph.html")
        edges = []
        nodes = []
        for t_name in self.resource_names:
            resource = self.get_resource(t_name)
            templates = {k: primary_key_template for k in resource.schema.primary_key}
            t_fields = [
                templates.get(f.name, field_template).render(name=f.name, type=f.type)
                for f in resource.schema.fields
            ]
            nodes.append(table_template.render(name=t_name, rows="".join(t_fields)))
            child_table = t_name
            for fk in resource.schema.foreign_keys:
                for foreign_key in fk["fields"]:
                    if fk["reference"]["resource"] == "":
                        continue
                    parent_table = fk["reference"]["resource"]
                    for parent_primary_key in fk["reference"]["fields"]:
                        edges.append(
                            f'"{parent_table}":{parent_primary_key}n -> "{child_table}":{foreign_key}n;'
                        )
        text = graph.render(
            name=self.name,
            tables="\n\t".join(nodes),
            edges="\n\t".join(edges),
        )

        # Write diagram
        path = path if path else "package.dot"
        try:
            helpers.write_file(path, text)
        except Exception as exc:
            raise FrictionlessException(self.__Error(note=str(exc))) from exc

        return path

    @staticmethod
    def from_bigquery(source, *, control=None):
        """Import package from Bigquery

        Parameters:
            source (string): BigQuery `Service` object
            control (dict): BigQuery control

        Returns:
            Package: package
        """
        storage = system.create_storage("bigquery", source, control=control)
        return storage.read_package()

    def to_bigquery(self, target, *, control=None):
        """Export package to Bigquery

        Parameters:
            target (string): BigQuery `Service` object
            control (dict): BigQuery control

        Returns:
            BigqueryStorage: storage
        """
        storage = system.create_storage("bigquery", target, control=control)
        storage.write_package(self.to_copy(), force=True)
        return storage

    @staticmethod
    def from_ckan(source, *, control=None):
        """Import package from CKAN

        Parameters:
            source (string): CKAN instance url e.g. "https://demo.ckan.org"
            control (dict): CKAN control

        Returns:
            Package: package
        """
        storage = system.create_storage("ckan", source, control=control)
        return storage.read_package()

    def to_ckan(self, target, *, control=None):
        """Export package to CKAN

        Parameters:
            target (string): CKAN instance url e.g. "https://demo.ckan.org"
            control (dict): CKAN control

        Returns:
            CkanStorage: storage
        """
        storage = system.create_storage("ckan", target, control=control)
        storage.write_package(self.to_copy(), force=True)
        return storage

    @staticmethod
    def from_sql(source, *, control=None):
        """Import package from SQL

        Parameters:
            source (any): SQL connection string of engine
            control (dict): SQL control

        Returns:
            Package: package
        """
        storage = system.create_storage("sql", source, control=control)
        return storage.read_package()

    def to_sql(self, target, *, control=None):
        """Export package to SQL

        Parameters:
            target (any): SQL connection string of engine
            control (dict): SQL control

        Returns:
            SqlStorage: storage
        """
        storage = system.create_storage("sql", target, control=control)
        storage.write_package(self.to_copy(), force=True)
        return storage

    @staticmethod
    def from_zip(path, **options):
        """Create a package from ZIP

        Parameters:
            path(str): file path
            **options(dict): resouce options
        """
        return Package(descriptor=path, **options)

    def to_zip(self, path, *, encoder_class=None, compression=zipfile.ZIP_DEFLATED):
        """Save package to a zip

        Parameters:
            path (str): target path
            encoder_class (object): json encoder class
            compression (int): the ZIP compression method to use when
                writing the archive. Possible values are the ones supported
                by Python's `zipfile` module.

        Raises:
            FrictionlessException: on any error
        """
        try:
            with zipfile.ZipFile(path, "w", compression=compression) as archive:
                package_descriptor = self.to_dict()
                for index, resource in enumerate(self.resources):
                    descriptor = package_descriptor["resources"][index]

                    # Remote data
                    if resource.remote:
                        pass

                    # Memory data
                    elif resource.memory:
                        if not isinstance(resource.data, list):
                            path = f"{resource.name}.csv"
                            descriptor["path"] = path
                            descriptor.pop("data", None)
                            with tempfile.NamedTemporaryFile() as file:
                                tgt = Resource(path=file.name, format="csv", trusted=True)
                                resource.write(tgt)
                                archive.write(file.name, path)

                    # Multipart data
                    elif resource.multipart:
                        for path, fullpath in zip(resource.path, resource.fullpath):
                            if os.path.isfile(fullpath):
                                if not helpers.is_safe_path(fullpath):
                                    note = f'Zipping usafe "{fullpath}" is not supported'
                                    error = errors.PackageError(note=note)
                                    raise FrictionlessException(error)
                                archive.write(fullpath, path)

                    # Local Data
                    else:
                        path = resource.path
                        fullpath = resource.fullpath
                        if os.path.isfile(fullpath):
                            if not helpers.is_safe_path(fullpath):
                                note = f'Zipping usafe "{fullpath}" is not supported'
                                error = errors.PackageError(note=note)
                                raise FrictionlessException(error)
                            archive.write(fullpath, path)

                # Metadata
                archive.writestr(
                    "datapackage.json",
                    json.dumps(
                        package_descriptor,
                        indent=2,
                        ensure_ascii=False,
                        cls=encoder_class,
                    ),
                )

        except Exception as exception:
            error = errors.PackageError(note=str(exception))
            raise FrictionlessException(error) from exception

    # Metadata

    metadata_duplicate = True
    metadata_Error = errors.PackageError  # type: ignore
    metadata_profile = deepcopy(settings.PACKAGE_PROFILE)
    metadata_profile["properties"]["resources"] = {"type": "array"}

    @classmethod
    def metadata_properties(cls):
        return super().metadata_properties(resources=Resource)

    def metadata_validate(self):
        # TODO: recover
        # Check invalid properties
        #  invalid_fields = {
        #  "missingValues": "resource.schema.missingValues",
        #  "fields": "resource.schema.fields",
        #  }
        #  for invalid_field, object in invalid_fields.items():
        #  if invalid_field in self:
        #  note = f'"{invalid_field}" should be set as "{object}" (not "package.{invalid_field}").'
        #  yield errors.PackageError(note=note)

        # Package
        #  if self.profile == "data-package":
        #  yield from super().metadata_validate()
        #  elif self.profile == "fiscal-data-package":
        #  yield from super().metadata_validate(settings.FISCAL_PACKAGE_PROFILE)
        #  elif self.profile == "tabular-data-package":
        #  yield from super().metadata_validate(settings.TABULAR_PACKAGE_PROFILE)
        #  else:
        #  if not self.trusted:
        #  if not helpers.is_safe_path(self.profile):
        #  note = f'path "{self.profile}" is not safe'
        #  error = errors.PackageError(note=note)
        #  raise FrictionlessException(error)
        #  profile = Metadata(self.profile).to_dict()
        #  yield from super().metadata_validate(profile)

        # Resources
        for resource in self.resources:
            yield from resource.metadata_errors
        #  if len(self.resource_names) != len(set(self.resource_names)):
        #  note = "names of the resources are not unique"
        #  yield errors.PackageError(note=note)

        # Created
        if self.created:
            field = fields.DatetimeField()
            _, note = field.read_cell(self.created)
            if note:
                note = 'property "created" is not valid "datetime"'
                yield errors.PackageError(note=note)

        # Contributors/Sources
        for name in ["contributors", "sources"]:
            for item in getattr(self, name, []):
                if item.get("email"):
                    field = fields.StringField(format="email")
                    _, note = field.read_cell(item.get("email"))
                    if note:
                        note = f'property "{name}[].email" is not valid "email"'
                        yield errors.PackageError(note=note)
