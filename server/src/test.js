import _ from "lodash";

const data = [
  {
    sdt: "0123456",
    sott: "1",
    hoten: "nguyen van a",
    madv: "001",
    mathuoc: "mt001",
  },
  {
    sdt: "0123456",
    sott: "1",
    hoten: "nguyen van a",
    madv: "002",
    mathuoc: "mt001",
  },
  {
    sdt: "0123456",
    sott: "1",
    hoten: "nguyen van a",
    madv: "003",
    mathuoc: "mt002",
  },
  {
    sdt: "012345656789",
    sott: "2",
    hoten: "nguyen van b",
    madv: "004",
    mathuoc: "mt001",
  },
  {
    sdt: "012345656789",
    sott: "2",
    hoten: "nguyen van b",
    madv: "004",
    mathuoc: "mt006",
  },
  {
    sdt: "012345656789",
    sott: "2",
    hoten: "nguyen van b",
    madv: "004",
    mathuoc: "mt08",
  },
  {
    sdt: "012345656789",
    sott: "4",
    hoten: "nguyen van b",
    madv: "006",
    mathuoc: "mt003",
  },
  {
    sdt: "012345656789",
    sott: "48",
    hoten: "nguyen van b",
    madv: "006",
    mathuoc: "mt0037",
  },
];
console.log("truoc khi gom",data);










function groupAndTable(data, groupKeys, tableKeys) {
  const groupedData = _.groupBy(data, (item) => {
    return groupKeys.map((key) => item[key]).join("-");
  });
  const result = _.map(groupedData, (items) => {
    const tableData = {};
    tableKeys.forEach((key) => {
      tableData[key] = _.map(items, key);
    });
    return {
      ...groupKeys.reduce((obj, key) => {
        obj[key] = items[0][key];
        return obj;
      }, {}),
      ...tableData,
      ..._.pick(
        items[0],
        _.difference(Object.keys(items[0]), [...groupKeys, ...tableKeys])
      ),
    };
  });
  return result;
}
const result3 = groupAndTable(data, ["hoten"], ["madv", "mathuoc"]);

console.log("result3", result3);



// function groupAndPivots(data, groupKeys, pivotKeys) {
//   // Nhóm dữ liệu
//   const groupedData = {};
//   data.forEach((item) => {
//     const groupId = groupKeys.map((key) => item[key]).join("-");
//     if (!groupedData[groupId]) {
//       groupedData[groupId] = [];
//     }
//     groupedData[groupId].push(item);
//   });

//   // Chuyển đổi dữ liệu
//   const result = [];
//   Object.keys(groupedData).forEach((groupId) => {
//     // Lấy item đầu tiên
//     const firstItem = groupedData[groupId][0];

//     // Tạo kết quả ban đầu
//     let resultObj = { ...firstItem };

//     // Thêm keys pivot
//     const pivotData = {};
//     pivotKeys.forEach((pivotKey) => {
//       pivotData[pivotKey] = [];
//       groupedData[groupId].forEach((item) => {
//         pivotData[pivotKey].push(item[pivotKey]);
//       });
//       resultObj[pivotKey] = pivotData[pivotKey];
//     });

//     result.push(resultObj);
//   });

//   return result;
// }


// const result4 = groupAndPivots(data, ["hoten","sdt","sott"], ["madv", "mathuoc"]);
// console.log("result4", result4);



// function groupAndPivot(data, groupKeys, pivotKeys) {
//   const groupedData = _.groupBy(data, (item) =>
//     groupKeys.map((key) => item[key]).join("-")
//   );
//   const result = _.map(groupedData, (items) => {
//     let resultObj = { ...items[0] };
//     const pivotedData = {};
//     pivotKeys.forEach((key) => {
//       pivotedData[key] = _.map(items, key);
//       resultObj[key] = _.map(items, key);
//     });
//     const firstItem = items[0];
//     groupKeys.forEach((key) => {
//       pivotedData[key] = firstItem[key];
//     });

//     return resultObj;
//   });

//   return result;
// }
// const result2 = groupAndPivot(data, ["hoten"], ["madv", "mathuoc"]);
// console.log("result2", result2);



// const groupedData = _.groupBy(data, (item) => `${item.hoten}-${item.sdt}`);
// const result = _.map(groupedData, (items) => {
//   const madvArray = _.map(items, "madv");
//   const mathuocArray = _.map(items, "mathuoc");
//   return {
//     sott: items[0].sott,
//     sdt: items[0].sdt,
//     hoten: items[0].hoten,
//     madv: madvArray,
//     mathuoc: mathuocArray,
//   };
// });
// console.log("sau khi gom :\n", result);