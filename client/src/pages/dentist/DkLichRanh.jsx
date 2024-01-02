import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState, useEffect } from "react";
import TableLichHen from "~/components/dentist/TableLichHen";
import DentistService from "../../services/dentist";
import { useSelector } from "react-redux";

const DangKiLichRanh = () => {
  const [lichhen, setLichHen] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    DentistService.xemTableLichNS(user.MANS).then((res) => {
      setLichHen(res || []);
    });
  }, []);
  return (
    <>
      <div className="">
        <TableLichHen data={lichhen4} />
      </div>
    </>
  );
};
export default DangKiLichRanh;