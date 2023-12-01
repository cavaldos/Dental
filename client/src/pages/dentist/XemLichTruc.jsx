import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState, useEffect } from "react";
import TableLichHen from "~/components/dentist/TableLichHen";

const ThongTinLichHen = (props) => {
  const { thoigian, sdt, hoten, ly_do_kham } = props;
  return (
    <>
      <h1>sdfsdaf</h1>
    </>
  );
};
const HosoBenhCu = (props) => {
  const { sott, ngaykham, dando } = props;
  return (
    <>
      <div className="flex flex-col">
        <div>
          <TableLichHen data={lichhen4} />
          <ThongTinLichHen />
        </div>
        <div className="">sdf</div>
      </div>
    </>
  );
};

const TaoBenhAnMoi = () => {
  return (
    <>
      <div className="flex flex-col">sfdadf</div>
    </>
  );
};
const XemLichTruc = () => {
  return (
    <>
      <div className="flex flex-col">
        <div>
          <TableLichHen data={lichhen4} />
          <ThongTinLichHen />
        </div>
        <div className="">
          <TaoBenhAnMoi />
          <HosoBenhCu />
        </div>
      </div>
    </>
  );
};
export default XemLichTruc;
