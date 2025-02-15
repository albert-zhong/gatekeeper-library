---
id: horizontalpodautoscaler
title: Horizontal Pod Autoscaler
---

# Horizontal Pod Autoscaler

## Description
Disallow the following scenarios when deploying `HorizontalPodAutoscalers` 1. Deployment of HorizontalPodAutoscalers with `.spec.minReplicas` or `.spec.maxReplicas` outside the ranges defined in the constraint 2. Deployment of HorizontalPodAutoscalers where the difference between `.spec.minReplicas` and `.spec.maxReplicas` is less than the configured `minimumReplicaSpread` 3. Deployment of HorizontalPodAutoscalers that do not reference a valid `scaleTargetRef` (e.g. Deployment, ReplicationController, ReplicaSet, StatefulSet).

## Template
```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8shorizontalpodautoscaler
  annotations:
    metadata.gatekeeper.sh/title: "Horizontal Pod Autoscaler"
    metadata.gatekeeper.sh/version: 1.0.1
    metadata.gatekeeper.sh/requires-sync-data: |
      "[
        [
          {
            "groups":["apps"],
            "versions": ["v1"],
            "kinds": ["Deployment"]
          },
          {
            "groups":["apps"],
            "versions": ["v1"],
            "kinds": ["StatefulSet"]
          }
        ]
      ]"
    description: >-
      Disallow the following scenarios when deploying `HorizontalPodAutoscalers`
      1. Deployment of HorizontalPodAutoscalers with `.spec.minReplicas` or `.spec.maxReplicas` outside the ranges defined in the constraint
      2. Deployment of HorizontalPodAutoscalers where the difference between `.spec.minReplicas` and `.spec.maxReplicas` is less than the configured `minimumReplicaSpread`
      3. Deployment of HorizontalPodAutoscalers that do not reference a valid `scaleTargetRef` (e.g. Deployment, ReplicationController, ReplicaSet, StatefulSet).
spec:
  crd:
    spec:
      names:
        kind: K8sHorizontalPodAutoscaler
      validation:
        # Schema for the `parameters` field
        openAPIV3Schema:
          type: object
          properties:
            enforceScaleTargetRef:
              description: If set to true it validates the HPA scaleTargetRef exists
              type: boolean
            minimumReplicaSpread:
              description: If configured it enforces the minReplicas and maxReplicas in an HPA must have a spread of at least this many replicas
              type: integer
            ranges:
              type: array
              description: Allowed ranges for numbers of replicas.  Values are inclusive.
              items:
                type: object
                description: A range of allowed replicas.  Values are inclusive.
                properties:
                  min_replicas:
                    description: The minimum number of replicas allowed, inclusive.
                    type: integer
                  max_replicas:
                    description: The maximum number of replicas allowed, inclusive.
                    type: integer
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8shorizontalpodautoscaler

        violation[{"msg": msg}] {
          input.review.kind.kind == "HorizontalPodAutoscaler"
          hpa := input.review.object

          not input_replica_limit(hpa)
          msg := sprintf("The %v <%v> minReplicas %v or maxReplicas %v is not allowed: %v. Allowed ranges: %v", [hpa.kind, hpa.metadata.name, hpa.spec.minReplicas, hpa.spec.maxReplicas, input.parameters.ranges])
        }

        violation[{"msg": msg}] {
          input.review.kind.kind == "HorizontalPodAutoscaler"
          hpa := input.review.object

          not input_replica_spread(hpa)
          
          msg := sprintf("The %v <%v> is configured with minReplicas %v and maxReplicas %v which is a spread of %v replica(s). The spread must be at least %v replica(s)", [hpa.kind, hpa.metadata.name, hpa.spec.minReplicas, hpa.spec.maxReplicas, hpa.spec.maxReplicas - hpa.spec.minReplicas, input.parameters.minimumReplicaSpread])
        }

        violation[{"msg": msg}] {
          input.review.kind.kind == "HorizontalPodAutoscaler"
          hpa := input.review.object
          input.parameters.enforceScaleTargetRef
          
          not data.inventory.namespace[hpa.metadata.namespace][hpa.spec.scaleTargetRef.apiVersion][hpa.spec.scaleTargetRef.kind][hpa.spec.scaleTargetRef.name]
          msg := sprintf("The HorizontalPodAutoscaler <%v> has a scaleTargetRef of <%v/%v> but it does not exist. The scaleTargetRef for the HorizontalPodAutoscaler must exist", [hpa.metadata.name, hpa.spec.scaleTargetRef.kind, hpa.spec.scaleTargetRef.name])
        }

        input_replica_limit(hpa) {
            count(input.parameters.ranges) > 0
            range := input.parameters.ranges[_]
            value_within_range(range, hpa.spec.minReplicas, hpa.spec.maxReplicas)
        }

        value_within_range(range, min_provided, max_provided) {
            range.min_replicas <= min_provided
            range.max_replicas >= max_provided
        }

        input_replica_spread(hpa) {
            input.parameters.minimumReplicaSpread
            (hpa.spec.maxReplicas - hpa.spec.minReplicas) >= input.parameters.minimumReplicaSpread
        }

```

### Usage
```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/horizontalpodautoscaler/template.yaml
```
## Examples
<details>
<summary>horizontal-pod-autoscaler</summary><blockquote>

<details>
<summary>constraint</summary>

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sHorizontalPodAutoscaler
metadata:
  name: horizontal-pod-autoscaler
spec:
  enforcementAction: deny
  match:
    kinds:
      - apiGroups: ["autoscaling"]
        kinds: ["HorizontalPodAutoscaler"]
  parameters:
    minimumReplicaSpread: 1
    enforceScaleTargetRef: true
    ranges:
    - min_replicas: 3
      max_replicas: 6

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/horizontalpodautoscaler/samples/horizontalpodautoscaler/constraint.yaml
```

</details>

<details>
<summary>example-allowed-hpa</summary>

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa-allowed
  namespace: default
spec:
  minReplicas: 3
  maxReplicas: 6
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 900
        type: Utilization
    type: Resource
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/horizontalpodautoscaler/samples/horizontalpodautoscaler/example_allowed_hpa.yaml
```

</details>
<details>
<summary>example-disallowed-hpa-replicas</summary>

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa-disallowed-replicas
  namespace: default
spec:
  minReplicas: 2
  maxReplicas: 7
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 900
        type: Utilization
    type: Resource
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/horizontalpodautoscaler/samples/horizontalpodautoscaler/example_disallowed_hpa_replicas.yaml
```

</details>
<details>
<summary>example-disallowed-hpa-replicaspread</summary>

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa-disallowed-replicaspread
  namespace: default
spec:
  minReplicas: 4
  maxReplicas: 4
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 900
        type: Utilization
    type: Resource
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/horizontalpodautoscaler/samples/horizontalpodautoscaler/example_disallowed_hpa_replicaspread.yaml
```

</details>
<details>
<summary>example-disallowed-scaletarget</summary>

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa-disallowed-scaletarget
  namespace: default
spec:
  minReplicas: 3
  maxReplicas: 6
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 900
        type: Utilization
    type: Resource
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment-missing

```

Usage

```shell
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper-library/master/library/general/horizontalpodautoscaler/samples/horizontalpodautoscaler/example_disallowed_hpa_scaletarget.yaml
```

</details>


</blockquote></details>