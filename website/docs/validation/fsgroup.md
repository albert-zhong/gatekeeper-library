---
id: fsgroup
title: FS Group
---

# FS Group

## Description
Controls allocating an FSGroup that owns the Pod's volumes. Corresponds to the `fsGroup` field in a PodSecurityPolicy. For more information, see https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems

## Template
```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8spspfsgroup
  annotations:
    metadata.gatekeeper.sh/title: "FS Group"
    metadata.gatekeeper.sh/version: 1.0.1
    description: >-
      Controls allocating an FSGroup that owns the Pod's volumes. Corresponds
      to the `fsGroup` field in a PodSecurityPolicy. For more information, see
      https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
spec:
  crd:
    spec:
      names:
        kind: K8sPSPFSGroup
      validation:
        # Schema for the `parameters` field
        openAPIV3Schema:
          type: object
          description: >-
            Controls allocating an FSGroup that owns the Pod's volumes. Corresponds
            to the `fsGroup` field in a PodSecurityPolicy. For more information, see
            https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
          properties:
            rule:
              description: "An FSGroup rule name."
              enum:
                - MayRunAs
                - MustRunAs
                - RunAsAny
              type: string
            ranges:
              type: array
              description: "GID ranges affected by the rule."
              items:
                type: object
                properties:
                  min:
                    description: "The minimum GID in the range, inclusive."
                    type: integer
                  max:
                    description: "The maximum GID in the range, inclusive."
                    type: integer
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8spspfsgroup

        import data.lib.exclude_update.is_update

        violation[{"msg": msg, "details": {}}] {
            # spec.securityContext.fsGroup field is immutable.
            not is_update(input.review)

            spec := input.review.object.spec
            not input_fsGroup_allowed(spec)
            msg := sprintf("The provided pod spec fsGroup is not allowed, pod: %v. Allowed fsGroup: %v", [input.review.object.metadata.name, input.parameters])
        }

        input_fsGroup_allowed(spec) {
            # RunAsAny - No range is required. Allows any fsGroup ID to be specified.
            input.parameters.rule == "RunAsAny"
        }
        input_fsGroup_allowed(spec) {
            # MustRunAs - Validates pod spec fsgroup against all ranges
            input.parameters.rule == "MustRunAs"
            fg := spec.securityContext.fsGroup
            count(input.parameters.ranges) > 0
            range := input.parameters.ranges[_]
            value_within_range(range, fg)
        }
        input_fsGroup_allowed(spec) {
            # MayRunAs - Validates pod spec fsgroup against all ranges or allow pod spec fsgroup to be left unset
            input.parameters.rule == "MayRunAs"
            not has_field(spec, "securityContext")
        }
        input_fsGroup_allowed(spec) {
            # MayRunAs - Validates pod spec fsgroup against all ranges or allow pod spec fsgroup to be left unset
            input.parameters.rule == "MayRunAs"
            not spec.securityContext.fsGroup
        }
        input_fsGroup_allowed(spec) {
            # MayRunAs - Validates pod spec fsgroup against all ranges or allow pod spec fsgroup to be left unset
            input.parameters.rule == "MayRunAs"
            fg := spec.securityContext.fsGroup
            count(input.parameters.ranges) > 0
            range := input.parameters.ranges[_]
            value_within_range(range, fg)
        }
        value_within_range(range, value) {
            range.min <= value
            range.max >= value
        }
        # has_field returns whether an object has a field
        has_field(object, field) = true {
            object[field]
        }
      libs:
        - |
          package lib.exclude_update

          is_update(review) {
              review.operation == "UPDATE"
          }

```

### Usage
```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/fsgroup/template.yaml
```
## Examples
<details>
<summary>fsgroup</summary><blockquote>

<details>
<summary>constraint</summary>

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPFSGroup
metadata:
  name: psp-fsgroup
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    rule: "MayRunAs" #"MustRunAs" #"MayRunAs", "RunAsAny"
    ranges:
    - min: 1
      max: 1000

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/fsgroup/samples/psp-fsgroup/constraint.yaml
```

</details>

<details>
<summary>example-disallowed</summary>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: fsgroup-disallowed
spec:
  securityContext:
    fsGroup: 2000                           # directory will have group ID 2000
  volumes:
  - name: fsgroup-demo-vol
    emptyDir: {}
  containers:
  - name: fsgroup-demo
    image: busybox
    command: [ "sh", "-c", "sleep 1h" ]
    volumeMounts:
    - name: fsgroup-demo-vol
      mountPath: /data/demo

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/fsgroup/samples/psp-fsgroup/example_disallowed.yaml
```

</details>
<details>
<summary>example-allowed</summary>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: fsgroup-disallowed
spec:
  securityContext:
    fsGroup: 500 # directory will have group ID 500
  volumes:
    - name: fsgroup-demo-vol
      emptyDir: {}
  containers:
    - name: fsgroup-demo
      image: busybox
      command: ["sh", "-c", "sleep 1h"]
      volumeMounts:
        - name: fsgroup-demo-vol
          mountPath: /data/demo

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/fsgroup/samples/psp-fsgroup/example_allowed.yaml
```

</details>
<details>
<summary>update</summary>

```yaml
kind: AdmissionReview
apiVersion: admission.k8s.io/v1beta1
request:
  operation: "UPDATE"
  object:
    apiVersion: v1
    kind: Pod
    metadata:
      name: fsgroup-disallowed
    spec:
      securityContext:
        fsGroup: 2000 # directory will have group ID 2000
      volumes:
      - name: fsgroup-demo-vol
        emptyDir: {}
      containers:
      - name: fsgroup-demo
        image: busybox
        command: [ "sh", "-c", "sleep 1h" ]
        volumeMounts:
        - name: fsgroup-demo-vol
          mountPath: /data/demo

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/fsgroup/samples/psp-fsgroup/update.yaml
```

</details>


</blockquote></details>