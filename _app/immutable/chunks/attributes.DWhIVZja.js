import{ag as Q,v as sa,b as ia,ah as W,h as I,s as R,a as fa,$ as na,t as Z,H as ta,e as z,f as S,d as C,ai as L,r as j,c as m,p as ua,x as G,aj as b,ak as K,al as D,am as la,q as oa,an as va,ao as _a,g as ca,m as da,ap as ha,aq as pa,af as Ea,U as P,ar as ga,k as Aa,as as ya,_ as X,at as Ta}from"./runtime.CfnDK_sg.js";import{f as Ia,g as Na,j as wa,n as ka,k as xa}from"./disclose-version.DDbQIjp9.js";function Ca(r,a){if(a){const e=document.body;r.autofocus=!0,Q(()=>{document.activeElement===e&&r.focus()})}}function ba(r,a){return a}function Ha(r,a,e,t){for(var u=[],_=a.length,d=0;d<_;d++)la(a[d].e,u,!0);var c=_>0&&u.length===0&&e!==null;if(c){var y=e.parentNode;oa(y),y.append(e),t.clear(),w(r,a[0].prev,a[_-1].next)}va(u,()=>{for(var g=0;g<_;g++){var h=a[g];c||(t.delete(h.k),w(r,h.prev,h.next)),_a(h.e,!c)}})}function Da(r,a,e,t,u,_=null){var d=r,c={flags:a,items:new Map,first:null},y=(a&W)!==0;if(y){var g=r;d=I?R(ca(g)):g.appendChild(sa())}I&&fa();var h=null,T=!1;ia(()=>{var i=e(),v=na(i)?i:i==null?[]:Z(i),l=v.length;if(T&&l===0)return;T=l===0;let p=!1;if(I){var f=d.data===ta;f!==(l===0)&&(d=z(),R(d),S(!1),p=!0)}if(I){for(var n=null,A,E=0;E<l;E++){if(C.nodeType===8&&C.data===da){d=C,p=!0,S(!1);break}var s=v[E],o=t(s,E);A=aa(C,c,n,null,s,o,E,u,a),c.items.set(o,A),n=A}l>0&&R(z())}if(!I){var k=ha;La(v,c,d,u,a,(k.f&L)!==0,t)}_!==null&&(l===0?h?j(h):h=m(()=>_(d)):h!==null&&ua(h,()=>{h=null})),p&&S(!0),e()}),I&&(d=C)}function La(r,a,e,t,u,_,d){var q,B,Y,U;var c=(u&pa)!==0,y=(u&(b|D))!==0,g=r.length,h=a.items,T=a.first,i=T,v,l=null,p,f=[],n=[],A,E,s,o;if(c)for(o=0;o<g;o+=1)A=r[o],E=d(A,o),s=h.get(E),s!==void 0&&((q=s.a)==null||q.measure(),(p??(p=new Set)).add(s));for(o=0;o<g;o+=1){if(A=r[o],E=d(A,o),s=h.get(E),s===void 0){var k=i?i.e.nodes_start:e;l=aa(k,a,l,l===null?a.first:l.next,A,E,o,t,u),h.set(E,l),f=[],n=[],i=l.next;continue}if(y&&Ma(s,A,o,u),s.e.f&L&&(j(s.e),c&&((B=s.a)==null||B.unfix(),(p??(p=new Set)).delete(s))),s!==i){if(v!==void 0&&v.has(s)){if(f.length<n.length){var H=n[0],N;l=H.prev;var $=f[0],M=f[f.length-1];for(N=0;N<f.length;N+=1)F(f[N],H,e);for(N=0;N<n.length;N+=1)v.delete(n[N]);w(a,$.prev,M.next),w(a,l,$),w(a,M,H),i=H,l=M,o-=1,f=[],n=[]}else v.delete(s),F(s,i,e),w(a,s.prev,s.next),w(a,s,l===null?a.first:l.next),w(a,l,s),l=s;continue}for(f=[],n=[];i!==null&&i.k!==E;)(_||!(i.e.f&L))&&(v??(v=new Set)).add(i),n.push(i),i=i.next;if(i===null)continue;s=i}f.push(s),l=s,i=s.next}if(i!==null||v!==void 0){for(var x=v===void 0?[]:Z(v);i!==null;)(_||!(i.e.f&L))&&x.push(i),i=i.next;var O=x.length;if(O>0){var ea=u&W&&g===0?e:null;if(c){for(o=0;o<O;o+=1)(Y=x[o].a)==null||Y.measure();for(o=0;o<O;o+=1)(U=x[o].a)==null||U.fix()}Ha(a,x,ea,h)}}c&&Q(()=>{var V;if(p!==void 0)for(s of p)(V=s.a)==null||V.apply()}),G.first=a.first&&a.first.e,G.last=l&&l.e}function Ma(r,a,e,t){t&b&&K(r.v,a),t&D?K(r.i,e):r.i=e}function aa(r,a,e,t,u,_,d,c,y){var g=(y&b)!==0,h=(y&ga)===0,T=g?h?Ea(u):P(u):u,i=y&D?P(d):d,v={i,v:T,k:_,a:null,e:null,prev:e,next:t};try{return v.e=m(()=>c(r,T,i),I),v.e.prev=e&&e.e,v.e.next=t&&t.e,e===null?a.first=v:(e.next=v,e.e.next=v.e),t!==null&&(t.prev=v,t.e.prev=v.e),v}finally{}}function F(r,a,e){for(var t=r.next?r.next.e.nodes_start:e,u=a?a.e.nodes_start:e,_=r.e.nodes_start;_!==t;){var d=Aa(_);u.before(_),_=d}}function w(r,a,e){a===null?r.first=e:(a.next=e,a.e.next=e&&e.e),e!==null&&(e.prev=a,e.e.prev=a&&a.e)}function Oa(r,a,e,t){var u=r.__attributes??(r.__attributes={});I&&(u[a]=r.getAttribute(a),a==="src"||a==="srcset"||a==="href"&&r.nodeName==="LINK")||u[a]!==(u[a]=e)&&(a==="style"&&"__styles"in r&&(r.__styles={}),a==="loading"&&(r[ya]=e),e==null?r.removeAttribute(a):typeof e!="string"&&ra(r).includes(a)?r[a]=e:r.setAttribute(a,e))}function $a(r,a,e,t,u=!1,_=!1,d=!1){var c=a||{},y=r.tagName==="OPTION";for(var g in a)g in e||(e[g]=null);var h=ra(r),T=r.__attributes??(r.__attributes={});for(const f in e){let n=e[f];if(y&&f==="value"&&n==null){r.value=r.__value="",c[f]=n;continue}var i=c[f];if(n!==i){c[f]=n;var v=f[0]+f[1];if(v!=="$$"){if(v==="on"){const A={},E="$$"+f;let s=f.slice(2);var l=xa(s);if(Ia(s)&&(s=s.slice(0,-7),A.capture=!0),!l&&i){if(n!=null)continue;r.removeEventListener(s,c[E],A),c[E]=null}if(n!=null)if(l)r[`__${s}`]=n,wa([s]);else{let o=function(k){c[f].call(this,k)};c[E]=Na(s,r,o,A)}}else if(f==="style"&&n!=null)r.style.cssText=n+"";else if(f==="autofocus")Ca(r,!!n);else if(f==="__value"||f==="value"&&n!=null)r.value=r[f]=r.__value=n;else{var p=f;u||(p=ka(p)),n==null&&!_?(T[f]=null,r.removeAttribute(f)):h.includes(p)&&(_||typeof n!="string")?r[p]=n:typeof n!="function"&&(I&&(p==="src"||p==="href"||p==="srcset")||Oa(r,p,n))}f==="style"&&"__styles"in r&&(r.__styles={})}}}return c}var J=new Map;function ra(r){var a=J.get(r.nodeName);if(a)return a;J.set(r.nodeName,a=[]);for(var e,t=X(r),u=Element.prototype;u!==t;){e=Ta(t);for(var _ in e)e[_].set&&a.push(_);t=X(t)}return a}export{Oa as a,Da as e,ba as i,$a as s};