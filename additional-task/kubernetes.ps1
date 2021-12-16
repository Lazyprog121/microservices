kubectl delete --all deployments
kubectl delete --all services
kubectl delete ingress demo-ingress

kubectl apply -f k8s/services/service1
kubectl apply -f k8s/services/root-service

kubectl apply -f k8s/kafka/zookeeper.yaml
kubectl apply -f k8s/kafka/kafka.yaml

kubectl apply -f k8s/services/ingress.yaml

Timeout /T 120

kubectl get pods

$minikubeIp = minikube ip
curl $minikubeIp/api/service1 -UseBasicParsing
curl $minikubeIp/api/root-service -UseBasicParsing

curl $minikubeIp/api/service1/statistic -UseBasicParsing
curl $minikubeIp/api/root-service/fight -UseBasicParsing
curl $minikubeIp/api/root-service/bonus -UseBasicParsing