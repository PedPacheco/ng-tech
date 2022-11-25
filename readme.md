# Na raiz do projeto (pasta ng-tech) você irá fazer os builds do projeto.

## primeiro irá rodar o comando para realizar o build do backend:

`docker build -t ng-server ./ng-tech-server`

## Depois o build do frontend:

`docker build -t ng-web ./ng-tech-web`

# Logo após realizar os builds do projeto, você poderá chamar o compose do projeto para subir o projeto pro docker

`docker-compose up`
