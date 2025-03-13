# Helming Charter

### Build the Docker Image

```
1. docker build -t USERNAME/APP_NAME:APP_TAG .
2. docker push USERNAME/APP_NAME:APP_TAG
```

### Spin Kubernetes Cluster Locally

```
minikube start --kubernetes-version=v1.31.6 --memory=4G --cpus=4
```

### Install App in K8S Cluster

```
1. Update repository and tag in values.yaml
2. helm install RELEASE_NAME ./chart
```
