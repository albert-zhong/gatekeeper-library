"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4825],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var a=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var i=a.createContext({}),l=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=l(e.components);return a.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,s=e.mdxType,o=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=l(n),u=s,h=d["".concat(i,".").concat(u)]||d[u]||m[u]||o;return n?a.createElement(h,r(r({ref:t},c),{},{components:n})):a.createElement(h,r({ref:t},c))}));function u(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=n.length,r=new Array(o);r[0]=d;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:s,r[1]=p;for(var l=2;l<o;l++)r[l]=n[l];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7553:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>r,default:()=>m,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var a=n(7462),s=(n(7294),n(3905));const o={id:"host-namespaces",title:"Host Namespace"},r="Host Namespace",p={unversionedId:"validation/host-namespaces",id:"validation/host-namespaces",title:"Host Namespace",description:"Description",source:"@site/docs/validation/host-namespaces.md",sourceDirName:"validation",slug:"/validation/host-namespaces",permalink:"/gatekeeper-library/website/validation/host-namespaces",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper-library/edit/master/website/docs/validation/host-namespaces.md",tags:[],version:"current",frontMatter:{id:"host-namespaces",title:"Host Namespace"},sidebar:"docs",previous:{title:"Host Filesystem",permalink:"/gatekeeper-library/website/validation/host-filesystem"},next:{title:"Host Networking Ports",permalink:"/gatekeeper-library/website/validation/host-network-ports"}},i={},l=[{value:"Description",id:"description",level:2},{value:"Template",id:"template",level:2},{value:"Usage",id:"usage",level:3},{value:"Examples",id:"examples",level:2}],c={toc:l};function m(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"host-namespace"},"Host Namespace"),(0,s.kt)("h2",{id:"description"},"Description"),(0,s.kt)("p",null,"Disallows sharing of host PID and IPC namespaces by pod containers. Corresponds to the ",(0,s.kt)("inlineCode",{parentName:"p"},"hostPID")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"hostIPC")," fields in a PodSecurityPolicy. For more information, see ",(0,s.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces"},"https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces")),(0,s.kt)("h2",{id:"template"},"Template"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: templates.gatekeeper.sh/v1\nkind: ConstraintTemplate\nmetadata:\n  name: k8spsphostnamespace\n  annotations:\n    metadata.gatekeeper.sh/title: "Host Namespace"\n    metadata.gatekeeper.sh/version: 1.0.0\n    description: >-\n      Disallows sharing of host PID and IPC namespaces by pod containers.\n      Corresponds to the `hostPID` and `hostIPC` fields in a PodSecurityPolicy.\n      For more information, see\n      https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sPSPHostNamespace\n      validation:\n        # Schema for the `parameters` field\n        openAPIV3Schema:\n          type: object\n          description: >-\n            Disallows sharing of host PID and IPC namespaces by pod containers.\n            Corresponds to the `hostPID` and `hostIPC` fields in a PodSecurityPolicy.\n            For more information, see\n            https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8spsphostnamespace\n\n        violation[{"msg": msg, "details": {}}] {\n            input_share_hostnamespace(input.review.object)\n            msg := sprintf("Sharing the host namespace is not allowed: %v", [input.review.object.metadata.name])\n        }\n\n        input_share_hostnamespace(o) {\n            o.spec.hostPID\n        }\n        input_share_hostnamespace(o) {\n            o.spec.hostIPC\n        }\n\n')),(0,s.kt)("h3",{id:"usage"},"Usage"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/host-namespaces/template.yaml\n")),(0,s.kt)("h2",{id:"examples"},"Examples"),(0,s.kt)("details",null,(0,s.kt)("summary",null,"host-namespace"),(0,s.kt)("blockquote",null,(0,s.kt)("details",null,(0,s.kt)("summary",null,"constraint"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sPSPHostNamespace\nmetadata:\n  name: psp-host-namespace\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n\n')),(0,s.kt)("p",null,"Usage"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/host-namespaces/samples/psp-host-namespace/constraint.yaml\n"))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"example-allowed"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-host-namespace-allowed\n  labels:\n    app: nginx-host-namespace\nspec:\n  hostPID: false\n  hostIPC: false\n  containers:\n  - name: nginx\n    image: nginx\n\n")),(0,s.kt)("p",null,"Usage"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/host-namespaces/samples/psp-host-namespace/example_allowed.yaml\n"))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"example-disallowed"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-host-namespace-disallowed\n  labels:\n    app: nginx-host-namespace\nspec:\n  hostPID: true\n  hostIPC: true\n  containers:\n  - name: nginx\n    image: nginx\n\n")),(0,s.kt)("p",null,"Usage"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/host-namespaces/samples/psp-host-namespace/example_disallowed.yaml\n"))))))}m.isMDXComponent=!0}}]);