import React, { memo } from "react";
import { message } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import WorkSchedule from "~/components/dentist/OwnWorkSchedule";
import { useNavigate } from "react-router-dom";
import { ButtonGreen, ButtonBorderGreen } from "../../components/button";

function mergeStringDateTime(gioBatDau, ngay) {
  const gioBatDauMoi = gioBatDau.slice(0, 5);

  return `${ngay} - ${gioBatDauMoi} `;
}


const ThongTinLichHen = memo(({ props }) => {
  // const { thoigian, sdt, hoten, ly_do_kham } = props;
  console.log(props);
  const navigate = useNavigate();
  const HandleBenhAnCu = (sdt) => {
    navigate(`/xem-benh-an-cu/${sdt}`);
    message.success("Đã chuyển đến trang xem bệnh án cũ", 5);
  };
  const handleTaoBenhAn = async (sdt) => {
    navigate(`/tao-benh-an-moi/${sdt}`);
    message.success(
      `Đã chuyển đến trang tạo bệnh án mới cho khách hàng có số điện thoại ${sdt}`,
      5
    );
  };

  const dateTime = mergeStringDateTime(props.GIOBATDAU, props.NGAY);

  return (
    <>
      <div className="bg-white w-[440px] h-[608px] rounded-3xl mx-2 py-4 px-8 grid grid-rows-[1fr auto]">
        <div>
          <h1 className="text-2xl font-montserrat mt-2 mb-6 text-center">THÔNG TIN LỊCH HẸN</h1>
          <div>
            <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
              <span className="text-grey">Ngày, giờ: </span>
              {dateTime}
            </p>
            <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
              <span className="text-grey">Số điện thoại: </span>
              {props.SODTKH}
            </p>
            <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
              <span className="text-grey">Họ tên: </span>
              {props.HOTENKH}
            </p>
            <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
              <span className="text-grey">Lý do khám: </span>
            </p>
            <p className="leading-7 font-montserrat font-semibold text-base text-#4B4B4B">
            {props.LYDOKHAM}
            </p>
          </div>
        </div>
        <div className="justify-self-end self-end flex justify-center items-center gap-5">
          <ButtonBorderGreen
            text="Bệnh án cũ"
            func={() => HandleBenhAnCu("123456789")}
          />
          <ButtonGreen
            text="Tạo bệnh án mới"
            func={() => HandleBenhAnCu("123456789")}
          />
        </div>
      </div>
    </>
  );
});

const XemLichTruc = () => {
  const data = {
    NGAY: "20/12/2023",
    MACA: "CA002",
    GIOBATDAU: "11:00:00",
    GIOKETTHUC: "13:00:00",
    STATUS: "ordered",
    SODTKH: "0323456789",
    HOTENKH: "Lê Thị Thu Hà",
    SOTTLH: 1,
    LYDOKHAM:
      "Đau rát răng và nướu: Tôi đã cảm thấy đau rát và sưng nướu ở chiếc răng ở phía dưới bên trái trong vài ngày qua. Đau đớn khi chải răng và ăn.",
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <WorkSchedule data={lichhen4} />
          {data !== null ? (
            <ThongTinLichHen props={data || []} />
          ) : (
            <div className="bg-white w-[400px] h-fit rounded-3xl mx-2 py-4 px-8">
                <Empty />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default XemLichTruc;
