import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState } from "react";
import TableLichHen from "~/components/dentist/TableLichHen";

const DentistPage = () => {
  return (
    <>
      <TableLichHen data={lichhen4} />
    </>
  );
};
export default DentistPage;
