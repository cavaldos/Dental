import { poolConnect } from "./config/connectDB.js";
import groupAndTable from "./utils/lodash.js";
import _ from "lodash";


poolConnect();
poolConnect("admin");
poolConnect("staff");
poolConnect("dentist");
poolConnect("guest");
poolConnect("online");


import { load, add, del, patch, getTables } from "./models/index.js";

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
// save(result, "lh_nv1.json");

export default function test() {
  console.log("test function");
}
