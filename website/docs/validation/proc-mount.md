---
id: proc-mount
title: Proc Mount
---

# Proc Mount

## Description
Controls the allowed `procMount` types for the container. Corresponds to the `allowedProcMountTypes` field in a PodSecurityPolicy. For more information, see https://kubernetes.io/docs/concepts/policy/pod-security-policy/#allowedprocmounttypes

## Template
```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8spspprocmount
  annotations:
    metadata.gatekeeper.sh/title: "Proc Mount"
    metadata.gatekeeper.sh/version: 1.0.2
    description: >-
      Controls the allowed `procMount` types for the container. Corresponds to
      the `allowedProcMountTypes` field in a PodSecurityPolicy. For more
      information, see
      https://kubernetes.io/docs/concepts/policy/pod-security-policy/#allowedprocmounttypes
spec:
  crd:
    spec:
      names:
        kind: K8sPSPProcMount
      validation:
        # Schema for the `parameters` field
        openAPIV3Schema:
          type: object
          description: >-
            Controls the allowed `procMount` types for the container. Corresponds to
            the `allowedProcMountTypes` field in a PodSecurityPolicy. For more
            information, see
            https://kubernetes.io/docs/concepts/policy/pod-security-policy/#allowedprocmounttypes
          properties:
            exemptImages:
              description: >-
                Any container that uses an image that matches an entry in this list will be excluded
                from enforcement. Prefix-matching can be signified with `*`. For example: `my-image-*`.

                It is recommended that users use the fully-qualified Docker image name (e.g. start with a domain name)
                in order to avoid unexpectedly exempting images from an untrusted repository.
              type: array
              items:
                type: string
            procMount:
              type: string
              description: >-
                Defines the strategy for the security exposure of certain paths
                in `/proc` by the container runtime. Setting to `Default` uses
                the runtime defaults, where `Unmasked` bypasses the default
                behavior.
              enum:
                - Default
                - Unmasked
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8spspprocmount

        import data.lib.exclude_update.is_update
        import data.lib.exempt_container.is_exempt

        violation[{"msg": msg, "details": {}}] {
            # spec.containers.securityContext.procMount field is immutable.
            not is_update(input.review)

            c := input_containers[_]
            not is_exempt(c)
            allowedProcMount := get_allowed_proc_mount(input)
            not input_proc_mount_type_allowed(allowedProcMount, c)
            msg := sprintf("ProcMount type is not allowed, container: %v. Allowed procMount types: %v", [c.name, allowedProcMount])
        }

        input_proc_mount_type_allowed(allowedProcMount, c) {
            allowedProcMount == "default"
            lower(c.securityContext.procMount) == "default"
        }
        input_proc_mount_type_allowed(allowedProcMount, c) {
            allowedProcMount == "unmasked"
        }

        input_containers[c] {
            c := input.review.object.spec.containers[_]
            c.securityContext.procMount
        }
        input_containers[c] {
            c := input.review.object.spec.initContainers[_]
            c.securityContext.procMount
        }
        input_containers[c] {
            c := input.review.object.spec.ephemeralContainers[_]
            c.securityContext.procMount
        }

        get_allowed_proc_mount(arg) = out {
            not arg.parameters
            out = "default"
        }
        get_allowed_proc_mount(arg) = out {
            not arg.parameters.procMount
            out = "default"
        }
        get_allowed_proc_mount(arg) = out {
            arg.parameters.procMount
            not valid_proc_mount(arg.parameters.procMount)
            out = "default"
        }
        get_allowed_proc_mount(arg) = out {
            valid_proc_mount(arg.parameters.procMount)
            out = lower(arg.parameters.procMount)
        }

        valid_proc_mount(str) {
            lower(str) == "default"
        }
        valid_proc_mount(str) {
            lower(str) == "unmasked"
        }
      libs:
        - |
          package lib.exclude_update

          is_update(review) {
              review.operation == "UPDATE"
          }
        - |
          package lib.exempt_container

          is_exempt(container) {
              exempt_images := object.get(object.get(input, "parameters", {}), "exemptImages", [])
              img := container.image
              exemption := exempt_images[_]
              _matches_exemption(img, exemption)
          }

          _matches_exemption(img, exemption) {
              not endswith(exemption, "*")
              exemption == img
          }

          _matches_exemption(img, exemption) {
              endswith(exemption, "*")
              prefix := trim_suffix(exemption, "*")
              startswith(img, prefix)
          }

```

### Usage
```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/proc-mount/template.yaml
```
## Examples
<details>
<summary>default-proc-mount-required</summary><blockquote>

<details>
<summary>constraint</summary>

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPProcMount
metadata:
  name: psp-proc-mount
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    procMount: Default

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/proc-mount/samples/psp-proc-mount/constraint.yaml
```

</details>

<details>
<summary>example-disallowed</summary>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-proc-mount-disallowed
  labels:
    app: nginx-proc-mount
spec:
  containers:
  - name: nginx
    image: nginx
    securityContext:
      procMount: Unmasked #Default

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/proc-mount/samples/psp-proc-mount/example_disallowed.yaml
```

</details>
<details>
<summary>example-allowed</summary>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-proc-mount-disallowed
  labels:
    app: nginx-proc-mount
spec:
  containers:
  - name: nginx
    image: nginx
    securityContext:
      procMount: Default

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/proc-mount/samples/psp-proc-mount/example_allowed.yaml
```

</details>
<details>
<summary>disallowed-ephemeral</summary>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-proc-mount-disallowed
  labels:
    app: nginx-proc-mount
spec:
  ephemeralContainers:
  - name: nginx
    image: nginx
    securityContext:
      procMount: Unmasked #Default

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/proc-mount/samples/psp-proc-mount/disallowed_ephemeral.yaml
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
      name: nginx-proc-mount-disallowed
      labels:
        app: nginx-proc-mount
    spec:
      containers:
      - name: nginx
        image: nginx
        securityContext:
          procMount: Unmasked #Default

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/pod-security-policy/proc-mount/samples/psp-proc-mount/update.yaml
```

</details>


</blockquote></details>