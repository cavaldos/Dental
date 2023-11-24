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
  `SELECT KH.SODT,KH.HOTEN AS HOTEN_KH, KH.NGAYSINH, HSB.MANS, NS.HOTEN AS HOTEN_NS, HSB.DANDO ,CTDV.SOTT, LDV.TENDV, CTDV.SOLUONG, CTT.SOTT,LT.TENTHUOC,LT.DONVITINH, CTT.THOIDIEMDUNG  FROM HOSOBENH HSB 
JOIN CHITIETTHUOC CTT ON  HSB.SOTT = CTT.SOTT 
JOIN LOAITHUOC LT ON LT.MATHUOC = CTT.MATHUOC
JOIN CHITIETDV CTDV ON CTDV.SOTT =HSB.SOTT
JOIN LOAIDICHVU LDV ON LDV.MADV = CTDV.MADV
JOIN KHACHHANG KH ON KH.SODT = HSB.SODT
JOIN NHASI NS ON NS.MANS = HSB.MANS

`,
  role
);
const result = groupAndTable(data5, ["SODT"], ["TENDV","TENTHUOC"]);

console.log(result);

const result2 = _.groupBy(result, "SODT");

_.forEach(result2, (group, key) => {
  const services = _.map(group, "TENDV");
  const mergedServices = _.flattenDepth(services, 1);

  const medicines = _.map(group, "TENTHUOC");
  const mergedMedicines = _.flattenDepth(medicines, 1);

  group[0].TENDV = mergedServices;
  group[0].TENTHUOC = mergedMedicines;
});

_.forEach(result2, (item) => {
  // Gom nhóm và đếm số lượng các giá trị trùng lặp
  const serviceCount = _.countBy(item.TENDV);

  // Biến đổi thành mảng các object {key: value}
  const services = _.map(serviceCount, (value, key) => {
    return {
      [key]: value,
    };
  });

  // Gán lại mảng đã xử lý
  item.TENDV = services;
});

// console.log(result2);

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

// save(result2, "hsb.json");

export default function test() {
  console.log("test function");
}
