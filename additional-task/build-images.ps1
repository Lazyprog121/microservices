cd C:\Users\Dania\source\repos\microservices\additional-task # change path

docker build -t service1:0.1 -f services/service1/Dockerfile .
docker build -t root-service:0.1 -f services/root-service/Dockerfile .