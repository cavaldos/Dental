import { Button, Calendar, Select, message } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState, useEffect } from "react";
import TableLichHen from "~/components/dentist/TableLichHen";
import HoSoBenh from "~/components/dentist/HoSoBenh";
import { useNavigate } from "react-router-dom";
const ThongTinLichHen = ({ props }) => {
  // const { thoigian, sdt, hoten, ly_do_kham } = props;
  console.log(props);
  const navigate = useNavigate();
  const HandleBenhAnCu = () => {
    message.success("Đã chuyển đến trang xem bệnh án cũ", 5);
  };
  const handleTaoBenhAn = async (sdt) => {
    await navigate(`/tao-benh-an-moi/${sdt}`);
    await message.success(
      `Đã chuyển đến trang tạo bệnh án mới cho khách hàng có số điện thoại ${sdt}`,
      5
    );
  };
  return (
    <>
      <div className="bg-gray-200 min-h-[400px] min-w-[350px] rounded-lg p-2 flex  flex-col">
        <h1 className="text-2xl">Thông tin lịch hẹn</h1>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-row gap-2">
            <div className="font-bold  text-gray-400">Thời gian:</div>
            <p className="break-word">{"fadsfa"}</p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-bold  text-gray-400">Số điện thoại:</div>
            <p className="break-word">{"sdt"}</p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-bold  text-gray-400">Họ tên:</div>
            <p className="break-word">{"hoten"}</p>
          </div>
          <div className="flex gap-2 max-w-[350px] flex-col">
            <div className="font-bold   text-gray-400">Lý do khám:</div>
            <p
              className="break-word max-w-[300px]"
              style={{ wordWrap: "break-word" }}
            >
              {"Uyen chinh lai mau cho  nay nha"}
            </p>
          </div>
        </div>
        <div className=" mt-auto h-[50px] flex justify-center items-center gap-12">
          <Button
            className="  text-grin border border-grin h"
            onClick={HandleBenhAnCu}
          >
            Benh an cu
          </Button>
          <Button
            type="primary"
            className=" bg-grin hover:bg-green-700"
            onClick={() => handleTaoBenhAn("123456789")}
          >
            Them benh an
          </Button>
        </div>
      </div>
    </>
  );
};

const XemLichTruc = () => {
  const data = {
    thoigian: "12:00",
    sdt: "123456789",
    hoten: "Nguyen Van A",
    ly_do_kham: "Uyen chinh lai mau cho  nay nha",
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-4">
          <TableLichHen data={lichhen4} />
          <ThongTinLichHen props={data} />
        </div>
        <div className=" border border-spacing-1 mt-3 rounded-lg p-1">
          <HoSoBenh />
        </div>
      </div>
    </>
  );
};
export default XemLichTruc;
