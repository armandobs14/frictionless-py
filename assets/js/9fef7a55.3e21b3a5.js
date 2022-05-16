(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{132:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return l})),a.d(t,"toc",(function(){return c})),a.d(t,"default",(function(){return m}));var n=a(3),r=a(7),i=(a(0),a(161)),s=["components"],o={title:"Transform Guide",prepare:["cp data/transform.csv transform.csv"],cleanup:["rm transform.csv"]},l={unversionedId:"guides/transform-guide",id:"guides/transform-guide",isDocsHomePage:!1,title:"Transform Guide",description:"This guide assumes basic familiarity with the Frictionless Framework. To learn more, please read the Introduction and Quick Start.",source:"@site/../docs/guides/transform-guide.md",slug:"/guides/transform-guide",permalink:"/docs/guides/transform-guide",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/guides/transform-guide.md",version:"current",lastUpdatedBy:"Shashi Gharti",lastUpdatedAt:1652687808,formattedLastUpdatedAt:"5/16/2022",sidebar:"guides",previous:{title:"Validation Checks",permalink:"/docs/guides/validation-checks"},next:{title:"Transform Steps",permalink:"/docs/guides/transform-steps"}},c=[{value:"Transform Principles",id:"transform-principles",children:[{value:"Conceptual Simplicity",id:"conceptual-simplicity",children:[]},{value:"Metadata Matters",id:"metadata-matters",children:[]},{value:"Data Streaming",id:"data-streaming",children:[]},{value:"Lazy Evaluation",id:"lazy-evaluation",children:[]},{value:"Software Reuse",id:"software-reuse",children:[]}]},{value:"Transform Functions",id:"transform-functions",children:[]},{value:"Transforming a Resource",id:"transforming-a-resource",children:[]},{value:"Transforming a Package",id:"transforming-a-package",children:[]},{value:"Transforming Pipeline",id:"transforming-pipeline",children:[]},{value:"Available Steps",id:"available-steps",children:[]},{value:"Custom Steps",id:"custom-steps",children:[]},{value:"Transform Utils",id:"transform-utils",children:[]},{value:"Working with PETL",id:"working-with-petl",children:[]}],p={toc:c};function m(e){var t=e.components,a=Object(r.a)(e,s);return Object(i.b)("wrapper",Object(n.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"This guide assumes basic familiarity with the Frictionless Framework. To learn more, please read the ",Object(i.b)("a",{parentName:"p",href:"https://framework.frictionlessdata.io/docs/guides/introduction"},"Introduction")," and ",Object(i.b)("a",{parentName:"p",href:"https://framework.frictionlessdata.io/docs/guides/quick-start"},"Quick Start"),".")),Object(i.b)("p",null,"Transforming data in Frictionless means modifying data and metadata from state A to state B. For example, it could be transforming a messy Excel file to a cleaned CSV file, or transforming a folder of data files to a data package we can publish more easily. To read more about the concepts behind Frictionless Transform, please check out the ",Object(i.b)("a",{parentName:"p",href:"#transform-principles"},"Transform Principles")," sections belows."),Object(i.b)("p",null,"In comparison to similiar Python software like Pandas, Frictionless provides better control over metadata, has a modular API, and fully supports Frictionless Specifications. Also, it is a streaming framework with an ability to work with large data. As a downside of the Frictionless architecture, it might be slower compared to other Python packages, especially to projects like Pandas."),Object(i.b)("p",null,"Keep reading below to learn about the principles underlying Frictionless Transform, or ",Object(i.b)("a",{parentName:"p",href:"/docs/guides/transform-guide#transform-functions"},"skip ahead")," to see how to use the Transform code."),Object(i.b)("h2",{id:"transform-principles"},"Transform Principles"),Object(i.b)("p",null,"Frictionless Transform is based on a few core principles which are shared with other parts of the framework:"),Object(i.b)("h3",{id:"conceptual-simplicity"},"Conceptual Simplicity"),Object(i.b)("p",null,"Frictionless Transform can be thought of as a list of functions that accept a source resource/package object and return a target resource/package object. Every function updates the input's metadata and data - and nothing more. We tried to make this straightforward and conceptually simple, because we want our users to be able to understand the tools and master them."),Object(i.b)("h3",{id:"metadata-matters"},"Metadata Matters"),Object(i.b)("p",null,"There are plenty of great ETL-frameworks written in Python and other languages. We use one of them (PETL) under the hood (described in more detail later). The core difference between Frictionless and others is that we treat metadata as a first-class citizen. This means that you don't lose type and other important information during the pipeline evaluation."),Object(i.b)("h3",{id:"data-streaming"},"Data Streaming"),Object(i.b)("p",null,"Whenever possible, Frictionless streams the data instead of reading it into memory. For example, for sorting big tables we use a memory usage threshold and when it is met we use the file system to unload the data. The ability to stream data gives users power to work with files of any size, even very large files."),Object(i.b)("h3",{id:"lazy-evaluation"},"Lazy Evaluation"),Object(i.b)("p",null,"With Frictionless all data manipulation happens on-demand. For example, if you reshape one table in a data package containing 10 big csv files, Frictionless will not even read the 9 other tables. Frictionless tries to be as explicit as possible regarding actions taken. For example, it will not use CPU resources to cast data unless a user adds a ",Object(i.b)("inlineCode",{parentName:"p"},"normalize")," step. So it's possible to transform a rather big file without even casting types, for example, if you only need to reshape it."),Object(i.b)("h3",{id:"software-reuse"},"Software Reuse"),Object(i.b)("p",null,"For the core transform functions, Frictionless uses the amazing ",Object(i.b)("a",{parentName:"p",href:"https://petl.readthedocs.io/en/stable/"},"PETL")," project under the hood. This library provides lazy-loading functionality in running data pipelines. On top of PETL, Frictionless adds metadata management and a bridge between Frictionless concepts like Package/Resource and PETL's processors."),Object(i.b)("h2",{id:"transform-functions"},"Transform Functions"),Object(i.b)("p",null,"Frictionless supports a few different kinds of data and metadata transformations:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"resource and package transformations"),Object(i.b)("li",{parentName:"ul"},"transformations based on a declarative pipeline")),Object(i.b)("p",null,"The main difference between these is that resource and package transforms are imperative while pipelines can be created beforehand or shared as a JSON file. We'll talk more about pipelines in the ",Object(i.b)("a",{parentName:"p",href:"#transforming-pipeline"},"Transforming Pipeline")," section below. First, we will introduce the transform functions, then go into detail about how to transform a resource and a package. As a reminder, in the Frictionless ecosystem, a resource is a single file, such as a data file, and a package is a set of files, such as a data file and a schema. This concept is described in more detail in the ",Object(i.b)("a",{parentName:"p",href:"https://framework.frictionlessdata.io/docs/guides/introduction"},"Introduction"),"."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Download ",Object(i.b)("a",{parentName:"p",href:"https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/data/transform.csv"},Object(i.b)("inlineCode",{parentName:"a"},"transform.csv")),' to reproduce the examples (right-click and "Save link as". You might need to change the file extension from .txt to .csv).')),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'script title="CLI"',script:!0,title:'"CLI"'},"cat transform.csv\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-csv",metastring:'title="transform.csv"',title:'"transform.csv"'},"id,name,population\n1,germany,83\n2,france,66\n3,spain,47\n")),Object(i.b)("p",null,"The high-level interface to transform data is a set of ",Object(i.b)("inlineCode",{parentName:"p"},"transform")," functions:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"transform"),": detects the source type and transforms data accordingly"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"transform_resource"),": transforms a resource"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"transform_package"),": transforms a package"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"transform_pipeline"),": transforms a resource or package based on a declarative pipeline definition")),Object(i.b)("p",null,"We'll see examples of these functions in the next few sections."),Object(i.b)("h2",{id:"transforming-a-resource"},"Transforming a Resource"),Object(i.b)("p",null,"Let's write our first transformation. Here, we will transform a data file (a resource) by defining a source resource, applying transform steps and getting back a resulting target resource:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},'from pprint import pprint\nfrom frictionless import Resource, transform, steps\n\n# Define source resource\nsource = Resource(path="transform.csv")\n\n# Apply transform steps\ntarget = transform(\n    source,\n    steps=[\n        steps.table_normalize(),\n        steps.field_add(name="cars", type="integer", formula=\'population*2\'),\n    ],\n)\n\n# Print resulting schema and data\npprint(target.schema)\npprint(target.read_rows())\n')),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"{'fields': [{'name': 'id', 'type': 'integer'},\n            {'name': 'name', 'type': 'string'},\n            {'name': 'population', 'type': 'integer'},\n            {'name': 'cars', 'type': 'integer'}]}\n[{'id': 1, 'name': 'germany', 'population': 83, 'cars': 166},\n {'id': 2, 'name': 'france', 'population': 66, 'cars': 132},\n {'id': 3, 'name': 'spain', 'population': 47, 'cars': 94}]\n")),Object(i.b)("p",null,"Let's break down the transforming steps we applied:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("inlineCode",{parentName:"li"},"steps.table_normalize")," - cast data types and shape the table according to the schema, inferred or provided"),Object(i.b)("li",{parentName:"ol"},Object(i.b)("inlineCode",{parentName:"li"},"steps.field_add")," - adds a field to data and metadata based on the information provided by the user")),Object(i.b)("p",null,"There are many more available steps that we will cover below."),Object(i.b)("h2",{id:"transforming-a-package"},"Transforming a Package"),Object(i.b)("p",null,"A package is a set of resources. Transforming a package means adding or removing resources and/or transforming those resources themselves. This example shows how transforming a package is similar to transforming a single resource:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},'from pprint import pprint\nfrom frictionless import Package, Resource, transform, steps\n\n# Define source package\nsource = Package(resources=[Resource(name=\'main\', path="transform.csv")])\n\n# Apply transform steps\ntarget = transform(\n    source,\n    steps=[\n        steps.resource_add(name="extra", data=[[\'id\', \'cars\'], [1, 166], [2, 132], [3, 94]]),\n        steps.resource_transform(\n            name="main",\n            steps=[\n                steps.table_normalize(),\n                steps.table_join(resource="extra", field_name="id"),\n            ],\n        ),\n        steps.resource_remove(name="extra"),\n    ],\n)\n\n# Print resulting resources, schema and data\npprint(target.resource_names)\npprint(target.get_resource("main").schema)\npprint(target.get_resource("main").read_rows())\n')),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"['main']\n{'fields': [{'name': 'id', 'type': 'integer'},\n            {'name': 'name', 'type': 'string'},\n            {'name': 'population', 'type': 'integer'},\n            {'name': 'cars', 'type': 'integer'}]}\n[{'id': 1, 'name': 'germany', 'population': 83, 'cars': 166},\n {'id': 2, 'name': 'france', 'population': 66, 'cars': 132},\n {'id': 3, 'name': 'spain', 'population': 47, 'cars': 94}]\n")),Object(i.b)("p",null,"We have basically done the same as in ",Object(i.b)("a",{parentName:"p",href:"#transforming-a-resource"},"Transforming a Resource")," section. This example is quite artificial and created only to show how to join two resources, but hopefully it provides a basic understanding of how flexible package transformations can be."),Object(i.b)("h2",{id:"transforming-pipeline"},"Transforming Pipeline"),Object(i.b)("p",null,"A pipeline is a declarative way to write out metadata transform steps. With a pipeline, you can transform a resource, package, or write custom plugins too."),Object(i.b)("p",null,"For resource and package types it's mostly the same functionality as we have seen above, but written declaratively. So let's run the same resource transformation as we did in the ",Object(i.b)("a",{parentName:"p",href:"#transforming-a-resource"},"Transforming a Resource")," section:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},'from pprint import pprint\nfrom frictionless import Pipeline, transform\n\npipeline = Pipeline(\n    {\n        "tasks": [\n            {\n                "type": "resource",\n                "source": {"path": "data/transform.csv"},\n                "steps": [\n                    {"code": "table-normalize"},\n                    {\n                        "code": "field-add",\n                        "name": "cars",\n                        "type": "integer",\n                        "formula": "population*2",\n                    },\n                ],\n            }\n        ]\n    }\n)\nstatus = transform(pipeline)\npprint(status.task.target.schema)\npprint(status.task.target.read_rows())\n')),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"{'fields': [{'name': 'id', 'type': 'integer'},\n            {'name': 'name', 'type': 'string'},\n            {'name': 'population', 'type': 'integer'},\n            {'name': 'cars'}]}\n[{'id': 1, 'name': 'germany', 'population': 83, 'cars': 166},\n {'id': 2, 'name': 'france', 'population': 66, 'cars': 132},\n {'id': 3, 'name': 'spain', 'population': 47, 'cars': 94}]\n")),Object(i.b)("p",null,"This returns the same result as in the ",Object(i.b)("a",{parentName:"p",href:"#transforming-a-resource"},"Transforming a Resource"),". So what's the reason to use declarative pipelines if it works the same as the Python code? The main difference is that pipelines can be saved as JSON files which can be shared among different users and used with CLI and API. For example, if you implement your own UI based on Frictionless Framework you can serialize the whole pipeline as a JSON file and send it to the server. This is the same for CLI - if your colleague has  given you a ",Object(i.b)("inlineCode",{parentName:"p"},"pipeline.json")," file, you can run ",Object(i.b)("inlineCode",{parentName:"p"},"frictionless transform pipeline.json")," in the CLI to get the same results as they got."),Object(i.b)("h2",{id:"available-steps"},"Available Steps"),Object(i.b)("p",null,"Frictionless includes more than 40+ built-in transform steps. They are grouped by the object so you can find them easily using code auto completion in a code editor. For example, start typing ",Object(i.b)("inlineCode",{parentName:"p"},"steps.table...")," and you will see all the available steps for that group. The available groups are:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"resource"),Object(i.b)("li",{parentName:"ul"},"table"),Object(i.b)("li",{parentName:"ul"},"field"),Object(i.b)("li",{parentName:"ul"},"row"),Object(i.b)("li",{parentName:"ul"},"cell")),Object(i.b)("p",null,"See ",Object(i.b)("a",{parentName:"p",href:"/docs/guides/transform-steps"},"Transform Steps")," for a list of all available steps. It is also possible to write custom transform steps: see the next section."),Object(i.b)("h2",{id:"custom-steps"},"Custom Steps"),Object(i.b)("p",null,"Here is an example of a custom step written as a Python function. This example step removes a field from a data table (note: Frictionless already has a built-in function that does this same thing: ",Object(i.b)("inlineCode",{parentName:"p"},"steps.field_remove"),")."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},'from pprint import pprint\nfrom frictionless import Package, Resource, transform, steps\n\ndef step(resource):\n    current = resource.to_copy()\n\n    # Data\n    def data():\n        with current:\n            for list in current.list_stream:\n                yield list[1:]\n\n    # Meta\n    resource.data = data\n    resource.schema.remove_field("id")\n\n\nsource = Resource("transform.csv")\ntarget = transform(source, steps=[step])\npprint(target.schema)\npprint(target.read_rows())\n')),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"{'fields': [{'name': 'name', 'type': 'string'},\n            {'name': 'population', 'type': 'integer'}]}\n[{'name': 'germany', 'population': 83},\n {'name': 'france', 'population': 66},\n {'name': 'spain', 'population': 47}]\n")),Object(i.b)("p",null,"As you can see you can implement any custom steps within a Pyhton script. To make it work within a declarative pipeline you need to implement a plugin. Learn more about ",Object(i.b)("a",{parentName:"p",href:"/docs/guides/extension/step-guide"},"Custom Steps")," and ",Object(i.b)("a",{parentName:"p",href:"/docs/guides/extension/plugin-guide"},"Plugins"),"."),Object(i.b)("h2",{id:"transform-utils"},"Transform Utils"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Transform Utils is under construction.")),Object(i.b)("h2",{id:"working-with-petl"},"Working with PETL"),Object(i.b)("p",null,"In some cases, it's better to use a lower-level API to achieve your goal. A resource can be exported as a PETL table. For more information please visit PETL's ",Object(i.b)("a",{parentName:"p",href:"https://petl.readthedocs.io/en/stable/"},"documentation portal"),"."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nresource = Resource(path='transform.csv')\npetl_table = resource.to_petl()\n# Use it with PETL framework\nprint(petl_table)\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"+----+---------+------------+\n| id | name    | population |\n+====+=========+============+\n| 1  | germany | 83         |\n+----+---------+------------+\n| 2  | france  | 66         |\n+----+---------+------------+\n| 3  | spain   | 47         |\n+----+---------+------------+\n")))}m.isMDXComponent=!0},161:function(e,t,a){"use strict";a.d(t,"a",(function(){return m})),a.d(t,"b",(function(){return b}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},m=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(a),d=n,b=m["".concat(s,".").concat(d)]||m[d]||u[d]||i;return a?r.a.createElement(b,o(o({ref:t},c),{},{components:a})):r.a.createElement(b,o({ref:t},c))}));function b(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,s=new Array(i);s[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:n,s[1]=o;for(var c=2;c<i;c++)s[c]=a[c];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"}}]);