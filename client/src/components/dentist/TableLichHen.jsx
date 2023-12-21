import { Button } from "antd";
import React, { useState } from "react";
import { Select, Space, message } from "antd";
import moment from 'moment';

import { TwoStateBlue, StatePink, StateGrey, TwoStateBorder } from "~/components/buttonTwoState";
import { ButtonGreen } from "~/components/button";
import { CloseCircleOutlined } from "@ant-design/icons";

function compareDates(dateA, dateB) {
  const date1 = new Date(dateA);
  const date2 = new Date(dateB);

  if (date1.getTime() === date2.getTime()) {
    return 0; // A = B
  } else if (date1.getTime() < date2.getTime()) {
    return -1; // A < B
  } else {
    return 1; // B > A
  }
  // Note hàm getTime() chuyển thành ký tự số theo mili giây tính từ 1/1/1970
}

function selectWeekDays(date) {
  const week = Array(7).fill(new Date(date)).map((el, idx) =>
    new Date(el.setDate(el.getDate() - el.getDay() + idx)));

  // Lấy từ thứ 2 đến thứ 6
  const weekdays = week.slice(1, 7);
  return weekdays;
}

function separateDaysByComparison(date) {
  const weekdays = selectWeekDays(date);
  const dayNow = moment(date).format('YYYY-MM-DD');

  const pastDays = [];
  const futureDays = [];
  const weekDayNames = ['THỨ HAI', 'THỨ BA', 'THỨ TƯ', 
                        'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
  let temp;

  weekdays.forEach((day, index) => {
    const formattedDay = moment(day).format('YYYY-MM-DD');
    if (moment(formattedDay, 'YYYY-MM-DD', true).isValid() && compareDates(formattedDay, dayNow) <= 0) {
      temp = convertDateFormat(formattedDay);
      pastDays.push({ THU: weekDayNames[index], NGAY: temp });
    } else {
      temp = convertDateFormat(formattedDay);
      futureDays.push({ THU: weekDayNames[index], NGAY: temp });
    }
  });

  return [pastDays, futureDays];
}

const today = new Date(); 
const result = separateDaysByComparison(today);
console.log('re ', result);

// Hàm chuyển đổi từ 'YYYY-MM-DD' sang 'DD/MM/YYYY'
function convertDateFormat(dateString) {
  return moment(dateString, 'YYYY-MM-DD').format('DD/MM/YYYY');
}

const CreateAShift = ({ data, isPassDay }) => {
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

  {isPassDay === 1 ? (
    (() => {
      switch (data.LOAI) {
        case 'waiting':
          shiftContent = <TwoStateBorder text={caContent}/>;
          break;
        case 'ordered':
          shiftContent = <StatePink text={caContent} />;
          break;
        case 'full':
          shiftContent = <StateGrey text={caContent} />;
          break;
        case 'empty':
          shiftContent = <TwoStateBlue text={caContent} />;
          break;
      }
    })()
  ) : (
    shiftContent = <StateGrey text={caContent} />
  )};
  
  

  return (
    <div className="mb-3">
      {shiftContent}
    </div>
  );
};


const OneDay = () => {
  

  const temp = [
    {MACA: 'CA001', LOAI: 'full'}, 
    {MACA: 'CA002', LOAI: 'empty'},
    {MACA: 'CA003', LOAI: 'waiting'},
    {MACA: 'CA004', LOAI: 'full'},
    {MACA: 'CA006', LOAI: 'ordered'},
    {MACA: 'CA003', LOAI: 'waiting'},
  ];
  
  return (
    <div className="grid grid-cols-6 col-span-2 gap-2 text-center">
      {result[0].map((element, index) => (
        <div key={index}> 
          <h5 className="font-montserrat text-md">{element.THU}</h5>
          <div className="font-montserrat text-md mb-5">
          {element.NGAY.slice(0, 5)}</div>
          <span>
            {temp.map((shift, index2) => (
              <CreateAShift data={shift} isPassDay={0}/>
            ))}
          </span>
        </div>
      ))}
      {result[1].map((element, index) => (
        <div key={index}> 
          <h5 className="font-montserrat text-md">{element.THU}</h5>
          <div className="font-montserrat text-md mb-5">
          {element.NGAY.slice(0, 5)}</div>
          <span>
            {temp.map((shift, index2) => (
              <div key={index2}> 
                <CreateAShift data={shift} isPassDay={1}/>
              </div>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};

const TableLichHen = ({ data }) => {
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

export default TableLichHen;
