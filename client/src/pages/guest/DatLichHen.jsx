import React, { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import { Input } from "antd";
const { TextArea } = Input;
import GuestService from "../../services/guest";
import { useDispatch, useSelector } from "react-redux";
import { booking } from "../../redux/features/orderSlice";
const NhaSi = ({ TENNS, MAND }) => {
  const dispath = useDispatch();
  const handleOnClick = () => {
    dispath(booking({ mans: MAND }));
    message.success(`Đã chọn nha sĩ ${TENNS}`);
  };
  return (
    <>
      <Button
        onClick={() => handleOnClick()}
        className="p-4 rounded-md border border-slate-400 h-16"
      >
        <h1>{TENNS}</h1>
      </Button>
    </>
  );
};

const Ca = ({ GIOBD, GIOKT, NGAY, SOTT }) => {
  const dispath = useDispatch();
  const handleOnClick = (sott) => {
    dispath(booking({ sott: sott }));
  };

  return (
    <>
      <Button
        onClick={() => handleOnClick(SOTT)}
        className="p-4 rounded-lg border border-slate-400 h-16"
      >
        <h1>{NGAY}</h1>
        <h1>
          {GIOBD} - {GIOKT}
        </h1>
      </Button>
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
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes} `;
  }

  useEffect(() => {
    if (order.mans === "") {
      GuestService.xemLRChuaDatTatCaNSTheoNgay().then((res) => {
        const output = [];
        res.forEach((day) => {
          day.CA.forEach((shift) => {
            shift.NHASI.forEach((nurse) => {
              output.push({
                MANS: nurse.MANS,
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
    } else {
      GuestService.lichRanh().then((res) => {
        const new_lichRanh = res.filter((item) => {
          return item.MANS === order.mans;
        });
        const new_lichRanhformat = new_lichRanh.map((item) => {
          return {
            ...item,
            NGAY: new Date(item.NGAY).toLocaleDateString(),
            GIOBATDAU: formatTime(item.GIOBATDAU),
            GIOKETTHUC: formatTime(item.GIOKETTHUC),
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
  console.log(lydokham);
  const user = useSelector((state) => state.user);
  const dispath = useDispatch();
  const handleOnClick = () => {
    dispath(booking({ lydokham: lydokham, sodt: user.SODT }));
    message.success("Đã chọn lý do khám");
  };

  return (
    <>
      <div className="flex justify-center">
        <div className=" w-[60%]">
          <TextArea
            className=" w-full "
            rows={4}
            value={lydokham}
            onChange={(e) => setLyDoKham(e.target.value)}
          />
          <Button
            onClick={() => handleOnClick()}
            className="p-4 rounded-lg border border-slate-400 h-16"
          >
            <h1>Xác nhận</h1>
          </Button>
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
        <div class="mx-auto">
          <h1 class="text-2xl font-bold">Thong tin dat lich</h1>
          <h1 class="text-lg font-medium">sdt: {order.sodt}</h1>
          <h1 class="text-lg font-medium">mans: {order.mans}</h1>
          <h1 class="text-lg font-medium">sott:{order.sott}</h1>
          <h1 class="text-lg font-medium">lydokham :{order.lydokham}</h1>
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
    title: "Ly do khám",
    content: <LyDoKham />,
  },
  {
    title: "Xác nhận",
    content: <XacNhan />,
  },
];

const DatLichContainer = () => {
  const [current, setCurrent] = useState(0);
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
      console.log(res);
      message.success("Đặt lịch thành công");
    });
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div className=" min-h-[300px] bg-[#FEFFFE] mt-4 p-4 rounded-lg border">
        {steps[current].content}
      </div>
      <div className="flex justify-center mt-6">
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button className="bg-blue-500" type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            className="bg-green-600 ml-2"
            type="primary"
            onClick={() => handleBooking()}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

const DatLichHen = () => {
  return (
    <>
      <div className="">
        <h1 className="mx-auto mb-5">Đặt lịch hẹn</h1>
        <DatLichContainer />
      </div>
    </>
  );
};
export default DatLichHen;
