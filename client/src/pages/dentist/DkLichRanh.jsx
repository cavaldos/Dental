import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useEffect, useState } from "react";
import TableLichHen from "~/components/dentist/TableLichHen";

import {
  TwoStateBlue,
  StatePink,
  StateGrey,
} from "~/components/buttonTwoState";
import DentistService from "../../services/dentist";
const DangKiLichRanh = () => {
  const [lichHen, setLichHen] = useState([]);

  useEffect(() => {
    DentistService.xemTableLichNS("NS001").then((res) => {
      setLichHen(res);
    });
  }, []);

  return (
    <>
      <div className="">
        sdafdasdfasd
        <TableLichHen data={lichHen} />
      </div>
    </>
  );
};
export default DangKiLichRanh;
