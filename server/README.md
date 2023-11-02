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
