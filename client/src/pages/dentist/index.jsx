import { Button, Calendar, Select } from "antd";
import HoSoBenh from "~/components/HoSoBenh";
import React, { useState } from "react";

const DentistPage = () => {
  return (
    <>
      <div className="flex flex-col">
        <h1>Day la trang nha si</h1>
        <div className="bg-red-400 w-[500px] h-[600px]]">
          <HoSoBenh sdt={"56345665"} />
        </div>
      </div>
    </>
  );
};
export default DentistPage;
