import React, { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import { Input } from "antd";
const { TextArea } = Input;
import GuestService from "../../services/guest";
import { useDispatch, useSelector } from "react-redux";
import { booking, deleteOder } from "../../redux/features/orderSlice";
import Buttons from "../../components/button";
import { ButtonBlue } from "../../components/button";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const NhaSi = ({ TENNS, MAND }) => {
  const dispath = useDispatch();
  const handleOnClick = () => {
    dispath(booking({ mans: MAND, tenns: TENNS }));
    message.success(`Đã chọn nha sĩ ${TENNS}`);
  };
  return (
    <>
      <button
        style={{
          transition: "all 0.4s ",
        }}
        onClick={() => handleOnClick()}
        className="p-4 border hover:border-[#86b6f8] hover:text-[17px] border-slate-400 h-16 min-w-[220px] rounded-sm hover:bg-slate-200  "
      >
        <h1>{TENNS}</h1>
      </button>
    </>
  );
};

const Ca = ({ GIOBD, GIOKT, NGAY, SOTT }) => {
  const dispath = useDispatch();
  const handleOnClick = (sott) => {
    dispath(
      booking({ sott: sott, GIOBATDAU: GIOBD, GIOKETTHUC: GIOKT, NGAY: NGAY })
    );
    message.success(`Đã chọn ca bắt đầu lúc ${GIOBD} ngày ${NGAY}`, 4);
  };

  return (
    <>
      <button
        onClick={() => handleOnClick(SOTT)}
        className="p-2 border
         border-slate-400 min-h-16
          min-w-[20px] rounded-sm  
         hover:bg-slate-200 
         hover:border-[#86b6f8]
            "
      >
        <div className="flex flex-col text-gray-400">
          <div className="flex gap-3 mb-3">
            Ngày : <h1 className="ml-auto text-black">{NGAY}</h1>
          </div>
          <div className="flex gap-3 ">
            Bắt đầu : <h1 className="ml-auto text-black">{GIOBD}</h1>
          </div>{" "}
          <div className="flex gap-3 ">
            Kết thúc : <h1 className="ml-auto text-black">{GIOKT}</h1>
          </div>
        </div>
      </button>
    </>
  );
};

const ChonNhaSi = () => {
  const [nhasi, setNhaSi] = useState([]);
  useEffect(() => {
    GuestService.getAllDSNS().then((res) => {
      setNhaSi(res);
    });
  }, []);
  return (
    <>
      <div className="flex justify-center ">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          <NhaSi TENNS="Nha Si Bất Kỳ" MAND="" />
          {nhasi?.map((item, index) => (
            <NhaSi key={index} TENNS={item.HOTEN} MAND={item.MANS} />
          ))}
        </div>
      </div>
    </>
  );
};

const ChonCa = () => {
  const order = useSelector((state) => state.order);
  const [lichRanh, setLichRanh] = useState([]);
  function formatTime(inputDate) {
    const date = new Date(inputDate);
    const hours = date.getUTCHours().toString().padStart(2, "0"); // Lấy giờ theo múi giờ UTC
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (order.mans === "") {
      GuestService.xemLRChuaDatTatCaNSTheoNgay().then((res) => {
        console.log("mang ban dau",res);
        const output = [];
        res.forEach((day) => {
          day.CA.forEach((shift) => {
            shift.NHASI.forEach((nurse) => {
              console.log(nurse);
              output.push({
                MANS: shift.MANS,
                SOTT: nurse.SOTTLH || 0,
                MACA: shift.MACA,
                NGAY: day.NGAY,
                GIOBATDAU: shift.GIOBATDAU,
                GIOKETTHUC: shift.GIOKETTHUC,
              });
            });
          });
        });
        setLichRanh(
          output.map((item) => ({
            ...item,
            GIOBATDAU: item.GIOBATDAU,
            GIOKETTHUC: item.GIOKETTHUC,
          }))
        );
      });
      console.log("mang sau khi set",lichRanh);
    } else {
      GuestService.lichRanh().then((res) => {
        const new_lichRanh = res.filter((item) => {
          return item.MANS === order.mans;
        });
        const new_lichRanhformat = new_lichRanh.map((item) => {
          return {
            ...item,
            NGAY: formatDate(new Date(item.NGAY)),
            GIOBATDAU: formatTime(new Date(item.GIOBATDAU)),
            GIOKETTHUC: formatTime(new Date(item.GIOKETTHUC)),
          };
        });
        setLichRanh(new_lichRanhformat);
      });
    }
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className=" grid grid-cols-3 grid-rows-3 gap-4">
          {lichRanh?.map((item, index) => (
            <Ca
              key={index}
              NGAY={item.NGAY}
              GIOBD={item.GIOBATDAU}
              GIOKT={item.GIOKETTHUC}
              MANS={item.MANS}
              SOTT={item.SOTT}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const LyDoKham = () => {
  const [lydokham, setLyDoKham] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const timeoutRef = React.useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (lydokham !== "") {
      setIsLoading(true);

      timeoutRef.current = setTimeout(() => {
        dispatch(booking({ lydokham: lydokham, sodt: user.SODT }));
        setIsLoading(false);
      }, 2000);
    }
  }, [lydokham, dispatch, user.SODT]);

  return (
    <>
      <div className=" flex justify-center mb-3">
        <h1 className=" ">Xin vui lòng nhập lý do khám</h1>
        {isLoading ? (
          <Spin
            indicator={
              <LoadingOutlined className="text-sm ml-3 text-gray-600" spin />
            }
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-center">
        <div className="w-[60%]">
          <TextArea
            className="w-full"
            rows={4}
            value={lydokham}
            onChange={(e) => setLyDoKham(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

const XacNhan = () => {
  const order = useSelector((state) => state.order);
  return (
    <>
      <div class="flex justify-center flex-col text-neutral-900">
        <div class="mx-auto  w-[900px] p-4">
          <h1 class="text-2xl font-bold mb-5">Đây là thông tin của bạn:</h1>

          <h1 class="text-lg font-medium">
            Số điện thoại của bạn: {order.sodt}
          </h1>
          <div className="flex">
            <h1 class="text-lg font-medium">Tên nha sĩ: </h1>
            <h1 class="text-lg font-medium">{order.tenns} </h1>
          </div>

          <div className="flex">
            <h1 class="text-lg font-medium">Ngày khám: </h1>
            <h1 class="text-lg font-medium"> {order.CA.NGAY}</h1>
          </div>
          <div className="flex">
            <h1 class="text-lg font-medium">Bắt đầu: </h1>
            <h1 class="text-lg font-medium"> {order.CA.GIOBATDAU}</h1>
          </div>
          <div className="flex">
            <h1 class="text-lg font-medium">Kết thúc: </h1>
            <h1 class="text-lg font-medium"> {order.CA.GIOKETTHUC}</h1>
          </div>
          <div className="flex">
            <h1 class="text-lg font-medium">Lý do khám: </h1>
            <h1 class="text-lg font-medium"> {order.lydokham}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
const steps = [
  {
    title: "Chọn Nha Sĩ",
    content: <ChonNhaSi />,
  },
  {
    title: "Chọn Ngày",
    content: <ChonCa />,
  },
  {
    title: "Lý do khám",
    content: <LyDoKham />,
  },
  {
    title: "Xác nhận",
    content: <XacNhan />,
  },
];

const DatLichContainer = () => {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    content: item.content,
  }));
  const order = useSelector((state) => state.order);

  const handleBooking = async () => {
    if (order.mans === "") {
      message.error("Vui lòng chọn nha sĩ");
      return;
    }
    if (order.sott === "") {
      message.error("Vui lòng chọn ca khám");
      return;
    }
    if (order.lydokham === "") {
      message.error("Vui lòng nhập lý do khám");
      return;
    }

    await GuestService.taoLichHen(order).then((res) => {
      message.success("Đặt lịch thành công");
      setTimeout(() => {
        dispatch(deleteOder());
      }, 500);
      setTimeout(() => {
        navigate("/xem-lich-hen");
      }, 500);
    });
  };

  return (
    <div className=" ">
      <Steps current={current} items={items} />
      <div className=" min-h-[300px] bg-[#FEFFFE] mt-4 p-4 rounded-lg border max-h-[500px] overflow-y-auto">
        {steps[current].content}
      </div>
      <div className="flex justify-center mt-6">
        {current > 0 && (
          <Buttons
            className="mr-2 border-dashed border-2 border-blue-500 hover:bg-gray-400 hover:border-solid bg-slate-300 "
            onClick={() => prev()}
            text="Truớc"
          />
        )}
        {current < steps.length - 1 && (
          <ButtonBlue
            className="bg-blue-500 "
            func={() => next()}
            text="Tiếp tục"
          />
        )}
        {current === steps.length - 1 && (
          <Buttons
            className="bg-green-600 hover:bg-green-700 ml-2"
            text="Đặt lịch"
            onClick={() => handleBooking()}
          />
        )}
      </div>
    </div>
  );
};

const DatLichHen = () => {
  return (
    <>
      <div className="">
        <h1 className="mx-auto mb-5 text-2xl">Đặt lịch hẹn</h1>
        <DatLichContainer />
      </div>
    </>
  );
};
export default DatLichHen;
