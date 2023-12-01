import _ from "lodash";
import fs from "fs";

import { lichhen } from "./lhnv.js";

// Hàm kiểm tra và thêm ngày thiếu
function kiemTraVaThemNgayThieu(data) {
  const currentDate = new Date(); // Lấy ngày hiện tại
  const formattedCurrentDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  // Tạo bản sao của data
  const newData = _.cloneDeep(data);

  // Lọc ra danh sách ngày có trong newData
  const existingDates = _.map(newData, "NGAY");

  // Kiểm tra và thêm ngày thiếu
  for (let i = 0; i < 30; i++) {
    const dateToAdd = new Date();
    dateToAdd.setDate(dateToAdd.getDate() + i);
    const formattedDateToAdd = `${dateToAdd.getDate()}-${
      dateToAdd.getMonth() + 1
    }-${dateToAdd.getFullYear()}`;

    if (!existingDates.includes(formattedDateToAdd)) {
      // Ngày chưa tồn tại trong newData, thêm vào danh sách
      newData.push({
        NGAY: formattedDateToAdd,
        MACA: [
          {
            MACA: "CA001",
            STATUS: "empty",
          },
          {
            MACA: "CA002",
            STATUS: "empty",
          },
          {
            MACA: "CA003",
            STATUS: "empty",
          },
          {
            MACA: "CA004",
            STATUS: "empty",
          },
          {
            MACA: "CA005",
            STATUS: "empty",
          },
          {
            MACA: "CA006",
            STATUS: "empty",
          },
        ],
      });
    }
  }

  // Sắp xếp ngày tăng dần trong newData
  const sortedData = _.orderBy(newData, [
    (item) => {
      const [day, month, year] = item.NGAY.split("-");
      return new Date(`${month}-${day}-${year}`);
    },
  ]);

  return sortedData;
}

// Gọi hàm kiểm tra và thêm ngày thiếu
const updatedData = kiemTraVaThemNgayThieu(lichhen);
console.log(updatedData);

function get7DaysFrom(data, fromDate) {
  // Tìm vị trí ngày bắt đầu
  let startIndex;
  data.forEach((item, index) => {
    if (item.NGAY === fromDate) {
      startIndex = index;
    }
  });

  // Khai báo mảng kết quả
  const result = [];

  // Lặp 7 lần để lấy ra 7 ngày tiếp theo
  for (let i = 0; i < 7; i++) {
    if (data[startIndex + i]) {
      result.push(data[startIndex + i]);
    }
  }

  return result;
}

// Cách dùng:
const next7days = get7DaysFrom(updatedData, "1-12-2023");
// console.log(next7days);
function inNgayTrongTuan(ngay) {
  const parts = ngay.split("-");
    console.log(parts);
  // Không cần cộng thêm 1 cho tháng nữa
  const day = parseInt(parts[0], 10);
  console.log(day);
  const month = parseInt(parts[1], 10) ;
  console.log(month);
  const year = parseInt(parts[2], 10);
  console.log(year);



  if (month < 3) {
    month += 12;
    year--;
  }

  const century = Math.floor(year / 100);
    const yearOfCentury = year % 100;

  const h =
    day +
    Math.floor((13 * (month + 1)) / 5) +
    yearOfCentury +
    Math.floor(yearOfCentury / 4) +
    Math.floor(century / 4) +
    5 * century;
    const dayOfWeek = h % 7;
    const dayOfWeekString = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    ][dayOfWeek];
    return dayOfWeekString;

}
// Gọi hàm inNgayTrongTuan với ngày "1-12-2023"
const ngayTrongTuan = inNgayTrongTuan("30-11-2023");

console.log(ngayTrongTuan);
