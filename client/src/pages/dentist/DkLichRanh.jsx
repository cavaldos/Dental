import { Button, Calendar, Select } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React, { useState } from "react";
import TableLichHen from "~/components/dentist/TableLichHen";

import { TwoStateBlue, StatePink, StateGrey } from "~/components/buttonTwoState";

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lưu ý: Tháng bắt đầu từ 0
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

function selectWeekDays(date) {
  const week = Array(7).fill(new Date(date)).map((el, idx) =>
    new Date(el.setDate(el.getDate() - el.getDay() + idx)));

  // Lấy từ thứ 2 đến thứ 6
  const weekdays = week.slice(1, 6);
  const formattedWeekdays = weekdays.map(formatDate);
  return formattedWeekdays;
}

const date = new Date();
const formattedWeekdays = selectWeekDays(date);
console.log(formattedWeekdays);

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
