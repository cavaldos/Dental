
import { poolConnect } from "./config/connectDB.js";

let pool = await poolConnect('KH');
let result = await pool.queryRecordset("SELECT MANS, HOTEN, PHAI, GIOITHIEU FROM NHASI");

console.log(result);  


export default function test() {
  console.log("test function");
};
