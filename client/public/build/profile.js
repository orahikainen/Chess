var profile=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function s(e){e.forEach(t)}function o(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function c(e,t){e.appendChild(t)}function i(e,t,n){e.insertBefore(t,n||null)}function l(e){e.parentNode.removeChild(e)}function a(e){return document.createElement(e)}function u(e){return document.createTextNode(e)}function d(){return u(" ")}function m(){return u("")}function p(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function f(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}let h;function v(e){h=e}const g=[],k=[],$=[],w=[],x=Promise.resolve();let b=!1;function y(e){$.push(e)}let C=!1;const q=new Set;function B(){if(!C){C=!0;do{for(let e=0;e<g.length;e+=1){const t=g[e];v(t),E(t.$$)}for(g.length=0;k.length;)k.pop()();for(let e=0;e<$.length;e+=1){const t=$[e];q.has(t)||(q.add(t),t())}$.length=0}while(g.length);for(;w.length;)w.pop()();b=!1,C=!1,q.clear()}}function E(e){if(null!==e.fragment){e.update(),s(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(y)}}const F=new Set;let _;function z(){_={r:0,c:[],p:_}}function A(){_.r||s(_.c),_=_.p}function D(e,t){e&&e.i&&(F.delete(e),e.i(t))}function L(e,t,n,s){if(e&&e.o){if(F.has(e))return;F.add(e),_.c.push(()=>{F.delete(e),s&&(n&&e.d(1),s())}),e.o(t)}}function T(e){e&&e.c()}function M(e,n,r){const{fragment:c,on_mount:i,on_destroy:l,after_update:a}=e.$$;c&&c.m(n,r),y(()=>{const n=i.map(t).filter(o);l?l.push(...n):s(n),e.$$.on_mount=[]}),a.forEach(y)}function P(e,t){const n=e.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function W(e,t){-1===e.$$.dirty[0]&&(g.push(e),b||(b=!0,x.then(B)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function H(t,o,r,c,i,a,u=[-1]){const d=h;v(t);const m=o.props||{},p=t.$$={fragment:null,ctx:null,props:a,update:e,not_equal:i,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:u,skip_bound:!1};let f=!1;if(p.ctx=r?r(t,m,(e,n,...s)=>{const o=s.length?s[0]:n;return p.ctx&&i(p.ctx[e],p.ctx[e]=o)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](o),f&&W(t,e)),n}):[],p.update(),f=!0,s(p.before_update),p.fragment=!!c&&c(p.ctx),o.target){if(o.hydrate){const e=function(e){return Array.from(e.childNodes)}(o.target);p.fragment&&p.fragment.l(e),e.forEach(l)}else p.fragment&&p.fragment.c();o.intro&&D(t.$$.fragment),M(t,o.target,o.anchor),B()}v(d)}class N{$destroy(){P(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}var S=void 0;null!=document.cookie.split("Username=")[1]?null==(S=document.cookie.split("Username=")[1].split(";")[0])&&(location.href="/login"):location.href="/login";const O=S;function j(){if(null==document.cookie.split("%")[1]||null==document.cookie.split("%")[1].split("%")[0])return;var e=document.cookie.split("%")[1].split("%")[0],t={light:e.split("&")[0],dark:e.split("&")[1]};const n=document.querySelector(":root");n.style.setProperty("--dark-color",t.dark),n.style.setProperty("--light-color",t.light)}function I(t){let n,o,r,u,m,h,v,g,k,$,w,x,b,y,C,q,B,E,F,_,z,A,D,L,T,M,P,W,H,N,S,O,j,I,U,R,V,G,J,K,Q,X,Y,Z,ee,te,ne;return{c(){n=a("div"),o=a("div"),r=a("div"),r.textContent="Default themes",u=d(),m=a("img"),v=d(),g=a("img"),$=d(),w=a("img"),b=d(),y=a("img"),q=d(),B=a("img"),F=d(),_=a("img"),A=d(),D=a("img"),T=d(),M=a("img"),W=d(),H=a("img"),S=d(),O=a("div"),j=a("div"),j.textContent="Custom theme",I=d(),U=a("label"),U.textContent="Light color:",R=d(),V=a("input"),G=a("br"),J=d(),K=a("label"),K.textContent="Dark color:",Q=d(),X=a("input"),Y=a("br"),Z=d(),ee=a("button"),ee.textContent="Change theme",f(r,"class","text svelte-13v34zk"),f(m,"class","theme svelte-13v34zk"),f(m,"alt","default"),m.src!==(h="/assets/themes/themeDefault.png")&&f(m,"src","/assets/themes/themeDefault.png"),f(g,"class","theme svelte-13v34zk"),f(g,"alt","coral"),g.src!==(k="/assets/themes/themeCoral.png")&&f(g,"src","/assets/themes/themeCoral.png"),f(w,"class","theme svelte-13v34zk"),f(w,"alt","dusk"),w.src!==(x="/assets/themes/themeDusk.png")&&f(w,"src","/assets/themes/themeDusk.png"),f(y,"class","theme svelte-13v34zk"),f(y,"alt","emerald"),y.src!==(C="/assets/themes/themeEmerald.png")&&f(y,"src","/assets/themes/themeEmerald.png"),f(B,"class","theme svelte-13v34zk"),f(B,"alt","marine"),B.src!==(E="/assets/themes/themeMarine.png")&&f(B,"src","/assets/themes/themeMarine.png"),f(_,"class","theme svelte-13v34zk"),f(_,"alt","sandcastle"),_.src!==(z="/assets/themes/themeSandcastle.png")&&f(_,"src","/assets/themes/themeSandcastle.png"),f(D,"class","theme svelte-13v34zk"),f(D,"alt","wheat"),D.src!==(L="/assets/themes/themeWheat.png")&&f(D,"src","/assets/themes/themeWheat.png"),f(M,"class","theme svelte-13v34zk"),f(M,"alt","wheat"),M.src!==(P="/assets/themes/themeWheat.png")&&f(M,"src","/assets/themes/themeWheat.png"),f(H,"class","theme svelte-13v34zk"),f(H,"alt","wheat"),H.src!==(N="/assets/themes/themeWheat.png")&&f(H,"src","/assets/themes/themeWheat.png"),f(o,"id","default-themes"),f(j,"class","text svelte-13v34zk"),f(U,"class","text svelte-13v34zk"),f(U,"for","light"),f(V,"id","light"),f(V,"type","color"),V.value=t[0],f(K,"class","text svelte-13v34zk"),f(K,"for","dark"),f(X,"id","dark"),f(X,"type","color"),X.value=t[1],f(ee,"class","text svelte-13v34zk"),f(ee,"id","custom-theme-button"),f(O,"id","custom-theme"),f(n,"id","thememenu-wrapper"),f(n,"class","svelte-13v34zk")},m(e,s){i(e,n,s),c(n,o),c(o,r),c(o,u),c(o,m),c(o,v),c(o,g),c(o,$),c(o,w),c(o,b),c(o,y),c(o,q),c(o,B),c(o,F),c(o,_),c(o,A),c(o,D),c(o,T),c(o,M),c(o,W),c(o,H),c(n,S),c(n,O),c(O,j),c(O,I),c(O,U),c(O,R),c(O,V),c(O,G),c(O,J),c(O,K),c(O,Q),c(O,X),c(O,Y),c(O,Z),c(O,ee),te||(ne=[p(m,"click",t[2]("default")),p(g,"click",t[2]("coral")),p(w,"click",t[2]("dusk")),p(y,"click",t[2]("emerald")),p(B,"click",t[2]("marine")),p(_,"click",t[2]("sandcastle")),p(D,"click",t[2]("wheat")),p(M,"click",t[2]("wheat")),p(H,"click",t[2]("wheat")),p(ee,"click",t[3])],te=!0)},p(e,[t]){1&t&&(V.value=e[0]),2&t&&(X.value=e[1])},i:e,o:e,d(e){e&&l(n),te=!1,s(ne)}}}function U(e,t,n){let s,o;function r(){if(null!=document.cookie.split("%")[1]&&null!=document.cookie.split("%")[1].split("%")[0]){var e=document.cookie.split("%")[1].split("%")[0];n(0,s=e.split("&")[0]),n(1,o=e.split("&")[1])}}return r(),[s,o,e=>()=>{let t,n;"default"==e&&(t="#FFFFFF",n="#4B4B4B"),"coral"==e&&(n="#70A2A3",t="#B1E4B9"),"dusk"==e&&(n="#706677",t="#CCB7AE"),"marine"==e&&(n="#6F73D2",t="#9DACFF"),"wheat"==e&&(n="#BBBE64",t="#EAF0CE"),"emerald"==e&&(n="#6F8F72",t="#ADBD8F"),"sandcastle"==e&&(n="#B88B4A",t="#E3C16F"),"newtheme1"==e&&(n="#6F8F72",t="#ADBD8F"),"newtheme2"==e&&(n="#B88B4A",t="#E3C16F"),document.cookie="Theme=%"+t+"&"+n+"%; path=/;",j(),r()},function(){const e=document.getElementById("light").value,t=document.getElementById("dark").value;document.cookie="Theme=%"+e+"&"+t+"%; path=/;",j()}]}class R extends N{constructor(e){super(),H(this,e,U,I,r,{})}}function V(e){let t,n;return t=new R({}),{c(){T(t.$$.fragment)},m(e,s){M(t,e,s),n=!0},i(e){n||(D(t.$$.fragment,e),n=!0)},o(e){L(t.$$.fragment,e),n=!1},d(e){P(t,e)}}}function G(e){let t,n,o,r,u,h,v,g,k,$,w,x,b,y,C,q,B,E=1==e[0]&&V();return{c(){t=a("div"),n=a("div"),o=a("div"),o.innerHTML='<img alt="profilepicture" src="/assets/picture.png" class="svelte-1sn9q2c">',r=d(),u=a("div"),u.textContent=""+O,h=d(),v=a("div"),g=a("div"),g.textContent="Log out",k=d(),$=a("div"),$.textContent="Open profile",w=d(),x=a("div"),x.textContent="Theme",b=d(),E&&E.c(),y=m(),f(o,"id","profile-picture"),f(o,"class","svelte-1sn9q2c"),f(u,"id","profile-username"),f(u,"class","svelte-1sn9q2c"),f(n,"id","profile-wrapper"),f(n,"class","svelte-1sn9q2c"),f(g,"class","option svelte-1sn9q2c"),f(g,"id","option-logout"),f($,"class","option svelte-1sn9q2c"),f($,"id","option-openprofile"),f(x,"class","option svelte-1sn9q2c"),f(x,"id","option-theme"),f(v,"id","options-wrapper"),f(v,"class","svelte-1sn9q2c"),f(t,"id","menu-wrapper"),f(t,"class","svelte-1sn9q2c")},m(s,l){i(s,t,l),c(t,n),c(n,o),c(n,r),c(n,u),c(t,h),c(t,v),c(v,g),c(v,k),c(v,$),c(v,w),c(v,x),i(s,b,l),E&&E.m(s,l),i(s,y,l),C=!0,q||(B=[p(g,"click",J),p($,"click",e[1]),p(x,"click",e[2])],q=!0)},p(e,[t]){1==e[0]?E?1&t&&D(E,1):(E=V(),E.c(),D(E,1),E.m(y.parentNode,y)):E&&(z(),L(E,1,1,()=>{E=null}),A())},i(e){C||(D(E),C=!0)},o(e){L(E),C=!1},d(e){e&&l(t),e&&l(b),E&&E.d(e),e&&l(y),q=!1,s(B)}}}function J(){}function K(e,t,n){var s=!1;return[s,function(){location.href="/profile/"+O},function(){n(0,s=!s)}]}class Q extends N{constructor(e){super(),H(this,e,K,G,r,{})}}function X(e){let t,n;return t=new Q({}),{c(){T(t.$$.fragment)},m(e,s){M(t,e,s),n=!0},i(e){n||(D(t.$$.fragment,e),n=!0)},o(e){L(t.$$.fragment,e),n=!1},d(e){P(t,e)}}}function Y(e){let t,n,s,o,r,u,h,v,g,k,$,w,x=1==e[0]&&X();return{c(){t=a("div"),n=a("div"),n.innerHTML='<a class="option svelte-rq5tcw" id="option-home" href="/main">Home</a> \n        <a class="option  svelte-rq5tcw" id="option-leaderboard" href="/leaderboard.html">Leaderboard</a> \n        <a class="option svelte-rq5tcw" id="option-play" href="/play">Play</a>',s=d(),o=a("div"),r=a("div"),r.textContent=""+O,u=d(),h=a("a"),h.innerHTML='<img alt="profilepicture" src="/assets/picture.png" class="svelte-rq5tcw">',v=d(),x&&x.c(),g=m(),f(n,"id","options-wrapper"),f(r,"class","profile svelte-rq5tcw"),f(r,"id","profile-username"),f(h,"class","profile svelte-rq5tcw"),f(h,"id","profile-picture"),f(o,"id","profile-wrapper"),f(o,"class","svelte-rq5tcw"),f(t,"id","navbar"),f(t,"class","svelte-rq5tcw")},m(l,a){i(l,t,a),c(t,n),c(t,s),c(t,o),c(o,r),c(o,u),c(o,h),i(l,v,a),x&&x.m(l,a),i(l,g,a),k=!0,$||(w=p(h,"click",e[1]),$=!0)},p(e,[t]){1==e[0]?x?1&t&&D(x,1):(x=X(),x.c(),D(x,1),x.m(g.parentNode,g)):x&&(z(),L(x,1,1,()=>{x=null}),A())},i(e){k||(D(x),k=!0)},o(e){L(x),k=!1},d(e){e&&l(t),e&&l(v),x&&x.d(e),e&&l(g),$=!1,w()}}}function Z(e,t,n){let s=!1;return[s,function(){n(0,s=!s)}]}class ee extends N{constructor(e){super(),H(this,e,Z,Y,r,{})}}function te(t){let n,s,o,r,m,p,h,v,g;return{c(){n=a("div"),s=a("div"),o=u("Viewing profile of "),r=u(t[0]),m=d(),p=a("div"),p.innerHTML='<img alt="profilepicture" src="/assets/picture.png" class="svelte-dfbkcm">',h=d(),v=a("div"),g=a("div"),g.textContent="Rating: "+ne,f(s,"id","profilemenu-name"),f(s,"class","svelte-dfbkcm"),f(p,"id","profilemenu-picture"),f(g,"id","statistics-rating"),f(v,"id","profilemenu-statistics"),f(n,"id","profilemenu-wrapper"),f(n,"class","svelte-dfbkcm")},m(e,t){i(e,n,t),c(n,s),c(s,o),c(s,r),c(n,m),c(n,p),c(n,h),c(n,v),c(v,g)},p(e,[t]){1&t&&function(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}(r,e[0])},i:e,o:e,d(e){e&&l(n)}}}const ne=1e3;function se(e,t,n){var s=void 0;return null!=document.cookie.split("viewingProfile=")[1]&&(s=document.cookie.split("viewingProfile=")[1].split(";")[0]),null==s&&console.log("error"),[s]}class oe extends N{constructor(e){super(),H(this,e,se,te,r,{})}}function re(t){let n,s,o,r;return n=new ee({}),o=new oe({}),{c(){T(n.$$.fragment),s=d(),T(o.$$.fragment)},m(e,t){M(n,e,t),i(e,s,t),M(o,e,t),r=!0},p:e,i(e){r||(D(n.$$.fragment,e),D(o.$$.fragment,e),r=!0)},o(e){L(n.$$.fragment,e),L(o.$$.fragment,e),r=!1},d(e){P(n,e),e&&l(s),P(o,e)}}}return new class extends N{constructor(e){super(),H(this,e,null,re,r,{})}}({target:document.body,props:{name:"Profile"}})}();