import React, { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import dv from "../../fakedata/dv";
import ns from "../../fakedata/nhasi";

const NhaSi = ({ TENNS, MAND }) => {
  const handleOnClick = () => {
    message.success("Processing complete!");
  };
  return (
    <>
      <Button className="p-4 rounded-lg border border-slate-400">
        <h1>{TENNS}</h1>
        <h1>{MAND}</h1>
      </Button>
    </>
  );
};
const DichVu = ({ TENDV, MADV }) => {
  const handleOnClick = () => {
    message.success("Processing complete!");
  };
  return (
    <>
      <Button className="p-4 rounded-lg border border-slate-400">
        <h1>{TENDV}</h1>
        <h1>{MADV}</h1>
      </Button>
    </>
  );
};

const ChonNhaSi = () => {
  const [nhasi, setNhaSi] = useState([]);
  useEffect(() => {
    setNhaSi(ns);
  }, []);

  return (
    <>
      <div className="flex justify-center ">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {nhasi.map((item) => (
            <NhaSi TENNS={item.HOTEN} MAND={item.MANS} />
          ))}
        </div>
      </div>
    </>
  );
};
const ChonDichVu = () => {
  const [dichvu, setDichVu] = useState([]);
  useEffect(() => {
    setDichVu(dv);
  }, []);
  console.log(dichvu);

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {dichvu.map((item) => (
            <DichVu TENDV={item.TENDV} MADV={item.MADV} />
          ))}
        </div>
      </div>
    </>
  );
};

const ChonNgay = () => {
  return (
    <>
      <div className="flex justify-center">
        <h1>Cho nay se hien thi lich cua nha si</h1>
      </div>
    </>
  );
};
const ChonGio = () => {
  return (
    <>
      <div className="flex justify-center">
        <h1>Cho nay se hien thi lich cua nha si</h1>
      </div>
    </>
  );
};
const XacNhan = () => {
  return (
    <>
      <div className="flex justify-center">
        <h1>
          chỗ này m sẽ code 1 cái from hiển thị lại những thông tin đã chọn và
          chuẩn bị gửi về data base
        </h1>
        <h1>nha si</h1>
        <h1>dich vu</h1>
        <h1>ngay</h1>
        <h1>gio</h1>
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
