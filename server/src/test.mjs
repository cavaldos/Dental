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


import fs from "fs";
const data3 = await load(
  `SELECT  LR.SOTT , LR.MACA,LR.NGAY, C.GIOBATDAU,C.GIOKETTHUC FROM  LICHRANH LR JOIN CA C ON (LR.MACA = C.MACA) JOIN NHASI NS ON (NS.MANS =LR.MANS) `,
  role
);
const data4 = groupAndTable(data3, ["NGAY"], ["MACA"]);

// console.log(data3);








const result = _.chain(data3)
  .groupBy("NGAY")
  .map((values, key) => {
    return {
      NGAY: key,
      CA: _.map(values, (item) => {
        return {
          GIOBATDAU: item.GIOBATDAU,
          GIOKETTHUC: item.GIOKETTHUC,
        };
      }),
      MANS: "NS0001", // giả sử đều NS0001
      SOTT: values.length, // đếm số lượng phần tử trong ngày
    };
  })
  .value();
  console.log(result );

  console.log(result.map((item) => item.CA));










const tests = [
  {
    NGAY: "2024-01-02T00:00:00.000Z",
    CA: [
      { GIOBATDAU: "1970-01-01T19:00:00.000Z" },
      { GIOKETTHUC: " 1970-01-01T21:00:00.000Z" },
    ],
    MANS: "NS0001",
    SOTT: 3,
  },
  {
    NGAY: "2024-01-02T00:00:00.000Z",
    CA: [
      { GIOBATDAU: "1970-01-01T19:00:00.000Z" },
      { GIOKETTHUC: " 1970-01-01T21:00:00.000Z" },
    ],
    MANS: "NS0002",
    SOTT: 2,
  },
];





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
