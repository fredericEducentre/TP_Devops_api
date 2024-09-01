# TP_DevOps_API

Please personnalize all credentials bellow.

Create a docker network :
docker network create webapp

You can use a MySQL container for the database : 
docker run --name mysql_container --network webapp -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=webapp -d mysql

Deploy this api with docker : 
docker run --name api_container --network webapp -p 3001:3001 -e DB_HOST=mysql_container -e DB_USER=root -e DB_PASSWORD=root -e DATABASE=webapp fredericeducentre/api

Go to localhost:3001/users