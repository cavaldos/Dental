// import { poolConnect } from "./config/connectDB.js";

// let pool = await poolConnect("KH");
// let result = await pool.queryRecordset("SELECT * FROM KHACHHANG");

// // console.log(result);

// export default function test() {
//   console.log("test function");
// }

// Tạo đối tượng request giả định
const request = {
  input: (paramName, paramValue) => {
    console.log(`Setting input '${paramName}' to '${paramValue}'`);
  }
};

// Đoạn mã đã sửa
const params = {
  MaKH: "KH0001",
  TenKH: "Nguyen Van A",
  DiaChi: "Ha Noi",
  SDT: "0123456789",
};

for (const paramName in params) {
  if (params.hasOwnProperty(paramName)) {
    request.input(paramName, params[paramName]);
  }
}