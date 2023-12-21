import { Button } from "antd";
import React, { useState } from "react";
import { Select, Space, message } from "antd";
import moment from 'moment';

import { TwoStateBlue, StatePink, StateGrey, TwoStateBorder } from "~/components/buttonTwoState";
import { ButtonGreen } from "~/components/button";
import { CloseCircleOutlined } from "@ant-design/icons";
import { lichhen4 } from "../../fakedata/lhnv";

// import { lichhen4 } from "~/components/fakedata/lhnv";

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

const today = new Date('2023-12-17'); 
const result = separateDaysByComparison(today);
const weekdays = selectWeekDays(today);
const weekdays2 = weekdays.map(date => moment(date).format('DD/MM/YYYY'));
console.log('w ', weekdays2);

// Hàm chuyển đổi từ 'YYYY-MM-DD' sang 'DD/MM/YYYY'
function convertDateFormat(dateString) {
  return moment(dateString, 'YYYY-MM-DD').format('DD/MM/YYYY');
}

function findIndexByDate(caMotNgayArray, targetDate) {
  for (let i = 0; i < caMotNgayArray.length; i++) {
    if (caMotNgayArray[i].NGAY === targetDate) {
      return i; // Trả về chỉ số của phần tử nếu tìm thấy
    }
  }

  return -1; // Trả về -1 nếu không tìm thấy
}


const CreateAShift = ({ data, isPassDay, index }) => {
  let shiftContent, caContent;

  if (data != null && index == null) {
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

    if (isPassDay === 1) {
      switch (data.STATUS) {
        case 'waiting':
          shiftContent = <TwoStateBorder text={caContent} />;
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
        default:
          shiftContent = null;
      }
    } else {
      shiftContent = <StateGrey text={caContent} />;
    }

  } else if (index != null) {
    switch (index) {
      case 1:
        caContent = <span>9:00</span>;
        break;
      case 2:
        caContent = <span>11:00</span>;
        break;
      case 3:
        caContent = <span>13:00</span>;
        break;
      case 4:
        caContent = <span>15:00</span>;
        break;
      case 5:
        caContent = <span>17:00</span>;
        break;
      case 6:
        caContent = <span>19:00</span>;
        break;
    }

    shiftContent = <TwoStateBlue text={caContent} />;
  }


  return (
    <div className="mb-3">
      {shiftContent}
    </div>
  );
};

// const mangChuoi = ["chuoi1", "chuoi2", "chuoi3"];
// const chuoiCanTim = "chuoi3";

// const index3 = mangChuoi.indexOf(chuoiCanTim);

// console.log('i: ', index3); // Nếu chuỗi tồn tại, trả về index của nó trong mảng, ngược lại trả về -1


const OneDay = ({ caMotNgay }) => {

  const temp = [
    {MACA: 'CA001', STATUS: ''}, 
    {MACA: 'CA002', STATUS: ''},
    {MACA: 'CA003', STATUS: ''},
    {MACA: 'CA004', STATUS: ''},
    {MACA: 'CA006', STATUS: ''},
    {MACA: 'CA003', STATUS: ''},
  ];

  return (
    <div className="grid grid-cols-6 col-span-2 gap-2 text-center">
      {result[0].map((element, index) => (
        <div key={index}>
          <h5 className="font-montserrat text-md">{element.THU}</h5>
          <div className="font-montserrat text-md mb-5">
            {element.NGAY.slice(0, 5)}
          </div>
          <span>
            {temp.map((shift, index2) => (
              <CreateAShift key={index2} data={shift} isPassDay={0} />
            ))}
          </span>
        </div>
      ))}
      {result[1].map((element, index) => (
        <div key={index}>
          <h5 className="font-montserrat text-md">{element.THU}</h5>
          <div className="font-montserrat text-md mb-5">
            {element.NGAY.slice(0, 5)}
          </div>
          <span>
            {(() => {
              let index3 = findIndexByDate(caMotNgay, element.NGAY);
              if (index3 == -1) {
                let divs = [];
                for (let k = 1; k < 7; k++) {
                  divs.push(
                    <div key={k}>
                      <CreateAShift data={null} isPassDay={1} index={k} />
                    </div>
                  );
                }
                return divs;
              } else {
                return caMotNgay[index3].CA.map((shift, index2) => (
                  <div key={index2}>
                    <CreateAShift data={shift} isPassDay={1} />
                  </div>
                ));
              }
            })()}
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
        <h1 className="text-xl font-montserrat mb-8 text-center">ĐĂNG KÝ LỊCH TRỰC {weekdays2[0]} - {weekdays2[5]}</h1>
        <OneDay caMotNgay={lichhen4}/>
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
