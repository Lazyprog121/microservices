minikube start --driver=hyperv

minikube docker-env
minikube docker-env | Invoke-Expression

minikube addons enable ingress

helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update

cd C:\Users\Dania\source\repos\microservices\lab4\k8s\helm # change path
helm install consul hashicorp/consul --values helm-consul-values.yaml

Timeout /T 180

kubectl get pods

helm install vault hashicorp/vault --values helm-vault-values.yaml

Timeout /T 40

kubectl get pods

kubectl exec vault-0 -- vault operator init -key-shares=1 -key-threshold=1 -format=json > cluster-keys.json
cat cluster-keys.json
$json = cat cluster-keys.json | ConvertFrom-Json
$VAULT_UNSEAL_KEY = $json.unseal_keys_b64

kubectl exec vault-0 -- vault operator unseal $VAULT_UNSEAL_KEY
kubectl exec vault-1 -- vault operator unseal $VAULT_UNSEAL_KEY
kubectl exec vault-2 -- vault operator unseal $VAULT_UNSEAL_KEY

Timeout /T 180

kubectl get pods