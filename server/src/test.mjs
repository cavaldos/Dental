import { poolConnect } from "./config/connectDB.js";
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
SELECT HSB.SOTT, HSB.SODT SODT, KH.HOTEN HOTEN, DATEDIFF(year,KH.NGAYSINH,GETDATE()) TUOI, NGAYKHAM, NS.HOTEN NHASI, DANDO, CTDV.MADV, TENDV, CTDV.SOLUONG, CTT.MATHUOC, TENTHUOC, CTT.SOLUONG, DONVITINH, THOIDIEMDUNG
FROM HOSOBENH HSB 
JOIN NHASI NS ON HSB.MANS = NS.MANS
JOIN KHACHHANG KH ON KH.SODT = HSB.SODT
JOIN CHITIETDV CTDV ON CTDV.SOTT = HSB.SOTT AND CTDV.SODT = HSB.SODT
JOIN LOAIDICHVU LDV ON LDV.MADV = CTDV.MADV
LEFT JOIN CHITIETTHUOC CTT ON CTT.SOTT = HSB.SOTT AND CTT.SODT = HSB.SODT
LEFT JOIN LOAITHUOC LT ON LT.MATHUOC = CTT.MATHUOC
`,
  role
);

const groupedData = _.groupBy(data2, (item) => `${item.SOTT}-${item.SODT}`);
console.log("groupedData", groupedData);



// const result = [];
// // Duyệt từng phần tử kết quả truy vấn
// data2.forEach((item) => {
//   // Tìm vị trí hồ sơ bệnh nhân trong mảng kết quả
//   const index = result.findIndex((r) => r.SOTT === item.SOTT);

//   // Nếu chưa có, khởi tạo mới
//   if (index === -1) {
//     result.push({
//       SOTT: item.SOTT,
//       SODT: item.SODT,
//       // các trường khác của hồ sơ bệnh nhân
//       dichVu: [],
//       thuoc: [],
//     });
//   }

//   // Lấy ra hồ sơ bệnh nhân
//   const benhNhan = result[index];
//   if (result && result.length > 0) {
//     // Kiểm tra index hợp lệ
//     if (index >= 0 && index < result.length) {
//       const benhNhan = result[index];

//       // Kiểm tra benhNhan khác undefined
//       if (
//         benhNhan !== undefined
//         //  &&
//         // item.MADV &&
//         // item.SOTT === benhNhan.SOTT &&
//         // item.SODT === benhNhan.SODT
//       ) {
//         benhNhan.dichVu.push({
//           MADV: item.MADV,
//           TENDV: item.TENDV,
//           SOLUONG: item.SOLUONG,
//         });
//       }
//       if (
//         benhNhan !== undefined 
//         // &&
//         // item.MATHUOC &&
//         // item.SOTT === benhNhan.SOTT &&
//         // item.SODT === benhNhan.SODT
//       ) {
//         benhNhan.thuoc.push({
//           MATHUOC: item.MATHUOC,
//           TENTHUOC: item.TENTHUOC,
//           DONVITINH: item.DONVITINH,
//           THOIDIEMDUNG: item.THOIDIEMDUNG,
//         });
//       }
//     }
//   }
// });

// // Kết quả
// console.log("result ho so benh", result);
// console.log(
//   "result dichVu",
//   result.map((item) => item.dichVu)
// );
// console.log(
//   "result thuoc",
//   result.map((item) => item.thuoc)
// );

export default function test() {
  console.log("test function");
}
