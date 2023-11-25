import groupAndTable from "./utils/lodash.js";
import _ from "lodash";
import {
  load,
  add,
  del,
  patch,
  getTables,
  disconnect,
} from "./models/index.js";

const result = await load(`SELECT MANS FROM dbo.NhaSi`, "dentist");
const result2 = await load(`SELECT MANS FROM dbo.NhaSi`, "dentist");
const result3 = await load(`SELECT MANS FROM dbo .NhaSi`, "staff");
const result4 = await load(`SELECT MANS FROM dbo.NhaSi`, "dentist");
const result5 = await disconnect("dentist");

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
// save(result, "lh_nv1.json");

export default function test() {
  console.log("test function");
}
