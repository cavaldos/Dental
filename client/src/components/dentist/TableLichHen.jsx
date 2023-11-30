import { Button } from "antd";
import React, { useState } from "react";
import { Select, Space, message } from "antd";

const get7DaysFrom = (data, fromDate) => {
  const dataCopy = data.slice(); 
  let startIndex;
  dataCopy.forEach((item, index) => {
    if (item.NGAY === fromDate) {
      startIndex = index;
    }
  });

  const result = [];
  for (let i = 0; i < 7; i++) {
    if (dataCopy[startIndex + i]) {
      result.push(dataCopy[startIndex + i]);
    }
  }

  return result;
};

const Time = ({ time, status }) => {
  switch (status) {
    case "full":
      return <Button disabled>{time}</Button>;
    case "empty":
      return (
        <Button className="border border-blue-600" type="dashed">
          {time}
        </Button>
      );
    case "waiting":
      return <Button className="bg-blue-500 hover:text-black">{time}</Button>;
    case "ordered":
      return (
        <Button className="" type="primary" danger>
          {time}
        </Button>
      );
    default:
      return <Button className="bg-blue-500">{time}</Button>;
  }
};

const Days = ({ ngay, lichhen }) => {
  return (
    <>
      <div className=" flex flex-col gap-1 mx-1 ">
        <h1 className=" mx-2 mb-5 bg-white rounded-lg  p-2">{ngay}</h1>
        <div className="flex flex-col gap-4 px-4">
          {lichhen.map((ca, index) => (
            <Time key={index} time={ca.MACA} status={ca.STATUS} />
          ))}
        </div>
      </div>
    </>
  );
};

const TableLichHen = ({ data }) => {
  const [day, setDay] = useState(data.map((item) => item.NGAY));
  const [lichhen, setLichHen] = useState(data);

  const handleChange = (value) => {
    message.info(`selected ${value}`);
    setLichHen(get7DaysFrom(data, value));
  };
  return (
    <>
      <div className=" bg-gray-200 rounded-md h-[500px]">
        <h1 className="text-2xl my-4 ml-4">Dang Ki Lich Truc </h1>
        <Select
          defaultValue="Chọn ngày"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={day.map((item) => ({ value: item, label: item }))}
        />
        <div className="  min-w-[800px] max-w-[1200px] p-2 flex justify-center overflow-x-auto ">
          {lichhen.map((day, index) => (
            <Days key={index} ngay={day.NGAY} lichhen={day.MACA} />
          ))}{" "}
        </div>
      </div>
    </>
  );
};

export default TableLichHen;
