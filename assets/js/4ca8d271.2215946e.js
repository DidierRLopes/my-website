"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[43830],{21282:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var o=n(85893),i=n(3905);const r={slug:"neistpoint-project",title:"NeistPoint Project",date:new Date("2021-05-23T00:00:00.000Z"),image:"/blog/2021-05-23-neistpoint-project.png",tags:["NeistPoint","Clothing Brand","Sustainability","Project Management","C++","Stock Management"],description:"In this blogpost, I share my journey of starting a sustainable clothing brand, managing the project, and developing a stock management tool in C++."},a=void 0,s={permalink:"/blog/neistpoint-project",editUrl:"https://github.com/DidierRLopes/my-website/tree/main/blog/2021-05-23-neistpoint-project.md",source:"@site/blog/2021-05-23-neistpoint-project.md",title:"NeistPoint Project",description:"In this blogpost, I share my journey of starting a sustainable clothing brand, managing the project, and developing a stock management tool in C++.",date:"2021-05-23T00:00:00.000Z",tags:[{inline:!0,label:"NeistPoint",permalink:"/blog/tags/neist-point"},{inline:!0,label:"Clothing Brand",permalink:"/blog/tags/clothing-brand"},{inline:!0,label:"Sustainability",permalink:"/blog/tags/sustainability"},{inline:!0,label:"Project Management",permalink:"/blog/tags/project-management"},{inline:!0,label:"C++",permalink:"/blog/tags/c"},{inline:!0,label:"Stock Management",permalink:"/blog/tags/stock-management"}],readingTime:3.025,hasTruncateMarker:!0,authors:[],frontMatter:{slug:"neistpoint-project",title:"NeistPoint Project",date:"2021-05-23T00:00:00.000Z",image:"/blog/2021-05-23-neistpoint-project.png",tags:["NeistPoint","Clothing Brand","Sustainability","Project Management","C++","Stock Management"],description:"In this blogpost, I share my journey of starting a sustainable clothing brand, managing the project, and developing a stock management tool in C++."},unlisted:!1,prevItem:{title:"Customizable Meme Filter",permalink:"/blog/customizable-meme-filter"},nextItem:{title:"Move over Bloomberg Terminal, here comes Gamestonk Terminal",permalink:"/blog/move-over-bloomberg-terminal-here-comes-gamestonk-terminal"}},l={authorsImageUrls:[]},c=[{value:"Context",id:"context",level:2},{value:"Implementation",id:"implementation",level:2}];function h(e){const t={a:"a",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",...(0,i.ah)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{align:"center",children:(0,o.jsx)("img",{width:"600",src:"/blog/2021-05-23-neistpoint-project.png"})}),"\n",(0,o.jsx)("br",{}),"\n",(0,o.jsx)(t.p,{children:"In this blogpost, I share my journey of starting a sustainable clothing brand, managing the project, and developing a stock management tool in C++."}),"\n",(0,o.jsxs)(t.p,{children:["The open source code is available ",(0,o.jsx)(t.a,{href:"https://github.com/DidierRLopes/NeistpointCLI",children:"here"}),"."]}),"\n",(0,o.jsx)("div",{style:{borderTop:"1px solid #0088CC",margin:"1.5em 0"}}),"\n",(0,o.jsx)(t.h2,{id:"context",children:"Context"}),"\n",(0,o.jsxs)(t.p,{children:["More than 2 years ago, me and some friends started a clothing brand - ",(0,o.jsx)(t.strong,{children:"NeistPoint"}),". The logo and name is inspired by the Neist Point Lighthouse in the Isle of Skye. The motto was \u201c",(0,o.jsx)(t.strong,{children:"For a greener future and a bluer ocean"}),"\u201d, and the goal was to raise awareness to contribute for a sustainable environment."]}),"\n",(0,o.jsxs)(t.p,{children:["At ",(0,o.jsx)(t.strong,{children:"Neist"}),", we tried to not be yet another clothing brand, but actually to fill the current gap in the retail industry by producing high-quality, eco-friendly clothes at affordable prices. And we achieved that. For instance, our t-shirts are made of 100% organic ring-spun combed cotton, and they last longer than my Lacoste t-shirts \u2014 seriously."]}),"\n",(0,o.jsxs)(t.p,{children:["The problem is that to be profitable, you need to either increase the prices of your products, or decrease the quality, which were not things we wanted to do since they didn\u2019t represent the value of our brand. Due to that, and the fact that the team behind our brand no longer has time/resources, we\u2019re dropping our ",(0,o.jsx)(t.strong,{children:"last ever"})," season now."]}),"\n",(0,o.jsxs)(t.p,{children:["Anyway, no regrets from my side, it has been a great learning experience to understand what is involved around the creation of a brand, being a project manager internally, and doing something other than coding in my spare time. ",(0,o.jsx)(t.em,{children:"Also, most importantly, ending up with a full new wardrobe of pieces that I love and that will probably last for my kids."})]}),"\n",(0,o.jsx)(t.p,{children:"Sorry for this rambling, just wanted to share this context with everyone."}),"\n",(0,o.jsx)(t.h2,{id:"implementation",children:"Implementation"}),"\n",(0,o.jsx)(t.p,{children:"Given that our team had no experience in clothing whatsoever, and based on our needs, our steps to make this a high-quality product were:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsx)(t.li,{children:"Get the best (environmentaly friendly) clothing material"}),"\n",(0,o.jsx)(t.li,{children:"Send it to the best embroidery store in Portugal"}),"\n",(0,o.jsx)(t.li,{children:"Package it and forward it onto the customer"}),"\n"]}),"\n",(0,o.jsx)("br",{}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"image",src:n(56768).Z+"",width:"1060",height:"738"})}),"\n",(0,o.jsxs)(t.p,{children:["This process was ",(0,o.jsx)(t.strong,{children:"far from being optimised"}),". In fact, pretty much everything was manual. Apart from the creation of the clothes. Therefore, we needed a Software to keep track of the products at each of it\u2019s stages: ",(0,o.jsx)(t.em,{children:"material to request, material shipping, material in stock, product to create, product creating, product in stock, and product sent"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["Since I didn\u2019t find anything that I liked online, and I knew how to code, I thought the best solution was to develop something myself. This way it could be adapted to perfectly fit my own requirements (advantages of being your own product owner eheh). In addition, I wanted to improve my C++ skills, so I thought, ",(0,o.jsx)(t.strong,{children:"why not?"})]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"image",src:n(45136).Z+"",width:"892",height:"704"})}),"\n",(0,o.jsxs)(t.p,{children:["For 1 week or so, during my commute I worked on the ",(0,o.jsx)(t.a,{href:"https://github.com/DidierRLopes/NeistpointCLI",children:"NeistPoint Stock Managemen"})," tool. To be honest, I think it took longer to devise the architecture behind it than to actually write the code, as there were lots of things that I wanted to be taken into account. Also, the fact that the \u201cdatabase\u201d is a .csv file, was intentional. This way, we could share this file between the team members."]}),"\n",(0,o.jsxs)(t.p,{children:["Hope someone finds this tool interesting, and gets inspired to develop their own software to meet their own project requirements. In the meantime, feel free to check us one last time on ",(0,o.jsx)(t.a,{href:"https://neistclothing.com/",children:"our website"})," or ",(0,o.jsx)(t.a,{href:"https://www.instagram.com/neistclothing/",children:"instagram"}),". You may even spot me in some of the pictures!"]}),"\n",(0,o.jsxs)(t.p,{children:["The repository for the code can be found here: ",(0,o.jsx)(t.a,{href:"https://github.com/DidierRLopes/NeistpointCLI",children:"https://github.com/DidierRLopes/NeistpointCLI"})]}),"\n",(0,o.jsx)(t.p,{children:"Thanks for reading, as always!"})]})}function d(e={}){const{wrapper:t}={...(0,i.ah)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},3905:(e,t,n)=>{n.d(t,{ah:()=>c});var o=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},h={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=i,g=p["".concat(l,".").concat(m)]||p[m]||h[m]||r;return n?o.createElement(g,a(a({ref:t},d),{},{components:n})):o.createElement(g,a({ref:t},d))}));d.displayName="MDXCreateElement"},56768:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/2021-05-23-neistpoint-project_1-f855b88c515711e04ff8f39a50411066.png"},45136:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/2021-05-23-neistpoint-project_2-84b911e96594fe15fbe6a7c12dcbb60e.png"}}]);