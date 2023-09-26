"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7511],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>y});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var i=a.createContext({}),p=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},m=function(e){var n=p(e.components);return a.createElement(i.Provider,{value:n},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,o=e.originalType,i=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),u=p(t),d=l,y=u["".concat(i,".").concat(d)]||u[d]||c[d]||o;return t?a.createElement(y,s(s({ref:n},m),{},{components:t})):a.createElement(y,s({ref:n},m))}));function y(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var o=t.length,s=new Array(o);s[0]=d;var r={};for(var i in n)hasOwnProperty.call(n,i)&&(r[i]=n[i]);r.originalType=e,r[u]="string"==typeof e?e:l,s[1]=r;for(var p=2;p<o;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4567:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>c,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var a=t(7462),l=(t(7294),t(3905));const o={id:"volumes",title:"Volume Types"},s="Volume Types",r={unversionedId:"validation/volumes",id:"validation/volumes",title:"Volume Types",description:"Description",source:"@site/docs/validation/volumes.md",sourceDirName:"validation",slug:"/validation/volumes",permalink:"/gatekeeper-library/website/validation/volumes",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper-library/edit/master/website/docs/validation/volumes.md",tags:[],version:"current",frontMatter:{id:"volumes",title:"Volume Types"},sidebar:"docs",previous:{title:"Allowed Users",permalink:"/gatekeeper-library/website/validation/users"},next:{title:"allow-privilege-escalation",permalink:"/gatekeeper-library/website/mutation-examples/allow-privilege-escalation"}},i={},p=[{value:"Description",id:"description",level:2},{value:"Template",id:"template",level:2},{value:"Usage",id:"usage",level:3},{value:"Examples",id:"examples",level:2}],m={toc:p},u="wrapper";function c(e){let{components:n,...t}=e;return(0,l.kt)(u,(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"volume-types"},"Volume Types"),(0,l.kt)("h2",{id:"description"},"Description"),(0,l.kt)("p",null,"Restricts mountable volume types to those specified by the user. Corresponds to the ",(0,l.kt)("inlineCode",{parentName:"p"},"volumes")," field in a PodSecurityPolicy. For more information, see ",(0,l.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems"},"https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems")),(0,l.kt)("h2",{id:"template"},"Template"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: templates.gatekeeper.sh/v1\nkind: ConstraintTemplate\nmetadata:\n  name: k8spspvolumetypes\n  annotations:\n    metadata.gatekeeper.sh/title: "Volume Types"\n    metadata.gatekeeper.sh/version: 1.0.1\n    description: >-\n      Restricts mountable volume types to those specified by the user.\n      Corresponds to the `volumes` field in a PodSecurityPolicy. For more\n      information, see\n      https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sPSPVolumeTypes\n      validation:\n        # Schema for the `parameters` field\n        openAPIV3Schema:\n          type: object\n          description: >-\n            Restricts mountable volume types to those specified by the user.\n            Corresponds to the `volumes` field in a PodSecurityPolicy. For more\n            information, see\n            https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems\n          properties:\n            volumes:\n              description: "`volumes` is an array of volume types. All volume types can be enabled using `*`."\n              type: array\n              items:\n                type: string\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8spspvolumetypes\n\n        import data.lib.exclude_update.is_update\n\n        violation[{"msg": msg, "details": {}}] {\n            # spec.volumes field is immutable.\n            not is_update(input.review)\n\n            volume_fields := {x | input.review.object.spec.volumes[_][x]; x != "name"}\n            field := volume_fields[_]\n            not input_volume_type_allowed(field)\n            msg := sprintf("The volume type %v is not allowed, pod: %v. Allowed volume types: %v", [field, input.review.object.metadata.name, input.parameters.volumes])\n        }\n\n        # * may be used to allow all volume types\n        input_volume_type_allowed(field) {\n            input.parameters.volumes[_] == "*"\n        }\n\n        input_volume_type_allowed(field) {\n            field == input.parameters.volumes[_]\n        }\n      libs:\n        - |\n          package lib.exclude_update\n\n          is_update(review) {\n              review.operation == "UPDATE"\n          }\n\n')),(0,l.kt)("h3",{id:"usage"},"Usage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/volumes/template.yaml\n")),(0,l.kt)("h2",{id:"examples"},"Examples"),(0,l.kt)("details",null,(0,l.kt)("summary",null,"host-path-disallowed"),(0,l.kt)("blockquote",null,(0,l.kt)("details",null,(0,l.kt)("summary",null,"constraint"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sPSPVolumeTypes\nmetadata:\n  name: psp-volume-types\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n  parameters:\n    volumes:\n    # - "*" # * may be used to allow all volume types\n    - configMap\n    - emptyDir\n    - projected\n    - secret\n    - downwardAPI\n    - persistentVolumeClaim\n    #- hostPath #required for allowedHostPaths\n    - flexVolume #required for allowedFlexVolumes\n\n')),(0,l.kt)("p",null,"Usage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/volumes/samples/psp-volume-types/constraint.yaml\n"))),(0,l.kt)("details",null,(0,l.kt)("summary",null,"example-disallowed"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-volume-types-disallowed\n  labels:\n    app: nginx-volume-types\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    volumeMounts:\n    - mountPath: /cache\n      name: cache-volume\n  - name: nginx2\n    image: nginx\n    volumeMounts:\n    - mountPath: /cache2\n      name: demo-vol\n  volumes:\n  - name: cache-volume\n    hostPath:\n      path: /tmp # directory location on host\n  - name: demo-vol\n    emptyDir: {}\n\n")),(0,l.kt)("p",null,"Usage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/volumes/samples/psp-volume-types/example_disallowed.yaml\n"))),(0,l.kt)("details",null,(0,l.kt)("summary",null,"example-allowed"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-volume-types-allowed\n  labels:\n    app: nginx-volume-types\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    volumeMounts:\n    - mountPath: /cache\n      name: cache-volume\n  - name: nginx2\n    image: nginx\n    volumeMounts:\n    - mountPath: /cache2\n      name: demo-vol\n  volumes:\n  - name: cache-volume\n    emptyDir: {}\n  - name: demo-vol\n    emptyDir: {}\n\n")),(0,l.kt)("p",null,"Usage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/volumes/samples/psp-volume-types/example_allowed.yaml\n"))),(0,l.kt)("details",null,(0,l.kt)("summary",null,"update"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'kind: AdmissionReview\napiVersion: admission.k8s.io/v1beta1\nrequest:\n  operation: "UPDATE"\n  object:\n    apiVersion: v1\n    kind: Pod\n    metadata:\n      name: nginx-volume-types-disallowed\n      labels:\n        app: nginx-volume-types\n    spec:\n      containers:\n      - name: nginx\n        image: nginx\n        volumeMounts:\n        - mountPath: /cache\n          name: cache-volume\n      - name: nginx2\n        image: nginx\n        volumeMounts:\n        - mountPath: /cache2\n          name: demo-vol\n      volumes:\n      - name: cache-volume\n        hostPath:\n          path: /tmp # directory location on host\n      - name: demo-vol\n        emptyDir: {}\n\n')),(0,l.kt)("p",null,"Usage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/volumes/samples/psp-volume-types/update.yaml\n"))))))}c.isMDXComponent=!0}}]);