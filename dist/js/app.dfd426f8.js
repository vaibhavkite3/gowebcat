(function(e){function t(t){for(var r,a,s=t[0],u=t[1],l=t[2],c=0,h=[];c<s.length;c++)a=s[c],i[a]&&h.push(i[a][0]),i[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(h.length)h.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==i[u]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},o=[];function a(e){return s.p+"js/"+({"lang-hi-json":"lang-hi-json","lang-mr-json":"lang-mr-json","view-Cat-vue":"view-Cat-vue"}[e]||e)+"."+{"lang-hi-json":"212bd0a8","lang-mr-json":"e16e93b4","view-Cat-vue":"62c9d01b"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=i[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=i[e]=[t,r]});t.push(n[2]=r);var o,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=a(e),o=function(t){u.onerror=u.onload=null,clearTimeout(l);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");a.type=r,a.request=o,n[1](a)}i[e]=void 0}};var l=setTimeout(function(){o({type:"timeout",target:u})},12e4);u.onerror=u.onload=o,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var d=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1a5d":function(e,t,n){var r={"./Cat.vue":["7d52","view-Cat-vue"]};function i(e){var t=r[e];return t?n.e(t[1]).then(function(){var e=t[0];return n(e)}):Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}i.keys=function(){return Object.keys(r)},i.id="1a5d",e.exports=i},"1dc6":function(e,t,n){"use strict";n.r(t);n("a481"),n("ac6a");var r=n("8103"),i=n.n(r),o=n("d307"),a={};o.keys().forEach(function(e){if("./modules.js"!==e){var t=i()(e.replace(/(\.\/|\.js)/g,""));a[t]=o(e)}}),t["default"]=a},"41cb":function(e,t,n){"use strict";var r=n("2b0e"),i=n("8c4f");function o(e){return function(){return n("1a5d")("./".concat(e,".vue"))}}r["default"].use(i["a"]),t["a"]=new i["a"]({routes:[{path:"/",name:"Cat",component:o("Cat"),meta:{title:"Cat"}}]})},"56d7":function(e,t,n){"use strict";n.r(t);n("456d"),n("ac6a"),n("5df3"),n("1c4c"),n("7514"),n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",[r("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"warning"}},[r("img",{staticClass:"d-inline-block align-top",attrs:{src:n("84df"),alt:"gowebcat",width:"50",height:"40"}}),r("b-navbar-brand",{attrs:{href:"#"}},[e._v("GoWebCat")])],1)],1),r("router-view")],1)},o=[],a=n("2877"),s={},u=Object(a["a"])(s,i,o,!1,null,null,null),l=u.exports,c=n("41cb"),d=n("2f62"),h=n("1dc6"),f={"app/MUTATE_PAGE_BLOCKER":function(e,t){var n=e.commit;n("app/MUTATE_PAGE_BLOCKER",t)}},g=f,v={isPageBlocked:function(e){return!!e.pageBlocker}},p=v,m={"app/MUTATE_PAGE_BLOCKER":function(e,t){e.pageBlocker=t}},y=m,b=n("0e44");r["default"].use(d["a"]);var w=new d["a"].Store({state:{pageBlocker:!1},getters:p,mutations:y,actions:g,modules:h["default"],plugins:[Object(b["a"])({storage:window.sessionStorage})]}),T=n("9483");Object(T["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var C=n("bc3a"),L=n.n(C),A=n("85ff"),E=n.n(A),O={install:function(e,t){var n=t.baseURL,r=t.cdnBaseURL,i=t.version,o=t.region,a=t.appCode,s=!1,u=null;e.getBucketIdByKey=function(e){var t=u.find(function(t){return t.bucketName===e});return t},e.prototype.$PageLoader=s,e.setPageLoader=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];alert(e),s=e},e.getBaseURL=function(){return n},e.getCDNBaseURL=function(){return r},e.setBaseURL=function(e){n=e},e.getVersion=function(){return i},e.setVersion=function(e){i=e},e.getRegion=function(){return o},e.setRegion=function(e){o=e},e.getAppCode=function(){return a},e.setAppCode=function(e){a=e}}},j=n("ead5"),k=n.n(j),_=(n("6762"),n("a925")),M=n("e312");r["default"].use(_["a"]),r["default"].use(M);var P=new _["a"]({locale:"en",fallbackLocale:"en",messages:M}),U=[];function R(e){return P.locale=e,P.fallbackLocale=e,L.a.defaults.headers.common["Accept-Language"]=e,document.querySelector("html").setAttribute("lang",e),e}function I(e){return""===e||void 0===e?n("8825")("./".concat(P.locale,".json")).then(function(e){return P.setLocaleMessage("en",e.default),R("en")}):!P.locale!==e?U.includes(e)?Promise.resolve(R(e)):n("8825")("./".concat(e,".json")).then(function(t){return P.setLocaleMessage(e,t.default),U.push(e),R(e)}):Promise.resolve(e)}var S=n("9f7b"),B=n.n(S),q=(n("f9e3"),n("2dd8"),n("a65d")),N=n.n(q);r["default"].config.productionTip=!1;var x=!0,F={isEnabled:!0,logLevel:x?"error":"debug",stringifyArguments:!1,showLogLevel:!0,showMethodName:!0,separator:"|",showConsoleColors:!0};r["default"].use(E.a,F),r["default"].use(N.a),r["default"].use(B.a);var D="http://localhost:8080/";r["default"].use(O,{baseURL:D,cdnConfig:[{bucketName:"client1",clientId:"client1",isPrivateBucket:!0},{bucketName:"client2",clientId:"client2",isPrivateBucket:!1}]}),sessionStorage.setItem("user-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.qCJ-hcgSTLgkaT7kfI6--xRm4IEpPFQmMj3UZ94gNo4"),r["default"].use(k.a),c["a"].beforeEach(function(e,t,n){I(e.meta.lang).then(function(){return n()});var r=e.matched.slice().reverse().find(function(e){return e.meta&&e.meta.title}),i=e.matched.slice().reverse().find(function(e){return e.meta&&e.meta.metaTags});if(r&&(document.title=r.meta.title),Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(function(e){return e.parentNode.removeChild(e)}),!i)return n();i.meta.metaTags.map(function(e){var t=document.createElement("meta");return Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])}),t.setAttribute("data-vue-router-controlled",""),t}).forEach(function(e){return document.head.appendChild(e)}),n()}),L.a.interceptors.request.use(function(e){return e.headers.common["Authorization"]?console.log("autorize!"):console.log("not authorize"),e},function(e){return Promise.reject(e)});var H=new r["default"]({router:c["a"],store:w,i18n:P,render:function(e){return e(l)}}).$mount("#app");window.app=H},"84df":function(e,t,n){e.exports=n.p+"img/Octocat.a23bf262.png"},8825:function(e,t,n){var r={"./en.json":["e312"],"./hi.json":["d7f8","lang-hi-json"],"./mr.json":["8b58","lang-mr-json"]};function i(e){var t=r[e];return t?Promise.all(t.slice(1).map(n.e)).then(function(){var e=t[0];return n.t(e,3)}):Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}i.keys=function(){return Object.keys(r)},i.id="8825",e.exports=i},b5ce:function(e,t,n){"use strict";n.r(t);var r,i=n("bd86"),o="login/MUTATE_AUTH_REQUEST",a="login/MUTATE_AUTH_LOGOUT",s="login/MUTATE_AUTH_LOGOUT",u=n("41cb"),l=(n("386d"),n("768b")),c=n("7618"),d=(n("7f7f"),n("ac4d"),n("8a81"),n("0d6d"),n("4917"),n("28a5"),n("ac6a"),n("5df3"),n("f400"),n("d225")),h=n("bc3a"),f=n.n(h),g=n("2b0e"),v=function e(t){var n=this;Object(d["a"])(this,e),this.raw=t.data,this.headers=t.headers,this.isReactive=!1,void 0!==this.headers&&void 0!==this.headers.authorization&&sessionStorage.setItem("user-token",this.headers.authorization),this.setReactivity=function(e){n.isReactive=e},this.deepFreeze=function(e){if(void 0===e||null===e)return e;var t=Object.getOwnPropertyNames(e),r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var u=a.value,l=e[u];e[u]=l&&"object"===Object(c["a"])(l)?n.deepFreeze(l):l}}catch(d){i=!0,o=d}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return Object.freeze(e)},this.getRaw=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e?this.raw:this.deepFreeze(this.raw)},this.getHeaders=function(){return this.headers},this.showElement=function(e){if(null!=e){var t=document.getElementById(e);"none"===t.style.display&&(t.style.display="block")}},this.hideElement=function(e){if(console.log(e),null!=e){var t=document.getElementById(e);t.style.display="none"}},this.getActivity=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.split("_").length>1?t?this.raw.FetchQueryData.result[e.substring("query_".length,e.length)]:this.deepFreeze(this.raw.FetchQueryData.result[e.substring("query_".length,e.length)]):t?this.raw[e]:this.deepFreeze(this.raw[e])},this.Navigate=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;u["a"].push({name:e,params:Object(i["a"])({},n,this.getActivity(t,!0))})},this.isValid=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===e?!(1e3!==this.raw.errorCode&&0!==this.raw.errorCode):e.split("_").length>1?!(1e3!==this.raw["FetchQueryData"].errorCode&&0!==this.raw["FetchQueryData"].errorCode):!(1e3!==this.raw[e].errorCode&&0!==this.raw[e].errorCode)},this.uploadedFileURL=function(){return this.raw.result},this.showErrorToast=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===e?g["default"].toasted.error(this.raw.error).goAway(3e3):e.split("_").length>1?g["default"].toasted.error(this.raw["FetchQueryData"].error).goAway(3e3):g["default"].toasted.error(this.raw[e].error).goAway(3e3),this}},p=v,m=function e(){var t,n=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;Object(d["a"])(this,e);var i=f.a.CancelToken;this.strActivities=r,this.isQuery=!1,this.isActivity=!1,this.fetchableMap=new Map,this.version=g["default"].getVersion(),this.region=g["default"].getRegion(),this.appCode=g["default"].getAppCode(),this.activityType="o",this.mqlString="/mql",this.isConfirm=!1,this.showPageLoader=!1;var o="FetchQueryData",a=".[",s="ActivityName",u="Data",h=f.a.create({baseURL:g["default"].getBaseURL()});h.interceptors.request.use(function(e){return-1!==e.url.indexOf("r/")&&null===sessionStorage.getItem("user-token")&&t("Operation canceled by the MQL interceptor."),e},function(e){return Promise.reject(e)}),this.formatActivity=function(e){var t=this,n=[];this.activityType=e.split(a)[0],this.fetchableMap.set("ActivityType",this.activityType),n=e.split(a)[1].substring(0,e.split(a)[1].length-1).split(","),n.map(function(e){var n,r={};r[u]=null,null!==e.match(/query_/)&&e.match(/query_/).length>0?(r[e]=e.trim(),n=e.trim(),t.isQuery=!0):(r[s]=e.trim(),n=e.trim(),t.isActivity=!0),t.fetchableMap.set(n,r)})},this.deepFreeze=function(e){var t=Object.getOwnPropertyNames(e),r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var u=a.value,l=e[u];e[u]=l&&"object"===Object(c["a"])(l)?n.deepFreeze(l):l}}catch(d){i=!0,o=d}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return Object.freeze(e)},this.generateURL=function(e,t){return null!=t&&void 0!==t?t+n.getVersion()+n.getRegion()+n.getAppCode()+n.getServiceURL(e):n.getVersion()+n.getRegion()+n.getAppCode()+n.getServiceURL(e)},this.getServiceURL=function(e){return("c"===e.toLowerCase()?"r/"+e.toLowerCase():e.toLowerCase())+n.mqlString},this.generateHeaders=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n["Service-Header"]=r?o:t,"o"!==e&&(n["Authorization"]="Bearer "+sessionStorage.getItem("user-token")),n},this.getVersion=function(){return null!=this.version||void 0!==this.version?this.version+"/":""},this.getRegion=function(){return null!=this.region||void 0!==this.region?this.region+"/":""},this.getAppCode=function(){return null!=this.appCode||void 0!==this.appCode?this.appCode+"/":""},this.setActivity=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.strActivities=e,this.formatActivity(this.strActivities),this},this.setData=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===e)console.error("Data cannot be null");else if(null===t){var n=!0,r=!1,i=void 0;try{for(var o,a=this.fetchableMap[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=Object(l["a"])(o.value,2),c=s[0],d=s[1];null===d[u]&&(d[u]=e,this.fetchableMap.set(c,d))}}catch(f){r=!0,i=f}finally{try{n||null==a.return||a.return()}finally{if(r)throw i}}}else{var h=this.fetchableMap.get(e);h[u]=t,this.fetchableMap.set(e,h)}return this},this.setHeader=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.fetchableMap.set("Header",e),this},this.setCustomURL=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.fetchableMap.set("CustomURL",e),this},this.showConfirmDialog=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.isConfirm=e,this},this.enablePageLoader=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.showPageLoader=e,this},this.setLoginActivity=function(){return this.setActivity("o.[MQLLogin]"),this},this.fetch=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return new Promise(function(n,r){var i=e;if(e.isConfirm)g["default"].dialog.confirm("Please confirm to continue").then(function(){var e=i.run(t,i.isQuery,i.isActivity,i.fetchableMap,i.activityType);n(e)}).catch(function(){var e={data:{}};e.data.error="Canceled by user",e.data.errorCode=1990,e.data.result=null,n(new p(e))});else{var o=i.run(t,i.isQuery,i.isActivity,i.fetchableMap,i.activityType);n(o)}})},this.run=function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"o";return new Promise(function(c){var d="Processing";e.showPageLoader&&window.app.$store.dispatch("app/MUTATE_PAGE_BLOCKER",!0),null!==n&&(d=document.getElementById(n).innerHTML,document.getElementById(n).disabled=!0,document.getElementById(n).innerHTML="Processing");var f={},g="";if(r&&a){var v={data:{}};v.data.error="Can not support query and activity in a single execution",v.data.errorCode=1990,v.data.result=null,c(new p(v))}else s.set("isQuery",r);var m={},y=!0,b=!1,w=void 0;try{for(var T,C=s[Symbol.iterator]();!(y=(T=C.next()).done);y=!0){var L=Object(l["a"])(T.value,2),A=L[0],E=L[1];A.search("ActivityType")<0&&A.search("Header")<0&&A.search("CustomURL")<0&&A.search("isQuery")<0&&(g=g+","+A,m[null!==A.match(/query_/)&&A.match(/query_/).length>0?A.substring("query_".length,A.length):A]=E.Data)}}catch(O){b=!0,w=O}finally{try{y||null==C.return||C.return()}finally{if(b)throw w}}e.isQuery?(m["fetchGroup"]=g.substring(1,g.length).split(",").map(function(e){return e.substring("query_".length,e.length)}),f[o]=m):f=m,h({url:e.generateURL(u,s.get("CustomURL")),method:"Post",headers:e.generateHeaders(u,g.substring(1,g.length),s.get("Header"),r),data:f,cancelToken:new i(function(e){t=e})}).then(function(t){null!==n&&(document.getElementById(n).disabled=!1,document.getElementById(n).innerHTML=d),e.showPageLoader&&window.app.$store.dispatch("app/MUTATE_PAGE_BLOCKER",!1),c(new p(t))}).catch(function(t){var r={data:{}};null!==n&&(document.getElementById(n).disabled=!1,document.getElementById(n).innerHTML=d),e.showPageLoader&&window.app.$store.dispatch("app/MUTATE_PAGE_BLOCKER",!1),r.data.error=t.message,r.data.errorCode=1990,r.data.result=null,c(new p(r))})})}},y=m;n.d(t,"state",function(){return b}),n.d(t,"getters",function(){return w}),n.d(t,"mutations",function(){return T}),n.d(t,"actions",function(){return C});var b={token:sessionStorage.getItem("user-token")||"",status:""},w={isAuthenticated:function(e){return!!e.token},authStatus:function(e){return e.status}},T=(r={},Object(i["a"])(r,o,function(e){e.status="loading"}),Object(i["a"])(r,a,function(e,t){e.status="success",e.token=t}),Object(i["a"])(r,s,function(e){e.status="error"}),r),C={AUTH_REQUEST:function(e,t){var n=e.commit;return new Promise(function(e){n(o,t),sessionStorage.setItem("user-token","token"),(new y).setLoginActivity().setData(t).fetch("loginBtn").then(function(t){if(t.hideElement("loginFormId"),t.isValid("MQLLogin")){var r=t.getHeaders().authorization;sessionStorage.setItem("user-token",r),n(a,t),e(t)}else n(s,t),sessionStorage.removeItem("user-token"),e(t)})})},AUTH_LOGOUT:function(){return new Promise(function(e){sessionStorage.removeItem("user-token"),u["a"].push({name:"login"}),e()})}}},d307:function(e,t,n){var r={"./login.js":"b5ce","./modules.js":"1dc6"};function i(e){var t=o(e);return n(t)}function o(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}i.keys=function(){return Object.keys(r)},i.resolve=o,e.exports=i,i.id="d307"},e312:function(e){e.exports={about:{aboutHeading:"This is an about page"},home:{homeTitle:"This is home page"},demo:{demoHeading:"This is text"},component2:{title:"English text (Loaded from file)"},validation:{nameRequired:"The Name field is required",nameAlpha:"The Name field may only contain alphabetic characters.",emailValid:"The Email field must be a valid email.",emailRequired:"The Email field is required.",phoneNumeric:"The Phone number field format is invalid.",phoneRequired:"Phone no field is required.",fullnameRequired:"The fullname field is required.",fullnameValidate:"The fullname field may only contain alphabetic characters as well as spaces.",credit_cardRequired:"The credit card field is required.",credit_cardValidate:"The credit card field is invalid.",ipValid:"The ip field must be a valid ip address.",phoneMinLength:"The phone field must be at least 10 characters."}}}});