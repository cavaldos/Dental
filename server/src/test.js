import { poolConnect } from "./config/connectDB.js";

let pool = await poolConnect("KH");
let result = await pool.queryRecordset("SELECT * FROM KHACHHANG");

// console.log(result);

export default function test() {
  console.log("test function");
}
