# Dentist client

### Install

1. Install

```shell
 cd client # cd client
```

```shell
 npm install # pnpm install
```

```shell
 npm run dev # npm run dev
```

## Dentist Server

#### Install

1. Install packages

```shell
cd server
```

```shell
npm install # yarn
```

```shell
npm run dev  # yarn dev
```

2. Create docker compose with mysql

```shell
docker compose -f mysql.yml -p dentists up -d
```

**_Config file .yml_**

```yml
version: "3.8"
services:
  mysql:
    image: mysql:5.7.40
    restart: always
    ports:
      - "3308:3306"    # 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: dentists
      MYSQL_USER: test
      MYSQL_PASSWORD: test
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
