"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[18546],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>f});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},d=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),m=l(r),p=i,f=m["".concat(c,".").concat(p)]||m[p]||u[p]||o;return r?n.createElement(f,a(a({ref:t},d),{},{components:r})):n.createElement(f,a({ref:t},d))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[m]="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},88828:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(67294),i=r(35742);function o(e){let{title:t}=e;return n.createElement(i.Z,null,n.createElement("title",{className:"text-2xl bg-slate-500"},t))}},71460:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(67294);function i(e){let{videos:t}=e;return n.createElement("div",{className:"mx-auto mt-8"},t.map((e=>n.createElement("div",{className:"container relative justify-center items-center mb-8 my-4 mx-2 border-[1px] p-2 rounded border-[#0088CC]"},n.createElement("div",null,n.createElement("div",{className:"justify-left items-start text-xs"},e.date),n.createElement("h3",{className:"justify-center font-bold items-center text-base mb-2"},e.title)),n.createElement("div",{className:"flex place-items-center justify-center items-center rounded-sm mx-auto"},n.createElement("iframe",{src:e.embed,width:"512",height:"256",title:e.title})),n.createElement("div",{className:"flex-none overflow-y-scroll rounded-sm mx-auto text-sm p-2 pr-8 mt-2"},n.createElement("p",null,n.createElement("strong",null,e.time)," - ",e.description))))))}},82091:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>m,default:()=>b,frontMatter:()=>d,metadata:()=>u,toc:()=>f});var n=r(87462),i=r(67294),o=r(3905),a=r(71460);const s=[{title:"OpenBB Terminal Pro Tutorial - full length version",embed:"https://www.youtube.com/embed/pxKqd1r2Ut4?si=9-UZw9vEciBI4PuG",description:"Discover the superior investment research capabilities of the OpenBB Terminal Pro. Built on top of the open-source OpenBB Terminal, our platform provides a sleek graphical interface that is intuitive and fully customizable, making it easier for you to access and analyze financial information with ease.",date:"2023-12-14",time:"55 minutes"},{title:"How to use the OpenBB Terminal - full length version",embed:"https://www.youtube.com/embed/76IkkbUlQcA?si=E1RFFRa_C2Z4YtYo",description:"Get started with the OpenBB Terminal today and learn everything you need to perform your investment research and analysis.",date:"2023-10-22",time:"40 minutes"},{title:"OpenBB x Keychron: Doing due diligence on a stock will never be the same",embed:"https://www.youtube.com/embed/cgeN3Ep2nEw?si=9WVjmvppx3tHTQrb",description:"In this video I show the concept of routines in the OpenBB Terminal and how you can automate your investment research workflows. In addition, I share how you can create your own custom MACROS on your Keychron mechanical keyboard",date:"2023-02-26",time:"17 minutes"},{title:"Adding feargreed command to OpenBB Terminal",embed:"https://www.youtube.com/embed/9BMI9cleTTg",description:"This is a video of myself live coding on Gamestonk Terminal. More precisely, adding the 'feargreed' command to the 'economy' menu. Along with the coding, I explain the architecture that we are currently using, so that more developers can add features.",date:"2022-06-20",time:"70 minutes"},{title:"OpenBB Terminal Demo",embed:"https://www.youtube.com/embed/fqGPK8OVHLk",description:"OpenBB Terminal Demo after 1 year of development. In this video I go over: introducing the terminal, how to set API keys, enable feature flags, export data, integrate excel, prediction menu, advanced user and routines, +500 features, portfolio menu, automatic reports, dashboards, OpenBB API, and even our OpenBB Bot.",date:"2022-02-24",time:"43 minutes"}];function c(){return i.createElement(a.Z,{videos:s})}var l=r(88828);const d={title:"Product videos",sidebar_position:4},m=void 0,u={unversionedId:"media/product-videos",id:"media/product-videos",title:"Product videos",description:"",source:"@site/content/media/product-videos.md",sourceDirName:"media",slug:"/media/product-videos",permalink:"/media/product-videos",draft:!1,editUrl:"https://github.com/DidierRLopes/my-website/tree/main/content/media/product-videos.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Product videos",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Webinars",permalink:"/media/webinars"},next:{title:"Podcasts",permalink:"/media/podcasts"}},p={},f=[],y={toc:f},v="wrapper";function b(e){let{components:t,...r}=e;return(0,o.kt)(v,(0,n.Z)({},y,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)(l.Z,{title:"Product videos - Media | Didier",mdxType:"HeadTitle"}),(0,o.kt)(c,{mdxType:"MediaVideosProductVideos"}))}b.isMDXComponent=!0}}]);