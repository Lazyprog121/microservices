minikube start --driver=hyperv

minikube docker-env
minikube docker-env | Invoke-Expression

minikube addons enable ingress

Timeout /T 10

minikube addons enable metrics-server

Timeout /T 20

kubectl top node
kubectl top pod

kubectl create namespace monitoring
Timeout /T 5
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
Timeout /T 5
helm install --namespace monitoring prometheus prometheus-community/kube-prometheus-stack
Timeout /T 10

Add-Content -Path c:\windows\system32\drivers\etc\hosts -Value "$(minikube ip) grafana"

kubectl config set-context --current --namespace=monitoring
kubectl apply -f k8s/metrics/grafana_ingress.yaml

$base64string = kubectl get secret --namespace monitoring prometheus-grafana -o jsonpath="{.data.admin-password}"
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($base64string))
kubectl port-forward --namespace monitoring service/prometheus-grafana 3000:80