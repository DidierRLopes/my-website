"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[36666],{9043:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>c,frontMatter:()=>o,metadata:()=>a,toc:()=>h});var n=i(85893),r=i(3905);const o={slug:"ranking-99-mind-f-ck-movies",title:"Ranking 99 Mind f*ck movies",date:new Date("2021-08-15T00:00:00.000Z"),image:"/blog/2021-08-15-ranking-99-mind-f-ck-movies.png",tags:["Movies","Thrillers","IMDbPy","Python","Sorting Algorithm"],description:"Ranking and sorting a list of 99 mind-bending thriller movies using IMDbPy API in Python."},s=void 0,a={permalink:"/blog/ranking-99-mind-f-ck-movies",editUrl:"https://github.com/DidierRLopes/my-website/tree/main/blog/2021-08-15-ranking-99-mind-f-ck-movies.md",source:"@site/blog/2021-08-15-ranking-99-mind-f-ck-movies.md",title:"Ranking 99 Mind f*ck movies",description:"Ranking and sorting a list of 99 mind-bending thriller movies using IMDbPy API in Python.",date:"2021-08-15T00:00:00.000Z",tags:[{inline:!0,label:"Movies",permalink:"/blog/tags/movies"},{inline:!0,label:"Thrillers",permalink:"/blog/tags/thrillers"},{inline:!0,label:"IMDbPy",permalink:"/blog/tags/im-db-py"},{inline:!0,label:"Python",permalink:"/blog/tags/python"},{inline:!0,label:"Sorting Algorithm",permalink:"/blog/tags/sorting-algorithm"}],readingTime:2.135,hasTruncateMarker:!0,authors:[],frontMatter:{slug:"ranking-99-mind-f-ck-movies",title:"Ranking 99 Mind f*ck movies",date:"2021-08-15T00:00:00.000Z",image:"/blog/2021-08-15-ranking-99-mind-f-ck-movies.png",tags:["Movies","Thrillers","IMDbPy","Python","Sorting Algorithm"],description:"Ranking and sorting a list of 99 mind-bending thriller movies using IMDbPy API in Python."},unlisted:!1,prevItem:{title:"Time-Series CrossValidation for NN",permalink:"/blog/time-series-crossvalidation-for-nn"},nextItem:{title:"K-means algorithm to visit a new city",permalink:"/blog/k-means-clustering-to-visit-a-new-city"}},l={authorsImageUrls:[]},h=[];function d(e){const t={a:"a",em:"em",img:"img",p:"p",strong:"strong",...(0,r.ah)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{align:"center",children:(0,n.jsx)("img",{width:"600",src:"/blog/2021-08-15-ranking-99-mind-f-ck-movies.png"})}),"\n",(0,n.jsx)("br",{}),"\n",(0,n.jsx)(t.p,{children:"Ranking and sorting a list of 99 mind-bending thriller movies using IMDbPy API in Python."}),"\n",(0,n.jsxs)(t.p,{children:["The open source code is available ",(0,n.jsx)(t.a,{href:"https://github.com/DidierRLopes/SortMoviesPerRating",children:"here"}),"."]}),"\n",(0,n.jsx)("div",{style:{borderTop:"1px solid #0088CC",margin:"1.5em 0"}}),"\n",(0,n.jsx)(t.p,{children:"During the Christmas holidays, me and my girlfriend, after watching The Office [US] twice in a row, and knowing most of Dwight\u2019s pranks off by heart, decided that it was time to find something worth watching."}),"\n",(0,n.jsxs)(t.p,{children:["Although there\u2019s lots of tempting series out there, we didn\u2019t want to follow that path as we don\u2019t like the \u201caddiction\u201d effect that a series has. Also, we have the same taste regarding movies, where ",(0,n.jsx)(t.strong,{children:"we both enjoy complex thriller plots"}),", that leave your mind to resonate about them long after being done with it. Personally, I consider a movie great when it still crosses my mind when trying to sleep or the day after. So, thriller movies it was."]}),"\n",(0,n.jsxs)(t.p,{children:["After doing a little research work I came across this list of movies on Reddit: ",(0,n.jsx)(t.a,{href:"https://www.reddit.com/r/coolguides/comments/geipee/99_mindfck_movies/",children:"99 mind f*ck movies"}),". I knew this list was good because most of my favourite movies were there, e.g. ",(0,n.jsx)(t.em,{children:"The Prestige, Inception, The Usual Suspects, Primal Fear"}),", and ",(0,n.jsx)(t.em,{children:"Ex Machina"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"So, the movie list was decided, and with that, also our new year\u2019s resolution."}),"\n",(0,n.jsx)(t.p,{children:"However, this list had 2 issues:"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"1. The list didn\u2019t have any particular order."})," We would like to have the list ranked from best to worst, so that watching the best ones first will keep our motivation levels up to finish the list."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"2. The movie title didn\u2019t have the released year."})," Although we don\u2019t particularly mind old movies, sometimes we\u2019re just not in the mood to watch a B&W screen, or poor image resolution."]}),"\n",(0,n.jsx)(t.p,{children:"Therefore, while Meg was busy, I was on a role to hack something that would both sort the list based on IMDB ranking, and add the release years to the titles."}),"\n",(0,n.jsxs)(t.p,{children:["In a couple of minutes, I was already playing with ",(0,n.jsx)(t.a,{href:"https://imdbpy.github.io/",children:"IMDbPy API"}),". This allowed me to have the sorting algorithm running in the background pretty quick. Within the hour, we already had our sorted movie list. Which I have attached below for future reference."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"image",src:i(96458).Z+"",width:"1400",height:"570"})}),"\n",(0,n.jsxs)(t.p,{children:["The first movie of the list that none of us had already watched was the movie ",(0,n.jsx)(t.a,{href:"https://www.imdb.com/title/tt1255953/",children:"Incendies"}),". After having watched this movie, I can already tell you that sorting out this list was worth it. Definitely mind blowing, and a great watch."]}),"\n",(0,n.jsxs)(t.p,{children:["As usual, you can find the source code on my github: ",(0,n.jsx)(t.a,{href:"https://github.com/DidierRLopes/SortMoviesPerRating",children:"SortMoviesPerRating"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Hope you enjoyed this read!"})]})}function c(e={}){const{wrapper:t}={...(0,r.ah)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},3905:(e,t,i)=>{i.d(t,{ah:()=>h});var n=i(67294);function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function s(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){r(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function a(e,t){if(null==e)return{};var i,n,r=function(e,t){if(null==e)return{};var i,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||(r[i]=e[i]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}var l=n.createContext({}),h=function(e){var t=n.useContext(l),i=t;return e&&(i="function"==typeof e?e(t):s(s({},t),e)),i},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var i=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),m=h(i),g=r,p=m["".concat(l,".").concat(g)]||m[g]||d[g]||o;return i?n.createElement(p,s(s({ref:t},c),{},{components:i})):n.createElement(p,s({ref:t},c))}));c.displayName="MDXCreateElement"},96458:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/2021-08-15-ranking-99-mind-f-ck-movies_1-24edf2187b50f48ad12feadec6633bf9.png"}}]);