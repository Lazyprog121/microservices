cd C:\Users\Dania\source\repos\microservices\lab1 # change path

docker build -t service1:0.1 -f services/service1/Dockerfile .
docker build -t service2:0.2 -f services/service2/Dockerfile .