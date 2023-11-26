import "../../assets/styles/test.css";
import Headersdfdsfadsf from "../../components/header/nav";
import { useEffect, useState } from "react";
import Axios from "~/services/Axios";

const Test = ({ number, name }) => {
  return (
    <div className="flex justify-center bg-slate-50 h-60 align-middle items-center ">
      <h1 className="text-3xl">{number} </h1>
    </div>
  );
};

const StaffPage = () => {
  const [number, setNumber] = useState(16);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDataconfig = async () => {
      const res = await Axios.get("products/");
      setData(res)
    };
    getDataconfig();
  }, []);
  console.log("data", data);

  return (
    <div className=" khanh flex justify-center bg-slate-50 h-60 align-middle items-center ">
      {data.map((item, index) => (
        <Test key={index} number={item.id} />
      ))}
    </div>
  );
};

export default StaffPage;
