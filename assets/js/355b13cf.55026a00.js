(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{161:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var o=n(0),a=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),b=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=b(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,r=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=b(n),d=o,m=u["".concat(r,".").concat(d)]||u[d]||p[d]||i;return n?a.a.createElement(m,l(l({ref:t},s),{},{components:n})):a.a.createElement(m,l({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var s=2;s<i;s++)r[s]=n[s];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},96:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var o=n(3),a=n(7),i=(n(0),n(161)),r=["components"],l={title:"Contributing"},c={unversionedId:"development/contributing",id:"development/contributing",isDocsHomePage:!1,title:"Contributing",description:"We welcome contributions from anyone! Please read the following guidelines, and feel free to reach out to us if you have questions. Thanks for your interest in helping make Frictionless awesome!",source:"@site/../docs/development/contributing.md",slug:"/development/contributing",permalink:"/docs/development/contributing",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/development/contributing.md",version:"current",lastUpdatedBy:"Shashi Gharti",lastUpdatedAt:1657117527,formattedLastUpdatedAt:"7/6/2022",sidebar:"development",previous:{title:"Authors",permalink:"/docs/development/authors"},next:{title:"What's Next?",permalink:"/docs/development/whats-next"}},s=[{value:"General Guidelines",id:"general-guidelines",children:[]},{value:"Docs Contribution",id:"docs-contribution",children:[]},{value:"Code Contribution",id:"code-contribution",children:[]},{value:"Release Process",id:"release-process",children:[]}],b={toc:s};function u(e){var t=e.components,n=Object(a.a)(e,r);return Object(i.b)("wrapper",Object(o.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"We welcome contributions from anyone! Please read the following guidelines, and feel free to reach out to us if you have questions. Thanks for your interest in helping make Frictionless awesome!"),Object(i.b)("h2",{id:"general-guidelines"},"General Guidelines"),Object(i.b)("p",null,"We use Github as a code and issues hosting platform. To report a bug or propose a new feature, please open an issue. For pull requests, we would ask you initially create an issue and then create a pull requests linked to this issue."),Object(i.b)("h2",{id:"docs-contribution"},"Docs Contribution"),Object(i.b)("p",null,"To contribute to the documentation, please find an article in the ",Object(i.b)("inlineCode",{parentName:"p"},"docs")," folder and update its contents. These sections can be edited manually:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docs/guides")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docs/tutorials"))),Object(i.b)("p",null,"Some documentation is auto-generated (for more information see ",Object(i.b)("inlineCode",{parentName:"p"},"docs/build.py"),"). Here is a list of auto-generated sections (excluding ",Object(i.b)("inlineCode",{parentName:"p"},"overview/whats-next")," docs):"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docs/references")," (from the codebase's docstrings)"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docs/development")," (from the repository root's docs)")),Object(i.b)("p",null,"You can test this documentation using ",Object(i.b)("a",{parentName:"p",href:"https://livemark.frictionlessdata.io"},"Livemark"),". Livemark in a sync mode executes Python and Bash codeblocks in Markdown and writes the results back. Here is a quick example:"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Run ",Object(i.b)("inlineCode",{parentName:"p"},"livemark")," against an article only if you consider the article to be a trusted source.It will execute codeblocks marked by the ",Object(i.b)("inlineCode",{parentName:"p"},"script")," header.")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"livemark sync docs/guides/basic-examples.md --diff # get the diff\nlivemark sync docs/guides/basic-examples.md --print # print the doc\nlivemark sync docs/guides/basic-examples.md # update inline\n")),Object(i.b)("p",null,"It's possible to run this documentation portal locally. This requires Node.js 12+ installed on your computer, and can be run with the following code:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"cd site\nnpm install\nnpm start\n")),Object(i.b)("p",null,"Alternatively, you can run the documentation portal with Docker. With\nboth Docker and Docker Compose installed on the system, first build the docker container with:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"docker build --rm -t frictionless-docs .\n")),Object(i.b)("p",null,"then, every time you want to run the documentation portal locally, run:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"docker-compose up\n")),Object(i.b)("p",null,"then open http://localhost:3000 on a web browser to see the portal."),Object(i.b)("p",null,"To update a reference in ",Object(i.b)("inlineCode",{parentName:"p"},"docs/references")," and some other auto-generated documents please update the codebase docstrings or root documents. For more information about auto-generated documentation see ",Object(i.b)("inlineCode",{parentName:"p"},"docs/build.py"),"."),Object(i.b)("h2",{id:"code-contribution"},"Code Contribution"),Object(i.b)("p",null,"Frictionless is a Python3.6+ framework, and it uses some common Python tools for the development process:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"testing: ",Object(i.b)("inlineCode",{parentName:"li"},"pytest")),Object(i.b)("li",{parentName:"ul"},"linting: ",Object(i.b)("inlineCode",{parentName:"li"},"pylama")),Object(i.b)("li",{parentName:"ul"},"formatting: ",Object(i.b)("inlineCode",{parentName:"li"},"black")),Object(i.b)("li",{parentName:"ul"},"type checking: ",Object(i.b)("inlineCode",{parentName:"li"},"mypy")," (under construction)")),Object(i.b)("p",null,"You also need ",Object(i.b)("inlineCode",{parentName:"p"},"git")," to work on the project, and ",Object(i.b)("inlineCode",{parentName:"p"},"make")," is recommended. After cloning the repository, we recommend creating a virtual environment and installing the dependencies by following this code:"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"this will install a ",Object(i.b)("inlineCode",{parentName:"p"},"git commit")," hook running the tests")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},'python3.8 -m venv .python\nsource .python/bin/activate\npip install wheel\nmake install\nalias "frictionless=python -m frictionless"\n')),Object(i.b)("p",null,"Note: You may need to run ",Object(i.b)("inlineCode",{parentName:"p"},"sudo apt-get install postgresql libpq-dev")," on a Debian-based system, because the python Postgres module depends on some postgres CLI tools."),Object(i.b)("p",null,"Then you can run various make commands:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"make docs")," - build the docs"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"make format")," - format source code"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"make install")," - install the dependencies (we did before)"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"make lint")," - lint the project"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"make release")," - release a new version"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"make test")," - run the tests"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"make test-ci")," - run the tests (including integration)")),Object(i.b)("p",null,"We also recommend running underlying commands like ",Object(i.b)("inlineCode",{parentName:"p"},"pytest")," or ",Object(i.b)("inlineCode",{parentName:"p"},"pylama")," to speed up the development process, though this is optional."),Object(i.b)("h2",{id:"release-process"},"Release Process"),Object(i.b)("p",null,"To release a new version:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"check that you have push access to the ",Object(i.b)("inlineCode",{parentName:"li"},"master")," branch"),Object(i.b)("li",{parentName:"ul"},"update ",Object(i.b)("inlineCode",{parentName:"li"},"frictionless/assets/VERSION")," following the SemVer standard"),Object(i.b)("li",{parentName:"ul"},"add changes to ",Object(i.b)("inlineCode",{parentName:"li"},"CHANGELOG.md")," if it's not a patch release (major or micro)"),Object(i.b)("li",{parentName:"ul"},"run ",Object(i.b)("inlineCode",{parentName:"li"},"make release")," which create a release commit and tag and push it to Github"),Object(i.b)("li",{parentName:"ul"},"an actual release will happen on the Travis CI platform after running the tests")))}u.isMDXComponent=!0}}]);