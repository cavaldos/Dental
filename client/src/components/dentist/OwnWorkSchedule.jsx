import { Button } from "antd";
import React, { useState } from "react";
import { Select, Space, message } from "antd";
import moment from 'moment';

import { TwoStateBlue, StatePink, StateGrey } from "~/components/buttonTwoState";
import { ButtonGreen } from "~/components/button";
import { CloseCircleOutlined } from "@ant-design/icons";

function selectWeekDays(date) {
  const week = Array(7).fill(new Date(date)).map((el, idx) =>
    new Date(el.setDate(el.getDate() - el.getDay() + idx)));

  // Lấy từ thứ 2 đến thứ 6
  const weekdays = week.slice(1, 7);
  return weekdays;
}

const dateNow = new Date();
const formattedWeekdays = selectWeekDays(dateNow);

const CreateAShift = ({ data }) => {
  let shiftContent, caContent;

  switch (data.MACA) {
    case "CA001":
      caContent = <span>9:00</span>;
      break;
    case "CA002":
      caContent = <span>11:00</span>;
      break;
    case "CA003":
      caContent = <span>13:00</span>;
      break;
    case "CA004":
      caContent = <span>15:00</span>;
      break;
    case "CA005":
      caContent = <span>17:00</span>;
      break;
    case "CA006":
      caContent = <span>19:00</span>;
      break;
  }

  switch (data.LOAI) {
    case 0:
      shiftContent = <TwoStateBlue text={caContent} />;
      break;
    case 1:
      shiftContent = <StatePink text={caContent} />;
      break;
    case 2:
      shiftContent = <StateGrey text={caContent} />;
      break;
    default:
      shiftContent = null; 
  }

  return (
    <div className="mb-3">
      {shiftContent}
    </div>
  );
};


const OneDay = () => {
  const weekDayNames = ['THỨ HAI', 'THỨ BA', 'THỨ TƯ', 
                        'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];

  const temp = [
    {MACA: 'CA001', LOAI: 2}, 
    {MACA: 'CA002', LOAI: 0},
    {MACA: 'CA003', LOAI: 0},
    {MACA: 'CA004', LOAI: 2},
    {MACA: 'CA006', LOAI: 1},
    {MACA: 'CA003', LOAI: 0},
  ];
  

  return (
    <div className="grid grid-cols-6 col-span-2 gap-2 text-center">
      {formattedWeekdays.map((date, index) => (
        <div key={index}> 
          <h5 className="font-montserrat text-md">{weekDayNames[index]}</h5>
          <div className="font-montserrat text-md mb-5">
          {moment(date).format('DD/MM')}</div>
          <span>
            {temp.map((shift, index2) => (
              <CreateAShift data={shift}/>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};

const WorkSchedule = ({ data }) => {
  const [day, setDay] = useState(data.map((item) => item.NGAY));
  const [lichhen, setLichHen] = useState(data);

  const handleChange = (value) => {
    message.info(`selected ${value}`);
    setLichHen(get7DaysFrom(data, value));
  };
  return (
    <>
      <div className=" bg-white rounded-2xl h-fit w-[1030px] mx-2 py-8 px-12">
        <h1 className="text-2xl font-montserrat mb-8 text-center">ĐĂNG KÝ LỊCH TRỰC </h1>
        <OneDay/>
        <div className="mt-9 grid grid-cols-2 gap-0">
          {/* left */}
          <div className="col-span-1">
            <div className="flex my-3">
              <div className="bg-white border-3 border-[#A1A1A1] w-[29px] h-[29px] rounded-lg"></div>
              <div className="font-montserrat ml-3"> Đã đủ số lượng nha sĩ trực ca</div>
            </div>
            <div className="flex my-3">
              <div className="bg-white border-3 border-blue border-dashed w-[29px] h-[29px] rounded-lg"></div>
              <div className="font-montserrat ml-3"> Ca trực có thể chọn</div>
            </div>
            <div className="flex my-3">
              <div className="bg-blue border-3 border-blue w-[29px] h-[29px] rounded-lg"></div>
              <div className="font-montserrat ml-3"> Ca trực đang chọn</div>
            </div>
            <div className="flex my-3">
              <div className="bg-pinkk border-3 border-pinkk w-[29px] h-[29px] rounded-lg"></div>
              <div className="font-montserrat ml-3"> Khách hàng đã đặt lịch này</div>
            </div>
          </div>
          {/* right */}
          <div className="col-span-1 justify-self-end self-end">
            <Button className="mr-3 font-montserrat text-[#737777] font-bold text-base shadow-none border-none"><CloseCircleOutlined/> HOÀN TÁC</Button>
            <ButtonGreen text="ĐĂNG KÝ" className="w-[150px] rounded-2xl"/>
          </div>
        </div>

      </div>
    </>
  );
};

export default WorkSchedule;
