(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{128:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(3),i=n(7),a=(n(0),n(161)),o=["components"],l={title:"Inline Tutorial",sidebar_label:"Inline"},c={unversionedId:"tutorials/formats/inline-tutorial",id:"tutorials/formats/inline-tutorial",isDocsHomePage:!1,title:"Inline Tutorial",description:"Frictionless supports working with Inline Data from memory.",source:"@site/../docs/tutorials/formats/inline-tutorial.md",slug:"/tutorials/formats/inline-tutorial",permalink:"/docs/tutorials/formats/inline-tutorial",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/tutorials/formats/inline-tutorial.md",version:"current",lastUpdatedBy:"Shashi Gharti",lastUpdatedAt:1653917079,formattedLastUpdatedAt:"5/30/2022",sidebar_label:"Inline",sidebar:"tutorials",previous:{title:"HTML Tutorial",permalink:"/docs/tutorials/formats/html-tutorial"},next:{title:"JSON Tutorial",permalink:"/docs/tutorials/formats/json-tutorial"}},s=[{value:"Reading Data",id:"reading-data",children:[]},{value:"Writing Data",id:"writing-data",children:[]},{value:"Configuring Data",id:"configuring-data",children:[]}],u={toc:s};function p(e){var t=e.components,n=Object(i.a)(e,o);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Frictionless supports working with Inline Data from memory."),Object(a.b)("h2",{id:"reading-data"},"Reading Data"),Object(a.b)("p",null,"You can read data in this format using ",Object(a.b)("inlineCode",{parentName:"p"},"Package/Resource"),", for example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\n\nresource = Resource(data=[['id', 'name'], [1, 'english'], [2, 'german']])\npprint(resource.read_rows())\n")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"[{'id': 1, 'name': 'english'}, {'id': 2, 'name': 'german'}]\n")),Object(a.b)("h2",{id:"writing-data"},"Writing Data"),Object(a.b)("p",null,"The same is actual for writing:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nsource = Resource('data/table.csv')\ntarget = source.write(format='inline')\nprint(target)\nprint(target.to_view())\n")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"{'data': [['id', 'name'], [1, 'english'], [2, '\u4e2d\u56fd\u4eba']], 'format': 'inline'}\n+----+-----------+\n| id | name      |\n+====+===========+\n|  1 | 'english' |\n+----+-----------+\n|  2 | '\u4e2d\u56fd\u4eba'     |\n+----+-----------+\n")),Object(a.b)("h2",{id:"configuring-data"},"Configuring Data"),Object(a.b)("p",null,"There is a dialect to configure this format, for example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\nfrom frictionless.plugins.inline import InlineDialect\n\ndialect = InlineDialect(keyed=True, keys=['name', 'id'])\nresource = Resource(data=[{'id': 1, 'name': 'english'}, {'id': 2, 'name': 'german'}], dialect=dialect)\nprint(resource.to_view())\n")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"+-----------+----+\n| name      | id |\n+===========+====+\n| 'english' |  1 |\n+-----------+----+\n| 'german'  |  2 |\n+-----------+----+\n")),Object(a.b)("p",null,"References:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",{parentName:"li",href:"/docs/references/formats-reference#inline"},"Inline Dialect"))))}p.isMDXComponent=!0},161:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),u=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,f=p["".concat(o,".").concat(d)]||p[d]||m[d]||a;return n?i.a.createElement(f,l(l({ref:t},s),{},{components:n})):i.a.createElement(f,l({ref:t},s))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);