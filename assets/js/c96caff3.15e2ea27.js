(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{144:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),a=(n(0),n(161)),i=["components"],l={title:"Scheme Guide"},c={unversionedId:"guides/extension/scheme-guide",id:"guides/extension/scheme-guide",isDocsHomePage:!1,title:"Scheme Guide",description:"In Frictionless Framework a scheme is a set of concepts associated with a data source protocol:",source:"@site/../docs/guides/extension/scheme-guide.md",slug:"/guides/extension/scheme-guide",permalink:"/docs/guides/extension/scheme-guide",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/guides/extension/scheme-guide.md",version:"current",lastUpdatedBy:"shashi gharti",lastUpdatedAt:1651031686,formattedLastUpdatedAt:"4/27/2022",sidebar:"guides",previous:{title:"Plugin Guide",permalink:"/docs/guides/extension/plugin-guide"},next:{title:"Format Guide",permalink:"/docs/guides/extension/format-guide"}},s=[{value:"Loader Example",id:"loader-example",children:[]},{value:"Control Example",id:"control-example",children:[]},{value:"References",id:"references",children:[]}],p={toc:s};function u(e){var t=e.components,n=Object(o.a)(e,i);return Object(a.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"In Frictionless Framework a scheme is a set of concepts associated with a data source protocol:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Loader"),Object(a.b)("li",{parentName:"ul"},"Control")),Object(a.b)("p",null,"The Loader is responsible for loading data from/to different data sources as though local file system or AWS S3. The Control is a simple object to configure the Loader."),Object(a.b)("h2",{id:"loader-example"},"Loader Example"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},'from frictionless import Loader\n\nclass S3Loader(Loader):\n    remote = True\n\n    # Read\n\n    def read_byte_stream_create(self):\n        boto3 = helpers.import_from_plugin("boto3", plugin="s3")\n        control = self.resource.control\n        parts = urlparse(self.resource.fullpath, allow_fragments=False)\n        client = boto3.resource("s3", endpoint_url=control.endpoint_url)\n        object = client.Object(bucket_name=parts.netloc, key=parts.path[1:])\n        byte_stream = S3ByteStream(object)\n        return byte_stream\n\n    # Write\n\n    def write_byte_stream_save(self, byte_stream):\n        boto3 = helpers.import_from_plugin("boto3", plugin="s3")\n        control = self.resource.control\n        parts = urlparse(self.resource.fullpath, allow_fragments=False)\n        client = boto3.resource("s3", endpoint_url=control.endpoint_url)\n        object = client.Object(bucket_name=parts.netloc, key=parts.path[1:])\n        object.put(Body=byte_stream)\n')),Object(a.b)("h2",{id:"control-example"},"Control Example"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},'from frictionless import Control\n\nclass S3Control(Control):\n\n    def __init__(self, descriptor=None, endpoint_url=None):\n        self.setinitial("endpointUrl", endpoint_url)\n        super().__init__(descriptor)\n\n    @property\n    def endpoint_url(self):\n        return (\n            self.get("endpointUrl")\n            or os.environ.get("S3_ENDPOINT_URL")\n            or DEFAULT_ENDPOINT_URL\n        )\n\n    # Expand\n\n    def expand(self):\n        """Expand metadata"""\n        self.setdefault("endpointUrl", self.endpoint_url)\n\n    # Metadata\n\n    metadata_profile = {  # type: ignore\n        "type": "object",\n        "additionalProperties": False,\n        "properties": {\n            "endpointUrl": {"type": "string"},\n        },\n    }\n')),Object(a.b)("h2",{id:"references"},"References"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",{parentName:"li",href:"/docs/references/api-reference#loader"},"Loader")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",{parentName:"li",href:"/docs/references/api-reference#control"},"Control"))))}u.isMDXComponent=!0},161:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),p=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=p(n),f=r,m=u["".concat(i,".").concat(f)]||u[f]||d[f]||a;return n?o.a.createElement(m,l(l({ref:t},s),{},{components:n})):o.a.createElement(m,l({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);