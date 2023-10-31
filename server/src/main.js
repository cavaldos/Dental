import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "ansicolors";
import IP from "./config/ip.js";

import { poolConnect } from "./config/connectDB.js";
import { load, add, del, patch, getTables } from "./utils/mssql.js";

poolConnect();

poolConnect("loginA", "password123@");
poolConnect("loginB", "password123@");

app.use(express.json());
dotenv.config();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// ==========================================
const port = process.env.PORT || 4000;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`\n  🚀  ➜ Local:    `, colors.blue(`http://localhost:${port}`));
  console.log(`  🚀  ➜ Network:  `, colors.green(`http://${IP}:${port}\n`));
});
// ====================test function
// ====================test function
// ====================test function
// ====================test function
// ====================test function

// load("SELECT * FROM Users u");

const entity = {
  id: 54,
  email: "khadasfdsfgsdfnh@gmail.com",
  name: "khansdfdfgsdfh",
  password: "12455563456",
};

const newentity = {
  name: "New Name",
  email: "newemail@example.com",
};
const tableName = "Users";
const condition = "id = 1";
// del(tableName, condition);
// patch(tableName, newentity, condition);
// add(tableName, entity);
// getTables();
