import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState } from "react";
import TableLichHen from "~/components/dentist/TableLichHen";

import { TwoStateBlue, StatePink, StateGrey } from "~/components/buttonTwoState";

const DangKiLichRanh = () => {
  return (
    <>
      <div className="">
        <TableLichHen data={lichhen4} />
        
      </div>
    </>
  );
};
export default DangKiLichRanh;