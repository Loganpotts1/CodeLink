(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{1:function(t,e,n){"use strict";n.d(e,"u",(function(){return r})),n.d(e,"t",(function(){return a})),n.d(e,"s",(function(){return c})),n.d(e,"r",(function(){return o})),n.d(e,"x",(function(){return u})),n.d(e,"d",(function(){return i})),n.d(e,"n",(function(){return s})),n.d(e,"m",(function(){return l})),n.d(e,"o",(function(){return d})),n.d(e,"j",(function(){return p})),n.d(e,"k",(function(){return f})),n.d(e,"l",(function(){return b})),n.d(e,"w",(function(){return O})),n.d(e,"e",(function(){return E})),n.d(e,"q",(function(){return h})),n.d(e,"a",(function(){return j})),n.d(e,"i",(function(){return v})),n.d(e,"h",(function(){return g})),n.d(e,"p",(function(){return y})),n.d(e,"v",(function(){return m})),n.d(e,"g",(function(){return k})),n.d(e,"c",(function(){return T})),n.d(e,"b",(function(){return S})),n.d(e,"f",(function(){return R}));var r="SET_ALERT",a="REMOVE_ALERT",c="REGISTER_SUCCESS",o="REGISTER_FAIL",u="USER_LOADED",i="AUTH_ERROR",s="LOGIN_SUCCESS",l="LOGIN_FAIL",d="LOGOUT",p="GET_PROFILE",f="GET_PROFILES",b="GET_REPOS",O="UPDATE_PROFILE",E="CLEAR_PROFILE",h="PROFILE_ERROR",j="ACCOUNT_DELETED",v="GET_POSTS",g="GET_POST",y="POST_ERROR",m="UPDATE_LIKES",k="DELETE_POST",T="ADD_POST",S="ADD_COMMENT",R="DELETE_COMMENT"},12:function(t,e,n){"use strict";var r=n(45),a=n.n(r),c=n(22),o=n(1),u=a.a.create({baseURL:"https://devconnector-3.herokuapp.com/api",headers:{"Content-Type":"application/json"}});u.interceptors.response.use((function(t){return t}),(function(t){if(401===t.response.status)c.a.dispatch({type:o.o});else if(404===t.response.status)return window.location="/";return Promise.reject(t)})),e.a=u},18:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(81),a=n(1),c=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e3;return function(c){var o=Object(r.a)();c({type:a.u,payload:{msg:t,alertType:e,id:o}}),setTimeout((function(){return c({type:a.t,payload:o})}),n)}}},21:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(12);function a(t){var e=r.a.defaults.headers.common;t?(e["x-auth-token"]=t,localStorage.setItem("token",t)):(delete e["x-auth-token"],localStorage.removeItem("token"))}},22:function(t,e,n){"use strict";var r=n(11),a=n(46),c=n(47),o=n(23),u=n(1),i=[],s=n(2),l={token:localStorage.getItem("token"),isAuthenticated:!1,loading:!0,user:null},d={profile:null,profiles:[],repos:[],loading:!0,error:{}},p={posts:[],post:null,loading:!0,error:{}},f=Object(r.combineReducers)({alerts:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=arguments.length>1?arguments[1]:void 0,n=e.type,r=e.payload;switch(n){case u.u:return[].concat(Object(o.a)(t),[r]);case u.t:return t.filter((function(t){return t.id!==r}));default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,e=arguments.length>1?arguments[1]:void 0,n=e.type,r=e.payload;switch(n){case u.s:case u.n:return Object(s.a)(Object(s.a)(Object(s.a)({},t),r),{},{isAuthenticated:!0,loading:!1});case u.x:return Object(s.a)(Object(s.a)({},t),{},{isAuthenticated:!0,loading:!1,user:r});case u.o:case u.d:case u.a:return{token:null,isAuthenticated:!1,loading:!1,user:null};default:return t}},profile:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,e=arguments.length>1?arguments[1]:void 0,n=e.type,r=e.payload;switch(n){case u.j:case u.w:return Object(s.a)(Object(s.a)({},t),{},{profile:r,loading:!1});case u.k:return Object(s.a)(Object(s.a)({},t),{},{profiles:r,loading:!1});case u.q:return Object(s.a)(Object(s.a)({},t),{},{profile:null,loading:!1,error:r});case u.e:return Object(s.a)(Object(s.a)({},t),{},{profile:null,repos:[],loading:!1});case u.l:return Object(s.a)(Object(s.a)({},t),{},{repos:r,loading:!1});default:return t}},post:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,e=arguments.length>1?arguments[1]:void 0,n=e.type,r=e.payload;switch(n){case u.h:return Object(s.a)(Object(s.a)({},t),{},{post:r,loading:!1});case u.i:return Object(s.a)(Object(s.a)({},t),{},{posts:r,loading:!1});case u.v:return Object(s.a)(Object(s.a)({},t),{},{posts:t.posts.map((function(t){return t._id===r.postId&&(t.likes=r.likes),t})),loading:!1});case u.b:case u.f:return Object(s.a)(Object(s.a)({},t),{},{post:Object(s.a)(Object(s.a)({},t.post),{},{comments:r}),loading:!1});case u.c:return Object(s.a)(Object(s.a)({},t),{},{posts:[r].concat(Object(o.a)(t.posts)),loading:!1});case u.g:return Object(s.a)(Object(s.a)({},t),{},{posts:t.posts.filter((function(t){return t._id!==r})),loading:!1});case u.p:return Object(s.a)(Object(s.a)({},t),{},{error:r,loading:!1});default:return t}}}),b=n(21),O=[c.a],E=Object(r.createStore)(f,{},Object(a.composeWithDevTools)(r.applyMiddleware.apply(void 0,O))),h=E.getState();E.subscribe((function(){var t=h.auth.token,e=(h=E.getState()).auth.token;e!==t&&Object(b.a)(e)}));e.a=E},32:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n(0),a=n.n(r),c=n(48),o=n.n(c);function u(){return a.a.createElement("img",{src:o.a,style:{width:"200px",margin:"auto",display:"block"},alt:"Loading..."})}},35:function(t,e,n){"use strict";n.d(e,"e",(function(){return s})),n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return d})),n.d(e,"d",(function(){return p})),n.d(e,"a",(function(){return f}));var r=n(10),a=n.n(r),c=n(14),o=n(12),u=n(18),i=n(1),s=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(n){var r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.post("/users",t);case 3:r=e.sent,n({type:i.s,payload:r.data}),n(d()),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),(c=e.t0.response.data.errors)&&c.forEach((function(t){return n(Object(u.a)(t.msg,"danger"))})),n({type:i.r});case 13:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},l=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(n){var r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.put("/auth",t);case 3:r=e.sent,n({type:i.n,payload:r.data}),n(d()),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),(c=e.t0.response.data.errors)&&c.forEach((function(t){return n(Object(u.a)(t.msg,"danger"))})),n({type:i.m});case 13:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},d=function(){return function(){var t=Object(c.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.a.get("/auth");case 3:n=t.sent,e({type:i.x,payload:n.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e({type:i.d});case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},p=function(){return function(t){t({type:i.e}),t({type:i.o})}},f=function(){return function(){var t=Object(c.a)(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!window.confirm("Are you sure? This can't be undone.")){t.next=12;break}return t.prev=1,t.next=4,o.a.delete("/users");case 4:e({type:i.e}),e({type:i.a}),e(Object(u.a)("Your account and profile have been deleted","danger")),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),e({type:i.d});case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}()}},48:function(t,e,n){t.exports=n.p+"static/media/spinner.8a0896ae.gif"},50:function(t,e,n){t.exports=n(80)},77:function(t,e,n){},80:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),c=n(19),o=n.n(c),u=n(17),i=n(29),s=n(4),l=n(21),d=n(35),p=n(1),f=n(32),b=(n(77),Object(r.lazy)((function(){return n.e(12).then(n.bind(null,286))}))),O=Object(r.lazy)((function(){return n.e(14).then(n.bind(null,278))})),E=Object(r.lazy)((function(){return n.e(13).then(n.bind(null,285))}));function h(){var t=Object(u.b)();return Object(r.useEffect)((function(){localStorage.token&&(Object(l.a)(localStorage.token),t(Object(d.b)())),window.addEventListener("storage",(function(){localStorage.token||t({type:p.o})}))}),[t]),a.a.createElement(i.a,null,a.a.createElement("div",{className:"page"},a.a.createElement(r.Suspense,{fallback:f.a},a.a.createElement(O,null),a.a.createElement(s.d,null,a.a.createElement(s.b,{exact:!0,path:"/",component:b}),a.a.createElement(s.b,{component:E})))))}var j=n(22);n(79);o.a.render(a.a.createElement(u.a,{store:j.a},a.a.createElement(h,null)),document.getElementById("root"))}},[[50,2,3]]]);
//# sourceMappingURL=main.74883546.chunk.js.map