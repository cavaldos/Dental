import { poolConnect } from "./config/connectDB.js";
import groupAndTable from "./utils/lodash.js";
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

const data2 = await load(
  `SELECT CA.MACA, GIOBATDAU, GIOKETTHUC, LH.SOTT SOTTLH, LH.MANS, NS.HOTEN HOTENNS, KH.SODT SODTKH, KH.HOTEN HOTENKH, LH.LYDOKHAM LYDOKHAM
			FROM LICHHEN LH
			JOIN NHASI NS ON NS.MANS = LH.MANS
			JOIN LICHRANH LR2 ON LR2.MANS = LH.MANS AND LH.SOTT = LR2.SOTT
			JOIN CA ON CA.MACA = LR2.MACA
			JOIN KHACHHANG KH ON KH.SODT = LH.SODT
			FOR JSON PATH`,
  role
);
/// import file json
// import fs from "fs";

const data4 = groupAndTable(data2, ["MANS", "MANV"], ["SOTTLH"]);

import fs from "fs";
const data3 = await load(
  `SELECT * FROM LICHRANH LR JOIN NHASI NS ON  LR.MANS = NS.MANS JOIN CA C ON LR.MACA = C.MACA `,
  role
);

console.log(data3);

// const data5 = data4.map((obj) => {
//   const uniqueMACA = _.uniq(obj.MACA);
//   return { ...obj, MACA: uniqueMACA };
// });

// console.log(data5);

// const jsonData = JSON.stringify(data5, null, 2);
// // //Lưu vào file data.json
// fs.writeFile("lichranh.json", jsonData, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Data written to file");
//   }
// });

export default function test() {
  console.log("test function");
}
