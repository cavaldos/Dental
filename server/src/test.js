
import { poolConnect } from "./config/connectDB.js";
import sql from "mssql-plus";


import { load, add, del, patch, getTables } from "./utils/mssql.js";
const role = {
  login: "cong",
  pass: "111",
  database: "PKNHAKHOA",
};
let pool = await poolConnect();
const result = await pool.query("select * from NHANVIEN");
console.log(result.recordset);

export default function test () {
  console.log("test function");
};
