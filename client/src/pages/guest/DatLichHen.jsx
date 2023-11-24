import React, { useState } from "react";
import { Button, message, Steps } from "antd";

const datlich = {
  nhasi: "",
  dichvu: "",
  ngay: "",
  gio: "",
};

const ChonNhaSi = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 1
          </div>
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 2
          </div>
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 3
          </div>
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 4
          </div>
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 5
          </div>
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 6
          </div>
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 7
          </div>
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 8
          </div>
          <div className="bg-gray-200 w-[150px] h-20 flex justify-center">
            Nha Si 9
          </div>
        </div>
      </div>
    </>
  );
};
const ChonDichVu = () => {
  return (
    <>
      <div className="flex justify-center">
        <Button
          className="bg-blue-500"
          type="primary"
          onClick={() => message.success("Processing complete!")}
        >
          Chọn Dịch Vụ
        </Button>
      </div>
    </>
  );
};

const ChonNgay = () => {
  return (
    <>
      <div className="flex justify-center">
        <Button
          className="bg-blue-500"
          type="primary"
          onClick={() => message.success("Processing complete!")}
        >
          Chọn Ngày
        </Button>
      </div>
    </>
  );
};
const ChonGio = () => {
  return (
    <>
      <div className="flex justify-center">
        <Button
          className="bg-blue-500"
          type="primary"
          onClick={() => message.success("Processing complete!")}
        >
          Chọn Giờ
        </Button>
      </div>
    </>
  );
};
const XacNhan = () => {
  return (
    <>
      <div className="flex justify-center">
        <Button
          className="bg-blue-500"
          type="primary"
          onClick={() => message.success("Processing complete!")}
        >
          Xác Nhận
        </Button>
      </div>
    </>
  );
};
const steps = [
  {
    title: "Chọn Nha Sĩ",
    content: <ChonNhaSi />,
  },
  {
    title: "Chọn dịch vụ",
    content: <ChonDichVu />,
  },
  {
    title: "Chọn Ngày",
    content: <ChonNgay />,
  },
  {
    title: "Chọn Giờ",
    content: <ChonGio />,
  },
  {
    title: "Xác nhận",
    content: <XacNhan />,
  },
];
const DatLichContainer = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    content: item.content,
  }));

  return (
    <>
      <Steps current={current} items={items} />
      <div className=" min-h-[300px] bg-slate-300 mt-4 p-4 rounded-lg border border-slate-400">
        {steps[current].content}
      </div>
      <div className="flex justify-center mt-6">
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button className="bg-blue-500" type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            className="bg-green-600 ml-2"
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

const DatLichHen = () => {
  return (
    <>
      <div className="">
        <h1 className="mx-auto mb-5">Đặt lịch hẹn</h1>
        <DatLichContainer />
      </div>
    </>
  );
};
export default DatLichHen;
