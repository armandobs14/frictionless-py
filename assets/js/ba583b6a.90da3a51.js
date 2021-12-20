(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{137:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return l})),r.d(t,"toc",(function(){return s})),r.d(t,"default",(function(){return p}));var n=r(3),o=r(8),a=(r(0),r(161)),i=["components"],c={title:"Remote Tutorial",sidebar_label:"Remote"},l={unversionedId:"tutorials/schemes/remote-tutorial",id:"tutorials/schemes/remote-tutorial",isDocsHomePage:!1,title:"Remote Tutorial",description:"You can read files remotely with Frictionless. This is a basic functionality of Frictionless.",source:"@site/../docs/tutorials/schemes/remote-tutorial.md",slug:"/tutorials/schemes/remote-tutorial",permalink:"/docs/tutorials/schemes/remote-tutorial",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/tutorials/schemes/remote-tutorial.md",version:"current",lastUpdatedBy:"roll",lastUpdatedAt:1639988960,formattedLastUpdatedAt:"12/20/2021",sidebar_label:"Remote",sidebar:"tutorials",previous:{title:"Multipart Tutorial",permalink:"/docs/tutorials/schemes/multipart-tutorial"},next:{title:"S3 Tutorial",permalink:"/docs/tutorials/schemes/s3-tutorial"}},s=[{value:"Reading Data",id:"reading-data",children:[]},{value:"Writing Data",id:"writing-data",children:[]},{value:"Configuring Data",id:"configuring-data",children:[]}],u={toc:s};function p(e){var t=e.components,r=Object(o.a)(e,i);return Object(a.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"You can read files remotely with Frictionless. This is a basic functionality of Frictionless."),Object(a.b)("h2",{id:"reading-data"},"Reading Data"),Object(a.b)("p",null,"You can read using ",Object(a.b)("inlineCode",{parentName:"p"},"Package/Resource"),", for example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\n\nresource = Resource(path='https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/data/table.csv')\npprint(resource.read_rows())\n")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"[{'id': 1, 'name': 'english'}, {'id': 2, 'name': '\u4e2d\u56fd\u4eba'}]\n")),Object(a.b)("h2",{id:"writing-data"},"Writing Data"),Object(a.b)("p",null,"A similar approach can be used for writing:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-python",metastring:'title="Python"',title:'"Python"'},"from frictionless import Resource\n\nresource = Resource(path='data/table.csv')\nresource.write('https://example.com/data/table.csv') # will POST the file to the server\n")),Object(a.b)("h2",{id:"configuring-data"},"Configuring Data"),Object(a.b)("p",null,"There is a ",Object(a.b)("inlineCode",{parentName:"p"},"Control")," to configure remote data, for example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\nfrom frictionless.plugins.remote import RemoteControl\n\ncontrol = RemoteControl(http_timeout=10)\nresource = Resource(path='https://raw.githubusercontent.com/frictionlessdata/frictionless-py/master/data/table.csv', control=control)\npprint(resource.read_rows())\n")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"[{'id': 1, 'name': 'english'}, {'id': 2, 'name': '\u4e2d\u56fd\u4eba'}]\n")),Object(a.b)("p",null,"References:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",{parentName:"li",href:"/docs/references/schemes-reference#remote"},"Remote Control"))))}p.isMDXComponent=!0},161:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return b}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=o.a.createContext({}),u=function(e){var t=o.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=u(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),d=n,b=p["".concat(i,".").concat(d)]||p[d]||m[d]||a;return r?o.a.createElement(b,c(c({ref:t},s),{},{components:r})):o.a.createElement(b,c({ref:t},s))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);