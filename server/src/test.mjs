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
  `SELECT LR.MACA, CA.GIOBATDAU, LH.MANS, NS.HOTEN AS NS_HOTEN, KH.SODT, KH.HOTEN AS KH_HOTEN
    FROM LICHHEN LH
    JOIN KHACHHANG KH ON LH.SODT = KH.SODT
    JOIN NHASI NS ON LH.MANS = NS.MANS
    JOIN LICHRANH LR ON LR.MANS = NS.MANS
    JOIN CA CA ON LR.MACA = CA.MACA;
`,
  role
);

const data5 = await load(
  `
SELECT NS.HOTEN, LR.MACA, LR.NGAY, CA.GIOBATDAU, CA.GIOKETTHUC, 
    CASE WHEN LH.SODT IS NULL THEN 1 ELSE 0 END AS KiemTraSODT
FROM LICHRANH LR
    JOIN CA ON LR.MACA = CA.MACA
    JOIN NHASI NS ON LR.MANS = NS.MANS
    LEFT JOIN LICHHEN LH ON (LH.MANS = LR.MANS AND LH.SOTT = LR.SOTT)
ORDER BY LR.NGAY
`,
  role
);
const result = groupAndTable(data5, ["MACA","HOTEN"], []);


console.log(result);

// console.log("sadfsd",result);
const save = (data, name) => {
  const jsonData = JSON.stringify(data, null, 2);
  // //Lưu vào file data.json
  fs.writeFile(name, jsonData, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data written to file");
    }
  });
};

save(result, "lh_nv1.json");

export default function test() {
  console.log("test function");
}
