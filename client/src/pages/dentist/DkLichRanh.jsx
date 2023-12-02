import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState } from "react";
import TableLichHen from "~/components/dentist/TableLichHen";

const DangKiLichRanh = () => {
  return (
    <>
      <div className="">
        <TableLichHen data={lichhen4} />
        <div className="flex bg-blue-400">
          <div className=" h-[150px] w-[200px] flex flex-col gap-1">
            <div className=" flex  items-center  gap-4">
              <Button className="bg-red-300" type="primary" loading />
              <p>sdafsdf</p>
            </div>
            <div className=" flex  items-center  gap-4">
              <Button className="bg-red-300" type="primary" loading />
              <p>sdafsdf</p>
            </div>{" "}
            <div className=" flex  items-center  gap-4">
              <Button className="bg-red-300" type="primary" loading />
              <p>sdafsdf</p>
            </div>{" "}
            <div className=" flex  items-center  gap-4">
              <Button className="bg-red-300" type="primary" loading />
              <p>sdafsdf</p>
            </div>
          </div>
          <div className="ml-auto w-[300px] flex justify-center items-center gap-4">
            <Button>Hoan  Tac</Button>
            <Button>Dang Ki</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DangKiLichRanh;
