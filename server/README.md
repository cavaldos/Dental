## Dentist Server
#### Install
1. Install packages 
```shell
npm install # yarn
```
```shell
npm run dev  # yarn dev
```
2. Create docker compose with mssql
```shell
docker compose -f mssql.yml up -d
```
***UserName :sa***
```shell
password123@
```



#### ======================================================

1. Create docker compose with mysql

```shell
docker compose -f mysql.yml -p dentists up -d

```

### Build docker


1.Build your updated version of the image, using the `docker build` command.

```shell
docker build -t  dentists-server .
```

2.Start a new container using the updated code.

```shell
docker run -dp 3000:3000  dentists-server .
```
3. Check docker container
```shell
docker ps -a
```
4. Check docker logs
```shell
docker logs <container_id>
```
5. Stop docker container
```shell
docker stop <container_id>
```
6. Remove docker container
```shell
docker rm <container_id>
```
7. Remove docker image
```shell
docker rmi <image_id>
```