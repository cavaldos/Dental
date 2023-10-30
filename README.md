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
npm install # yarn
```

```shell
npm run dev  # yarn dev
```

2. Create docker compose with mssql

```shell
docker compose -f mssql.yml up -d
```

**_UserName :sa_**

```shell
password123@
```
### ` Rename` `.env.example` to `.env`
## Documentation

### Requests

#### Direct `./utils/mssql.js`

1. Load

```js
load("SELECT * FROM Users u");
```

2. add

```js
const entity = {
  id: 54,
  email: "21126090@gmail.com",
  name: "vu vo",
  password: "12455563456",
};
const tableName = "Users";
add(tableName, entity);
```

3. del

```js
const tableName = "Users";
const condition = "id = 1";
del(tableName, condition);
```

4.  patch

```js
const newentity = {
  name: "New Name",
  email: "newemail@example.com",
};
const condition = "id = 1";
patch(tableName, newentity, condition);
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
