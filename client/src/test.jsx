import axios from "axios";
import { useEffect, useState } from "react";
import Axios from "~/services/Axios";
const Test = () => {
  const [data, setData] = useState([]);

  //   có 2 cách gọi data là dùng axios thông thường hoặc dùng Axios (cái này là config)
  useEffect(() => {
    // cach 1 ưu điểm là ko gắn token vào header
    const getDataconfig = async () => {
      const res = await Axios.get("products/");
      //   console.log("res 1", res); // cái  res này là data trả về
      return res;
    };
    getDataconfig();

    // cach 2 nếu có token thì phải gắn vào header
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/khachhang/getAllCa");
      console.log("res 2", res.data); // cái  này phải .data mới có data trả về
    };
    getData();
  }, []);

  return <></>;
};
export default Test;
