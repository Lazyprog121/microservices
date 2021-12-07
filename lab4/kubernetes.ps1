kubectl apply -f k8s/services/service1
kubectl apply -f k8s/services/service2
kubectl apply -f k8s/services/root-service

kubectl apply -f k8s/kafka/zookeeper.yaml
kubectl apply -f k8s/kafka/kafka.yaml
kubectl apply -f k8s/storage
kubectl apply -f k8s/postgres
kubectl apply -f k8s/vault

kubectl apply -f k8s/services/ingress.yaml

Timeout /T 180

kubectl get pods