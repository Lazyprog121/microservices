kubectl delete --all deployments
kubectl delete --all services
kubectl delete ingress demo-ingress

kubectl apply -f k8s/service1
kubectl apply -f k8s/service2
kubectl apply -f k8s/ingress.yaml

Timeout /T 60

kubectl get pods

$minikubeIp = minikube ip
curl $minikubeIp/api/service1 -UseBasicParsing
curl $minikubeIp/api/service2 -UseBasicParsing