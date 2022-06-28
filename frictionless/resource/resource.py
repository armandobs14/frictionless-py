from __future__ import annotations
import json
import petl
import warnings
from copy import deepcopy
from typing import TYPE_CHECKING, Optional, Literal, Union, List, Any
from ..exception import FrictionlessException
from ..schema import Schema, Field
from ..detector import Detector
from ..metadata2 import Metadata2
from ..checklist import Checklist
from ..pipeline import Pipeline
from ..dialect import Dialect
from ..header import Header
from ..system import system
from ..row import Row
from .. import settings
from .. import helpers
from .. import errors


if TYPE_CHECKING:
    from ..package import Package


# NOTE:
# Review the situation with describe function removing stats (move to infer?)


class Resource(Metadata2):
    """Resource representation.

    This class is one of the cornerstones of of Frictionless framework.
    It loads a data source, and allows you to stream its parsed contents.
    At the same time, it's a metadata class data description.

    ```python
    with Resource("data/table.csv") as resource:
        resource.header == ["id", "name"]
        resource.read_rows() == [
            {'id': 1, 'name': 'english'},
            {'id': 2, 'name': '中国人'},
        ]
    ```

    """

    def __init__(
        self,
        source: Optional[Any] = None,
        *,
        descriptor: Optional[Any] = None,
        # Spec
        name: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        mediatype: Optional[str] = None,
        licenses: List[dict] = [],
        sources: List[dict] = [],
        profile: Optional[str] = None,
        path: Optional[str] = None,
        data: Optional[List[Union[list, dict]]] = None,
        scheme: str = settings.DEFAULT_SCHEME,
        format: str = settings.DEFAULT_FORMAT,
        hashing: str = settings.DEFAULT_HASHING,
        encoding: str = settings.DEFAULT_ENCODING,
        innerpath: Optional[str] = None,
        compression: Optional[str] = None,
        dialect: Optional[Union[Dialect, str]] = None,
        schema: Optional[Union[Schema, str]] = None,
        checklist: Optional[Union[Checklist, str]] = None,
        pipeline: Optional[Union[Pipeline, str]] = None,
        stats: Optional[dict] = None,
        # Extra
        basepath: Optional[str] = None,
        onerror: Literal["ignore", "warn", "raise"] = settings.DEFAULT_ONERROR,
        trusted: bool = settings.DEFAULT_TRUSTED,
        detector: Optional[Detector] = None,
        package: Optional[Package] = None,
    ):

        # Store state
        self.source = source
        self.name = name
        self.title = title
        self.description = description
        self.mediatype = mediatype
        self.licenses = licenses.copy()
        self.sources = sources.copy()
        self.profile = profile
        self.path = path
        self.data = data
        self.scheme = scheme
        self.format = format
        self.hashing = hashing
        self.encoding = encoding
        self.compression = compression
        self.innerpath = innerpath
        # TODO: support dereferencing
        self.dialect = dialect  # type: ignore
        self.schema = schema  # type: ignore
        self.checklist = checklist  # type: ignore
        self.pipeline = pipeline  # type: ignore
        self.stats = stats
        self.basepath = basepath or helpers.parse_basepath(descriptor)
        self.onerror = onerror
        self.trusted = trusted
        self.detector = detector or Detector()
        self.package = package

        # Store internal state
        self.__loader = None
        self.__parser = None
        self.__sample = None
        self.__labels = None
        self.__fragment = None
        self.__header = None
        self.__lookup = None
        self.__row_stream = None

        # Detect resource
        self.detector.detect_resource(self)

    def __new__(cls, *args, **kwargs):
        # TODO: support source being a descriptor
        descriptor = kwargs.pop("descriptor", None)
        if descriptor:
            return Resource.from_descriptor(descriptor)
        return super().__new__(cls)

    # TODO: maybe it's possible to do type narrowing here?
    def __enter__(self):
        if self.closed:
            self.open()
        return self

    def __exit__(self, type, value, traceback):
        self.close()

    # TODO: iter cell stream to be PETL-compatible?
    def __iter__(self):
        with helpers.ensure_open(self):
            # TODO: rebase on Inferred/OpenResource?
            # (here and in other places like this)
            assert self.__row_stream
            yield from self.__row_stream

    # State

    source: Any
    """
    Data source
    """

    name: Optional[str]
    """
    Resource name according to the specs.
    It should be a slugified name of the resource.
    """

    title: Optional[str]
    """
    Resource title according to the specs
    It should a human-oriented title of the resource.
    """

    description: Optional[str]
    """
    Resource description according to the specs
    It should a human-oriented description of the resource.
    """

    mediatype: Optional[str]
    """
    Mediatype/mimetype of the resource e.g. “text/csv”,
    or “application/vnd.ms-excel”.  Mediatypes are maintained by the
    Internet Assigned Numbers Authority (IANA) in a media type registry.
    """

    licenses: List[dict]
    """
    The license(s) under which the resource is provided.
    If omitted it's considered the same as the package's licenses.
    """

    sources: List[dict]
    """
    The raw sources for this data resource.
    It MUST be an array of Source objects.
    Each Source object MUST have a title and
    MAY have path and/or email properties.
    """

    profile: Optional[str]
    """
    String identifying the profile of this descriptor.
    For example, `tabular-data-resource`.
    """

    path: Optional[str]
    """
    Path to data source
    """

    data: Optional[List[Union[list, dict]]]
    """
    Inline data source
    """

    scheme: str
    """
    Scheme for loading the file (file, http, ...).
    If not set, it'll be inferred from `source`.
    """

    format: str
    """
    File source's format (csv, xls, ...).
    If not set, it'll be inferred from `source`.
    """

    hashing: str
    """
    An algorithm to hash data.
    It defaults to 'md5'.
    """

    encoding: str
    """
    Source encoding.
    If not set, it'll be inferred from `source`.
    """

    innerpath: Optional[str]
    """
    Path within the compressed file.
    It defaults to the first file in the archive (if the source is an archive).
    """

    compression: Optional[str]
    """
    Source file compression (zip, ...).
    If not set, it'll be inferred from `source`.
    """

    dialect: Optional[Dialect]
    """
    File dialect object.
    For more information, please check the Dialect documentation.
    """

    schema: Optional[Schema]
    """
    Table schema object.
    For more information, please check the Schema documentation.
    """

    checklist: Optional[Checklist]
    """
    Checklist object.
    For more information, please check the Checklist documentation.
    """

    pipeline: Optional[Pipeline]
    """
    Pipeline object.
    For more information, please check the Pipeline documentation.
    """

    stats: Optional[dict]
    """
    Stats dictionary.
    A dict with the following possible properties: hash, bytes, fields, rows.
    """

    basepath: str
    """
    A basepath of the resource
    The fullpath of the resource is joined `basepath` and /path`
    """

    # TODO: move type to interfaces
    onerror: Literal["ignore", "warn", "raise"]
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
    Resource detector.
    For more information, please check the Detector documentation.
    """

    package: Optional[Package]
    """
    Parental to this resource package.
    For more information, please check the Package documentation.
    """

    # Props

    @property
    def description_html(self):
        """Description in HTML"""
        return helpers.md_to_html(self.description or "")

    @property
    def description_text(self):
        """Description in Text"""
        return helpers.html_to_text(self.description_html or "")

    @property
    def fullpath(self):
        """
        Returns
            str: resource fullpath
        """
        return self.__file.fullpath

    # TODO: add asteriks for user/pass in url
    @property
    def place(self):
        """Stringified resource location/source"""
        if self.memory:
            return "<memory>"
        if self.innerpath:
            return f"{self.path}:{self.innerpath}"
        return self.path

    @property
    def memory(self):
        return self.__file.memory

    @property
    def remote(self):
        return self.__file.remote

    @property
    def multipart(self):
        return self.__file.multipart

    @property
    def tabular(self):
        """
        Returns
            bool: if resource is tabular
        """
        if not self.closed:
            return bool(self.__parser)
        try:
            system.create_parser(self)
            return True
        except Exception:
            return False

    @property
    def buffer(self):
        """File's bytes used as a sample

        These buffer bytes are used to infer characteristics of the
        source file (e.g. encoding, ...).
        """
        if self.__parser and self.__parser.loader:
            return self.__parser.loader.buffer
        if self.__loader:
            return self.__loader.buffer

    @property
    def sample(self):
        """Table's lists used as sample.

        These sample rows are used to infer characteristics of the
        source file (e.g. schema, ...).

        Returns:
            list[]?: table sample
        """
        return self.__sample

    @property
    def labels(self):
        """
        Returns:
            str[]?: table labels
        """
        return self.__labels

    @property
    def fragment(self):
        """Table's lists used as fragment.

        These fragment rows are used internally to infer characteristics of the
        source file (e.g. schema, ...).

        Returns:
            list[]?: table fragment
        """
        return self.__fragment

    @property
    def header(self):
        """
        Returns:
            str[]?: table header
        """
        return self.__header

    @property
    def byte_stream(self):
        """Byte stream in form of a generator

        Yields:
            gen<bytes>?: byte stream
        """
        if not self.closed:
            if not self.__loader:
                self.__loader = system.create_loader(self)
                self.__loader.open()
            return self.__loader.byte_stream

    @property
    def text_stream(self):
        """Text stream in form of a generator

        Yields:
            gen<str[]>?: text stream
        """
        if not self.closed:
            if not self.__loader:
                self.__loader = system.create_loader(self)
                self.__loader.open()
            return self.__loader.text_stream

    @property
    def list_stream(self):
        """List stream in form of a generator

        Yields:
            gen<any[][]>?: list stream
        """
        if self.__parser:
            return self.__parser.list_stream

    @property
    def row_stream(self):
        """Row stream in form of a generator of Row objects

        Yields:
            gen<Row[]>?: row stream
        """
        return self.__row_stream

    # Infer

    def infer(self, *, stats=False):
        """Infer metadata

        Parameters:
            stats? (bool): stream file completely and infer stats
        """
        if not self.closed:
            note = "Resource.infer canot be used on a open resource"
            raise FrictionlessException(errors.ResourceError(note=note))
        with self:
            if not stats:
                self.pop("stats", None)
                return
            stream = self.row_stream or self.byte_stream
            helpers.pass_through(stream)

    # Open/Close

    def open(self):
        """Open the resource as "io.open" does

        Raises:
            FrictionlessException: any exception that occurs
        """
        self.close()

        # Infer
        self.pop("stats", None)
        self["name"] = self.name
        self["profile"] = self.profile
        self["scheme"] = self.scheme
        self["format"] = self.format
        self["hashing"] = self.hashing
        if self.innerpath:
            self["innerpath"] = self.innerpath
        if self.compression:
            self["compression"] = self.compression
        if self.dialect:
            self["dialect"] = self.dialect
        self["stats"] = self.stats

        # Validate
        # TODO: recover
        #  if self.metadata_errors:
        #  error = self.metadata_errors[0]
        #  raise FrictionlessException(error)

        # Open
        try:

            # Table
            if self.tabular:
                self.__parser = system.create_parser(self)
                self.__parser.open()
                self.__read_detect_dialect()
                self.__read_detect_schema()
                self.__read_detect_lookup()
                self.__header = self.__read_header()
                self.__row_stream = self.__read_row_stream()
                return self

            # File
            else:
                self.__loader = system.create_loader(self)
                self.__loader.open()
                return self

        # Error
        except Exception:
            self.close()
            raise

    def close(self):
        """Close the table as "filelike.close" does"""
        if self.__parser:
            self.__parser.close()
            self.__parser = None
        if self.__loader:
            self.__loader.close()
            self.__loader = None

    @property
    def closed(self):
        """Whether the table is closed

        Returns:
            bool: if closed
        """
        return self.__parser is None and self.__loader is None

    # Read

    def read_bytes(self, *, size=None):
        """Read bytes into memory

        Returns:
            any[][]: resource bytes
        """
        if self.memory:
            return b""
        with helpers.ensure_open(self):
            return self.byte_stream.read1(size)

    def read_text(self, *, size=None):
        """Read text into memory

        Returns:
            str: resource text
        """
        if self.memory:
            return ""
        with helpers.ensure_open(self):
            return self.text_stream.read(size)

    def read_data(self, *, size=None):
        """Read data into memory

        Returns:
            any: resource data
        """
        if self.data:
            return self.data
        with helpers.ensure_open(self):
            text = self.read_text()
            data = json.loads(text)
            return data

    def read_lists(self, *, size=None):
        """Read lists into memory

        Returns:
            any[][]: table lists
        """
        with helpers.ensure_open(self):
            lists = []
            for cells in self.list_stream:
                lists.append(cells)
                if size and len(lists) >= size:
                    break
            return lists

    def read_rows(self, *, size=None):
        """Read rows into memory

        Returns:
            Row[]: table rows
        """
        with helpers.ensure_open(self):
            rows = []
            for row in self.row_stream:
                rows.append(row)
                if size and len(rows) >= size:
                    break
            return rows

    def __read_row_stream(self):

        # During row streaming we crate a field info structure
        # This structure is optimized and detached version of schema.fields
        # We create all data structures in-advance to share them between rows

        # Create field info
        field_number = 0
        field_info = {"names": [], "objects": [], "mapping": {}}
        for field in self.schema.fields:
            field_number += 1
            field_info["names"].append(field.name)
            field_info["objects"].append(field.to_copy())
            field_info["mapping"][field.name] = (field, field_number)

        # Create state
        memory_unique = {}
        memory_primary = {}
        foreign_groups = []
        is_integrity = bool(self.schema.primary_key)
        for field in self.schema.fields:
            if field.constraints.get("unique"):
                memory_unique[field.name] = {}
                is_integrity = True
        if self.__lookup:
            for fk in self.schema.foreign_keys:
                group = {}
                group["sourceName"] = fk["reference"]["resource"]
                group["sourceKey"] = tuple(fk["reference"]["fields"])
                group["targetKey"] = tuple(fk["fields"])
                foreign_groups.append(group)
                is_integrity = True

        # Create content stream
        enumerated_content_stream = self.dialect.read_enumerated_content_stream(
            self.__parser.list_stream
        )

        # Create row stream
        def row_stream():
            row_count = 0
            for row_number, cells in enumerated_content_stream:
                row_count += 1

                # Create row
                row = Row(
                    cells,
                    field_info=field_info,
                    row_number=row_number,
                )

                # Unique Error
                if is_integrity and memory_unique:
                    for field_name in memory_unique.keys():
                        cell = row[field_name]
                        if cell is not None:
                            match = memory_unique[field_name].get(cell)
                            memory_unique[field_name][cell] = row.row_number
                            if match:
                                func = errors.UniqueError.from_row
                                note = "the same as in the row at position %s" % match
                                error = func(row, note=note, field_name=field_name)
                                row.errors.append(error)

                # Primary Key Error
                if is_integrity and self.schema.primary_key:
                    cells = tuple(row[name] for name in self.schema.primary_key)
                    if set(cells) == {None}:
                        note = 'cells composing the primary keys are all "None"'
                        error = errors.PrimaryKeyError.from_row(row, note=note)
                        row.errors.append(error)
                    else:
                        match = memory_primary.get(cells)
                        memory_primary[cells] = row.row_number
                        if match:
                            if match:
                                note = "the same as in the row at position %s" % match
                                error = errors.PrimaryKeyError.from_row(row, note=note)
                                row.errors.append(error)

                # Foreign Key Error
                if is_integrity and foreign_groups:
                    for group in foreign_groups:
                        group_lookup = self.__lookup.get(group["sourceName"])
                        if group_lookup:
                            cells = tuple(row[name] for name in group["targetKey"])
                            if set(cells) == {None}:
                                continue
                            match = cells in group_lookup.get(group["sourceKey"], set())
                            if not match:
                                note = (
                                    'for "%s": values "%s" not found in the lookup table "%s" as "%s"'
                                    % (
                                        ", ".join(group["targetKey"]),
                                        ", ".join(str(d) for d in cells),
                                        group["sourceName"],
                                        ", ".join(group["sourceKey"]),
                                    )
                                )
                                error = errors.ForeignKeyError.from_row(row, note=note)
                                row.errors.append(error)

                # Handle errors
                if self.onerror != "ignore":
                    if not row.valid:
                        error = row.errors[0]
                        if self.onerror == "raise":
                            raise FrictionlessException(error)
                        warnings.warn(error.message, UserWarning)

                # Yield row
                yield row

            # Update stats
            self.stats["rows"] = row_count

        # Return row stream
        return row_stream()

    def __read_header(self):

        # Create header
        header = Header(
            self.__labels,
            fields=self.schema.fields,
            row_numbers=self.dialect.header_rows,
            ignore_case=not self.dialect.header_case,
        )

        # Handle errors
        if not header.valid:
            error = header.errors[0]
            if self.onerror == "warn":
                warnings.warn(error.message, UserWarning)
            elif self.onerror == "raise":
                raise FrictionlessException(error)

        return header

    def __read_detect_dialect(self):
        sample = self.__parser.sample
        dialect = self.detector.detect_dialect(sample, dialect=self.dialect)
        if dialect:
            self.dialect = dialect
        self.__sample = sample

    def __read_detect_schema(self):
        labels = self.dialect.read_labels(self.sample)
        fragment = self.dialect.read_fragment(self.sample)
        schema = self.detector.detect_schema(fragment, labels=labels, schema=self.schema)
        if schema:
            self.schema = schema
        self.__labels = labels
        self.__fragment = fragment
        self.stats["fields"] = len(schema.fields)
        # NOTE: review whether it's a proper place for this fallback to data resource
        if not schema:
            self.profile = "data-resource"

    def __read_detect_lookup(self):
        lookup = self.detector.detect_lookup(self)
        if lookup:
            self.__lookup = lookup

    # Write

    def write(self, target=None, **options):
        """Write this resource to the target resource

        Parameters:
            target (any|Resource): target or target resource instance
            **options (dict): Resource constructor options
        """
        native = isinstance(target, Resource)
        target = target.to_copy() if native else Resource(target, **options)
        parser = system.create_parser(target)
        parser.write_row_stream(self.to_copy())
        return target

    # Convert

    def to_dict(self):
        """Create a dict from the resource

        Returns
            dict: dict representation
        """
        # Data can be not serializable (generators/functions)
        descriptor = super().to_dict()
        data = descriptor.pop("data", None)
        if isinstance(data, list):
            descriptor["data"] = data
        return descriptor

    def to_copy(self, **options):
        """Create a copy from the resource

        Returns
            Resource: resource copy
        """
        descriptor = self.to_dict()
        return Resource(
            descriptor,
            data=self.data,
            basepath=self.__basepath,
            detector=self.__detector,
            onerror=self.__onerror,
            trusted=self.__trusted,
            package=self.__package,
            **options,
        )

    def to_view(self, type="look", **options):
        """Create a view from the resource

        See PETL's docs for more information:
        https://petl.readthedocs.io/en/stable/util.html#visualising-tables

        Parameters:
            type (look|lookall|see|display|displayall): view's type
            **options (dict): options to be passed to PETL

        Returns
            str: resource's view
        """
        assert type in ["look", "lookall", "see", "display", "displayall"]
        view = str(getattr(self.to_petl(normalize=True), type)(**options))
        return view

    def to_snap(self, *, json=False):
        """Create a snapshot from the resource

        Parameters:
            json (bool): make data types compatible with JSON format

        Returns
            list: resource's data
        """
        snap = []
        with helpers.ensure_open(self):
            snap.append(self.header.to_list())
            for row in self.row_stream:
                snap.append(row.to_list(json=json))
        return snap

    def to_inline(self, *, dialect=None):
        """Helper to export resource as an inline data"""
        target = self.write(Resource(format="inline", dialect=dialect))
        return target.data

    def to_pandas(self, *, dialect=None):
        """Helper to export resource as an Pandas dataframe"""
        target = self.write(Resource(format="pandas", dialect=dialect))
        return target.data

    @staticmethod
    def from_petl(view, **options):
        """Create a resource from PETL view"""
        return Resource(data=view, **options)

    def to_petl(self, normalize=False):
        """Export resource as a PETL table"""
        resource = self.to_copy()

        # Define view
        class ResourceView(petl.Table):
            def __iter__(self):
                with resource:
                    if normalize:
                        yield resource.schema.field_names
                        yield from (row.to_list() for row in resource.row_stream)
                        return
                    if not resource.header.missing:
                        yield resource.header.labels
                    yield from (row.cells for row in resource.row_stream)

        return ResourceView()

    # Metadata

    metadata_duplicate = True
    metadata_Error = errors.ResourceError
    metadata_profile = deepcopy(settings.RESOURCE_PROFILE)
    metadata_profile["properties"]["dialect"] = {"type": ["string", "object"]}
    metadata_profile["properties"]["schema"] = {"type": ["string", "object"]}
    metadata_profile["properties"]["checklist"] = {"type": ["string", "object"]}
    metadata_profile["properties"]["pipeline"] = {"type": ["string", "object"]}

    def metadata_validate(self):
        # Check invalid properties
        invalid_fields = {
            "missingValues": "resource.schema.missingValues",
            "fields": "resource.schema.fields",
        }
        for invalid_field, object in invalid_fields.items():
            if invalid_field in self:
                note = f'"{invalid_field}" should be set as "{object}" (not "resource.{invalid_field}").'
                yield errors.ResourceError(note=note)

        yield from super().metadata_validate()

        # Dialect
        if self.dialect:
            yield from self.dialect.metadata_errors

        # Schema
        if self.schema:
            yield from self.schema.metadata_errors

        # Checklist/Pipeline
        if self.checklist:
            yield from self.checklist.metadata_errors
        if self.pipeline:
            yield from self.pipeline.metadata_errors

        # Contributors/Sources
        for name in ["contributors", "sources"]:
            for item in self.get(name, []):
                if item.get("email"):
                    field = Field(type="string", format="email")
                    cell = field.read_cell(item.get("email"))[0]
                    if not cell:
                        note = f'property "{name}[].email" is not valid "email"'
                        yield errors.PackageError(note=note)
