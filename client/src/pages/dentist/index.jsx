import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState } from "react";

const defaultTime = {
  MACA: [
    {
      MACA: "CA001",
      STATUS: "empty",
    },
    {
      MACA: "CA002",
      STATUS: "empty",
    },
    {
      MACA: "CA003",
      STATUS: "empty",
    },
    {
      MACA: "CA004",
      STATUS: "empty",
    },
    {
      MACA: "CA005",
      STATUS: "empty",
    },
    {
      MACA: "CA006",
      STATUS: "empty",
    },
  ],
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

const LichHenComponent = () => {
  const [dates, setDates] = useState([]);
  React.useEffect(() => {
    const today = new Date().toLocaleDateString("vi-VN");

    const futureDates = [];
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      futureDates.push(date.toLocaleDateString("vi-VN"));
    }

    setDates([today, ...futureDates]);
  }, []);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // Tháng bắt đầu từ 0
  const currentDay = now.getDate();
  console.log(`${currentDay}-${currentMonth}-${currentYear}`);

  return (
    <>
      <div className=" bg-gray-200 rounded-md h-[500px]">
        <h1 className="text-2xl my-4 ml-4">Dang Ki Lich Truc </h1>
        <div className="  min-w-[800px] p-2 flex   ">
          {lichhen4.map((day, index) => (
            <Days key={index} ngay={day.NGAY} lichhen={day.MACA} />
          ))}
        </div>
      </div>
    </>
  );
};

const DentistPage = () => {
  return (
    <>
      <LichHenComponent />
    </>
  );
};
export default DentistPage;
