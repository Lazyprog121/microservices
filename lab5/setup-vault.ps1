kubectl exec --stdin=true --tty=true vault-0 -- /bin/sh
vault login

# $json = cat cluster-keys.json | ConvertFrom-Json
# $ROOT_TOKEN = $json.root_token

vault secrets enable -path=secret kv-v2
vault kv put secret/webapp/config broker="kafka:9092" topic="best-topic"
vault kv get secret/webapp/config
vault auth enable kubernetes
vault write auth/kubernetes/config \
        kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443" \
        token_reviewer_jwt="$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
        kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
        issuer="https://kubernetes.default.svc.cluster.local"

vault policy write webapp - <<EOF
path "secret/data/webapp/config" {
  capabilities = ["read"]
}
EOF

vault write auth/kubernetes/role/webapp \
        bound_service_account_names=vault \
        bound_service_account_namespaces=default \
        policies=webapp \
        ttl=24h

exit

cd ..
cd ..

kubectl apply --filename ./k8s/vault/vault.deployment.yaml
Timeout /T 60
$temp = kubectl get pod -l app=webapp -o jsonpath="{.items[0].metadata.name}"
kubectl port-forward $temp 8080:8080
# http://localhost:8080