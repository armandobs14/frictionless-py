(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{115:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return a})),t.d(r,"metadata",(function(){return c})),t.d(r,"toc",(function(){return s})),t.d(r,"default",(function(){return p}));var n=t(3),o=t(8),i=(t(0),t(161)),a={title:"Server Guide"},c={unversionedId:"guides/extension/server-guide",id:"guides/extension/server-guide",isDocsHomePage:!1,title:"Server Guide",description:"The Server concept is quite simple. A server needs to have a two functions:",source:"@site/../docs/guides/extension/server-guide.md",slug:"/guides/extension/server-guide",permalink:"/docs/guides/extension/server-guide",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/master/docs/../docs/guides/extension/server-guide.md",version:"current",lastUpdatedBy:"roll",lastUpdatedAt:1620980440,formattedLastUpdatedAt:"5/14/2021",sidebar:"guides",previous:{title:"Error Guide",permalink:"/docs/guides/extension/error-guide"},next:{title:"Storage Guide",permalink:"/docs/guides/extension/storage-guide"}},s=[{value:"Server Example",id:"server-example",children:[]}],u={toc:s};function p(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},u,t,{components:r,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The Server concept is quite simple. A server needs to have a two functions:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"server.start")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"server.stop"))),Object(i.b)("h2",{id:"server-example"},"Server Example"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'goodread title="Python"',goodread:!0,title:'"Python"'},"from frictionless import Server\n\nclass ApiServer(Server):\n\n    # Start\n\n    def start(self, *, port):\n        app = create_api()\n        # This function create a Flask app\n        server = create_server(app, port=port)\n        # This functio runs it\n        server.run()\n")))}p.isMDXComponent=!0},161:function(e,r,t){"use strict";t.d(r,"a",(function(){return l})),t.d(r,"b",(function(){return m}));var n=t(0),o=t.n(n);function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){i(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=o.a.createContext({}),p=function(e){var r=o.a.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},l=function(e){var r=p(e.components);return o.a.createElement(u.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},f=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,i=e.originalType,a=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),l=p(t),f=n,m=l["".concat(a,".").concat(f)]||l[f]||d[f]||i;return t?o.a.createElement(m,c(c({ref:r},u),{},{components:t})):o.a.createElement(m,c({ref:r},u))}));function m(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var i=t.length,a=new Array(i);a[0]=f;var c={};for(var s in r)hasOwnProperty.call(r,s)&&(c[s]=r[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,a[1]=c;for(var u=2;u<i;u++)a[u]=t[u];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"}}]);