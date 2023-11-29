import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState } from "react";
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
      <div className="bg-gray-400 flex flex-row gap-1 mx-1 my-">
        <h1>{ngay}</h1>
        <br />
        <div>
          {lichhen.map((ca, index) => (
            <Time key={index} time={ca.MACA} status={ca.STATUS} />
          ))}
        </div>
      </div>
    </>
  );
};

const DentistPage = () => {
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

  return (
    <div>
      {dates.map((date, index) => (
        <Days
          key={index}
          ngay={date}
          lichhen={lichhen4.find((d) => d.NGAY === date)?.MACA || []}
        />
      ))}

      {lichhen4.map((day, index) => (
        <Days key={index} ngay={day.NGAY} lichhen={day.MACA} />
      ))}
    </div>
  );
};
export default DentistPage;



/*
import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState } from "react";
import moment from "moment"; // Import thư viện moment để làm việc với ngày tháng

const Time = ({ time, status }) => {
  // ...
};

const Days = ({ ngay, lichhen }) => {
  return (
    <>
      <div className="bg-gray-400 flex flex-row gap-1 mx-1">
        <h1>{ngay}</h1>
        <br />
        <div>
          {lichhen.map((ca, index) => (
            <Time key={index} time={ca.MACA} status={ca.STATUS} />
          ))}
        </div>
      </div>
    </>
  );
};

const DentistPage = () => {
  const today = moment(); // Lấy ngày hiện tại
  const futureDates = []; // Mảng chứa 6 ngày trong tương lai

  for (let i = 0; i < 6; i++) {
    const futureDate = moment(today).add(i, "days").format("D [tháng] M, YYYY");
    futureDates.push(futureDate);
  }

  const lichhenFiltered = lichhen4.filter((item) =>
    futureDates.includes(item.NGAY)
  );

  const missingDates = futureDates.filter(
    (date) => !lichhen4.some((item) => item.NGAY === date)
  );

  const finalData = [
    ...lichhenFiltered,
    ...missingDates.map((date) => ({
      NGAY: date,
      MACA: [],
    })),
  ];

  return (
    <>
      <div className="flex justify-center flex-col bg-red-50 w-[80%] min-h-60 align-middle items-center ">
        <h1 className="text-3xl">Trang dành cho Nha Sĩ</h1>
        <div className="flex">
          {finalData.map((day, index) => (
            <Days key={index} ngay={day.NGAY} lichhen={day.MACA} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DentistPage;



*/