"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8303],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>b});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(a),b=r,d=m["".concat(s,".").concat(b)]||m[b]||u[b]||i;return a?n.createElement(d,o(o({ref:t},c),{},{components:a})):n.createElement(d,o({ref:t},c))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9989:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={id:"capabilities",title:"capabilities"},o="capabilities",l={unversionedId:"mutation-examples/capabilities",id:"mutation-examples/capabilities",title:"capabilities",description:"Usage",source:"@site/docs/mutation-examples/capabilities.md",sourceDirName:"mutation-examples",slug:"/mutation-examples/capabilities",permalink:"/gatekeeper-library/website/mutation-examples/capabilities",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper-library/edit/master/website/docs/mutation-examples/capabilities.md",tags:[],version:"current",frontMatter:{id:"capabilities",title:"capabilities"},sidebar:"docs",previous:{title:"allow-privilege-escalation",permalink:"/gatekeeper-library/website/mutation-examples/allow-privilege-escalation"},next:{title:"read-only-root-filesystem",permalink:"/gatekeeper-library/website/mutation-examples/read-only-root-filesystem"}},s={},p=[{value:"Usage",id:"usage",level:3},{value:"Mutation Examples",id:"mutation-examples",level:2}],c={toc:p};function u(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"capabilities"},"capabilities"),(0,r.kt)("h3",{id:"usage"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/mutation/pod-security-policy/capabilities/samples/mutation-modifyset.yaml\n")),(0,r.kt)("h2",{id:"mutation-examples"},"Mutation Examples"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: ModifySet\nmetadata:\n  name: k8spspcapabilities\nspec:\n  applyTo:\n    - groups: [""]\n      versions: ["v1"]\n      kinds: ["Pod"]\n  match:\n    scope: Namespaced\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n  location: "spec.containers[name:*].securityContext.capabilities.add"\n  parameters:\n    operation: merge\n    values:\n      fromList: ["NEW_CAPABILITY"]\n\n')))}u.isMDXComponent=!0}}]);