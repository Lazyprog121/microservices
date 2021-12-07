istioctl install --set profile=demo -y

kubectl label namespace default istio-injection=enabled

kubectl delete --all deployments
kubectl delete --all services
kubectl delete ingress demo-ingress

kubectl apply -f k8s_v1
kubectl apply -f k8s_v2
kubectl apply -f k8s_v3

Timeout /T 60

kubectl get pods

$minikubeIp = minikube ip
curl $minikubeIp/api/service1 -UseBasicParsing
curl $minikubeIp/api/service2 -UseBasicParsing
curl $minikubeIp/api/root-service -UseBasicParsing