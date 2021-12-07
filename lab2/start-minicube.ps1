minikube start --driver=hyperv

minikube docker-env
minikube docker-env | Invoke-Expression

minikube addons enable ingress