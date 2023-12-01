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
          <div className="bg-red-200">viet may cai quy tac o day</div>
          <div className="ml-auto">
            <Button>sadf</Button>
            <Button>sdafsdf</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DangKiLichRanh;
