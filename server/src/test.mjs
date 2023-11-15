import { poolConnect } from "./config/connectDB.js";
import  groupAndTable  from "./utils/lodash.js";
import _ from "lodash";
poolConnect();

import { load, add, del, patch, getTables } from "./utils/mssql.js";
const role = {
  login: "sa",
  pass: "password123@",
  database: "PKNHAKHOA",
};
const data = await load(
  `SELECT NGAY, LR.MANS, HOTEN, CA.MACA, GIOBATDAU, GIOKETTHUC
    FROM LICHRANH LR
    JOIN NHASI NS ON NS.MANS = LR.MANS
    JOIN CA ON CA.MACA = LR.MACA
    WHERE NOT EXISTS
(
	SELECT 1
	FROM LICHHEN LH
	WHERE LH.MANS = LR.MANS AND LH.SOTT = LR.SOTT
)`,
  role
);
// console.log(data);

// const groupedData = _.groupBy(data, "NGAY");

// const results = _.map(groupedData, (items, date) => ({
//   NGAY: items[0].NGAY,
//   NS_COHEN: [],
//   NS_CHUACOHEN: items,
// }));

// console.log(results);



// // console.log("data 2",data2);

// const result = {};
// data.map(item => {    /// data là cái kết quả của hàm load
//   const ngay = item.NGAY;
//   if (!result[ngay]) {
//     result[ngay] = {
//       NGAY: ngay,
//       NS_COHEN: [],
//       NS_CHUACOHEN: []
//     };
//   }
//   if (item.SOTTLH) {
//     result[ngay].NS_COHEN.push(item);
//   } else {
//     result[ngay].NS_CHUACOHEN.push(item);
//   }
// });
// const groupedResult = Object.values(result);
// console.log(groupedResult);

// console.log("NGAY",groupedResult.map((item) => item.NGAY));
// console.log("NS COHEN",groupedResult.map((item) => item.NS_COHEN));
// console.log("NS CHƯA co Hen",groupedResult.map((item) => item.NS_CHUACOHEN));

// Khởi tạo các mảng chứa kết quả
// const result = {
//   dichVu: [],
//   thuoc: []
// };

// Duyệt qua các phần tử kết quả
// Khởi tạo mảng kết quả
const data2 = await load(
  `
SELECT CA.MACA, GIOBATDAU, GIOKETTHUC, LH.SOTT SOTTLH, LH.MANS, NS.HOTEN HOTENNS, KH.SODT SODTKH, KH.HOTEN HOTENKH, LH.LYDOKHAM LYDOKHAM
			FROM LICHHEN LH
			JOIN NHASI NS ON NS.MANS = LH.MANS
			JOIN LICHRANH LR2 ON LR2.MANS = LH.MANS AND LH.SOTT = LR2.SOTT
			JOIN CA ON CA.MACA = LR2.MACA
			JOIN KHACHHANG KH ON KH.SODT = LH.SODT
			FOR JSON PATH
`,
  role
);

console.log( JSON.stringify(data2[0]));




// console.log("data2", data2);
// const result =  groupAndTable(data2, ["SOTT","SODT"], ["MATHUOC", "MADV", "TENDV", "TENTHUOC"]);

// console.log("result", result);


export default function test() {
  console.log("test function");
}
