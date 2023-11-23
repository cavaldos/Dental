
import { poolConnect } from "./config/connectDB.js";

// function getJsonDataFromJSONPATH(resultFromSQL) {
//   const key = Object.keys(resultFromSQL.recordset[0])[0];
//   const jsonR = JSON.parse(resultFromSQL.recordset[0][key]);
//   return jsonR;
// }

import { load, add, del, patch, getTables } from "./utils/mssql.js";
import { json } from "stream/consumers";
const role = {
  login: "cong",
  pass: "111",
  database: "PKNHAKHOA",
};
let pool = await poolConnect();
// let result = await pool.query("SELECT MANS, HOTEN, PHAI, GIOITHIEU FROM NHASI for json path");
// result = getJsonDataFromJSONPATH(result); 
// console.log(result);
export default function test() {
  console.log("test function");
};
