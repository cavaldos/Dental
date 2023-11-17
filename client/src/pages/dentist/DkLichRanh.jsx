
import React from "react";
import { Table, Button, Tag } from "antd";
// import "antd/dist/antd.css";
import lichranh from "~/fakedata/lichranh"

const LichRanhComponent = () => {
  const formatDateString = (dateString) => {
    const daysOfWeek = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];

    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${dayOfWeek}, ${day} Tháng ${month} ${year}`;
  };
  const columns = [
    {
      title: "Ngày",
      dataIndex: "NGAY",
      key: "NGAY",
      render: (text) => formatDateString(text),
    },
    {
      title: "Ca",
      render: (_, lich) => (
        <>
          {[1, 2, 3, 4, 5, 6].map((ca) => (
            <Button
              key={ca}
              style={{ margin: "4px" }}
              size="small"
              type={lich.MACA.includes(`CA00${ca}`) ? "default" : "danger"}
            >
              {`CA00${ca}`}
            </Button>
          ))}
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={lichranh}
      rowKey={(lich, index) => index}
      pagination={false}
    />
  );
};


const Day = () => {
  return (
    <>
      <div className="bg-slate-500 h-[45vh] w-[140px] justify-center flex flex-col ">
        <Button className="bg-green-600 h-12 mx-2 mb-4 rounded-lg" type="primary">
          1
        </Button>
        <Button className="bg-green-600 h-12 mx-2 mb-4 rounded-lg" type="primary">
          1
        </Button>
        <Button className="bg-green-600 h-12 mx-2 mb-4 rounded-lg" type="primary">
          1
        </Button>
        <Button className="bg-green-600 h-12 mx-2 mb-4 rounded-lg" type="primary">
          1
        </Button>
        <Button className="bg-green-600 h-12 mx-2 mb-4 rounded-lg" type="primary">
          1
        </Button>
        <Button className="bg-green-600 h-12 mx-2 mb-4 rounded-lg" type="primary">
          1
        </Button>
      </div>
    </>
  );
};

const DangKiLichRanh = () => {
  return (
    <div className="bg-[rgb(255,254,254)] w-[55vw] h-[80vh] p-2 rounded-md flex flex-col">
      <div className="h-[80px] bg-red-200 mb-10"> title</div>
      <div className=" h-full flex flex-row justify-between px-14">
      
      <LichRanhComponent/>
      </div>
      <div className=" bg-slate-500 mt-auto">dsf</div>
    </div>
  );
};
export default DangKiLichRanh;
