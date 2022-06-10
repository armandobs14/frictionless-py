(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{133:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return l})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return u}));var n=r(3),a=r(7),i=(r(0),r(161)),o=["components"],l={title:"JSON Tutorial",sidebar_label:"JSON",cleanup:["rm table.json"]},s={unversionedId:"tutorials/formats/json-tutorial",id:"tutorials/formats/json-tutorial",isDocsHomePage:!1,title:"JSON Tutorial",description:"Frictionless supports parsing JSON tables (JSON and JSONL/NDJSON).",source:"@site/../docs/tutorials/formats/json-tutorial.md",slug:"/tutorials/formats/json-tutorial",permalink:"/docs/tutorials/formats/json-tutorial",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/tutorials/formats/json-tutorial.md",version:"current",lastUpdatedBy:"Shashi Gharti",lastUpdatedAt:1654838896,formattedLastUpdatedAt:"6/10/2022",sidebar_label:"JSON",sidebar:"tutorials",previous:{title:"Inline Tutorial",permalink:"/docs/tutorials/formats/inline-tutorial"},next:{title:"ODS Tutorial",permalink:"/docs/tutorials/formats/ods-tutorial"}},c=[{value:"Reading Data",id:"reading-data",children:[]},{value:"Writing Data",id:"writing-data",children:[]},{value:"Configuring Data",id:"configuring-data",children:[]}],p={toc:c};function u(e){var t=e.components,r=Object(a.a)(e,o);return Object(i.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Frictionless supports parsing JSON tables (JSON and JSONL/NDJSON)."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'title="CLI"',title:'"CLI"'},"pip install frictionless[json]\npip install 'frictionless[json]' # for zsh shell\n")),Object(i.b)("h2",{id:"reading-data"},"Reading Data"),Object(i.b)("p",null,"You can read this format using ",Object(i.b)("inlineCode",{parentName:"p"},"Package/Resource"),", for example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\n\nresource = Resource(path='data/table.json')\npprint(resource.read_rows())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[{'id': 1, 'name': 'english'}, {'id': 2, 'name': '\u4e2d\u56fd\u4eba'}]\n")),Object(i.b)("h2",{id:"writing-data"},"Writing Data"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"We use the ",Object(i.b)("inlineCode",{parentName:"p"},"path")," argument for ",Object(i.b)("inlineCode",{parentName:"p"},"resource.write")," to ensure that it will not be guessed to be a metadata file")),Object(i.b)("p",null,"The same is actual for writing:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nsource = Resource(data=[['id', 'name'], [1, 'english'], [2, 'german']])\ntarget = source.write(path='table.json')\nprint(target)\nprint(target.to_view())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"{'path': 'table.json'}\n+----+-----------+\n| id | name      |\n+====+===========+\n|  1 | 'english' |\n+----+-----------+\n|  2 | 'german'  |\n+----+-----------+\n")),Object(i.b)("h2",{id:"configuring-data"},"Configuring Data"),Object(i.b)("p",null,"There is a dialect to configure how Frictionless read and write files in this format. For example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\nfrom frictionless.plugins.json import JsonDialect\n\nresource = Resource(data=[['id', 'name'], [1, 'english'], [2, 'german']])\nresource.write('tmp/table.json', dialect=JsonDialect(keyed=True))\n")),Object(i.b)("p",null,"References:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/references/formats-reference#json"},"JSON Dialect"))))}u.isMDXComponent=!0},161:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),d=n,m=u["".concat(o,".").concat(d)]||u[d]||b[d]||i;return r?a.a.createElement(m,l(l({ref:t},c),{},{components:r})):a.a.createElement(m,l({ref:t},c))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var c=2;c<i;c++)o[c]=r[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);