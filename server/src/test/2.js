import { lichhen3 } from "./lhnv.js";
import _ from "lodash";

function formatDate(isoDate) {
  const date = new Date(Date.parse(isoDate));
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
const result = _.chain(lichhen3)

  .groupBy("NGAY")

  .map((lichhens, ngay) => {
    const caList = ["CA001", "CA002", "CA003", "CA004", "CA005", "CA006"];
    const dailyCa = _.uniqBy(lichhens, "MACA").map((ca) => ca.MACA);
    const missingCa = _.difference(caList, dailyCa);
    const emptyCa = _.map(missingCa, (ca) => ({
      MACA: ca,
      STATUS: "empty",
    }));

    const filledCa = dailyCa.map((ca) => {
      const items = _.filter(lichhens, { MACA: ca });
      const hotens = _.uniqBy(items, "HOTEN");
      let status = "empty";
      if (hotens.length > 2) {
        status = "full";
      } else if (_.some(items, { SODT: null })) {
        status = "watting";
      } else if (!_.some(items, { SODT: null })) {
        status = "ordered";
      }
      return {
        MACA: ca,
        STATUS: status,
      };
    });
    return {
      NGAY: formatDate(ngay),
      MACA: [...filledCa, ...emptyCa],
    };
  })
  .value();

// toi muon viet 1 ham fillter lay ra 1 mang danh sach cac ngay
const ngay = result.map((result) => result.NGAY);
console.log(ngay);

   




// console.log(result);
import fs from "fs";
const save = (data, name) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile(name, jsonData, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data written to file");
    }
  });
};
save(result, "data.json");
