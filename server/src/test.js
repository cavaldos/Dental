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
    sott: "4",
    hoten: "nguyen van b",
    madv: "006",
    mathuoc: "mt003",
  },
];

console.log("data ban dau :\n",data);


const groupedData = _.groupBy(data, (item) => `${item.sott}-${item.sdt}`);

const result = _.map(groupedData, (items) => {
  const madvArray = _.map(items, "madv");
    const mathuocArray = _.map(items, "mathuoc");

  return {
    sott: items[0].sott,
    sdt: items[0].sdt,
    hoten: items[0].hoten,
    madv: madvArray,
    mathuoc: mathuocArray,
  };
});


console.log("sau khi gom :\n", result);
// console.log("gom theo name va sdt :\n", groupedData);

