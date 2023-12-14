import { lichhen5 } from "../../fakedata/lhnv";
import ns from "~/fakedata/nhasi";
import '../../assets/styles/staff.css'

import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, Badge, Dropdown } from "antd";
import { ButtonGreen } from "../../components/button";
const { Item } = Form;

const NhaSi = ({ mans, tenns }) => {
  return (
    <>
      <div className="flex w-[440px]  gap-6 ">
        <Input className=" w-[300px]" value={mans} disabled />
        <Input className="w-[130px]" value={tenns} disabled />
      </div>
    </>
  );
};

const TaoLichHen = () => {
  const [form] = Form.useForm();
  const [nhaSiList, setNhaSiList] = useState(ns);
  const [chonNhaSi, setChonNhaSi] = useState("");

  const inputNhaSi = () => {
    const tenNS = nhaSiList.find((item) => item.MANS === MANS).HOTEN;
    const newData = {
      MANS,
      HOTEN: tenNS,
    };
    setChonNhaSi([...chonNhaSi, newData]);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Submitted values:", values);
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <div className="bg-[#FFFFFF] w-[550px] h-fit rounded-2xl pt-8 pb-0 px-10">
      <h1 className="text-2xl mb-4 font-montserrat font-black">TẠO LỊCH HẸN</h1>
      <Form
        name="appointmentForm"
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 24 }}
      >
        <Item name="dentist"
              label="Nha sĩ"
              rules={[{ required: true, message: "Vui lòng nhập Nha sĩ!" }]}
              wrapperCol={{ span: 24 }}
        >
              <Select
                className="w-72"
                placeholder="Chọn một nha sĩ."
                options={nhaSiList.map((item) => ({
                  value: item.MANS,
                  label: item.HOTEN,
                }))}
              />
            </Item>
        <Form.Item
          name="appointmentNumber"
          label="Số thứ tự lịch hẹn"
          rules={[
            { required: true, message: "Vui lòng nhập số thứ tự lịch hẹn!" },
          ]}
          wrapperCol={{ span: 24 }}
        >
          <InputNumber placeholder="Số thứ tự lịch rảnh của nha sĩ." />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại !" }]}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Nhập số điện thoại khách hàng." />
        </Form.Item>
        <Form.Item
          name="reason"
          label="Lý do khám"
          rules={[{ required: true, message: "Vui lòng nhập lý do khám!" }]}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea minLength={10} maxLength={200} rows={4}
                          placeholder="Mô tả tình trạng hiện tại và lý do khám." />
        </Form.Item>
        <Form.Item 
            style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleCancel}
            style={{ marginRight: 10, marginTop: 10 }}
            type="danger"
          >
            ĐẶT LẠI
          </Button>
          <ButtonGreen text="TẠO" func="" />
        </Form.Item>
      </Form>
    </div>
  );
};


const OneWorkSchedule = ({ data }) => {
  const detail = ({ mans, sott }) => {
    return [
      {
        key: '1',
        label: 'Mã NS: ' + mans,
        disabled: true,
      },
      {
        key: '2',
        label: 'STT lịch rảnh: ' + sott,
        disabled: true,
      },
    ];
  };

  return (
    <>
      {data.SODT !== null ? (
      <Badge.Ribbon text="Bận" color="#ACACAC">
        <div className="border-2.4 border-[#b8b8b8] rounded-md h-[40px] flex items-center p-3" >
        <Dropdown
          menu={{
            items: detail({ mans: data.MANS, sott: data.SOTT }),
          }}
        >
          <div className="font-montserrat font-semibold text-base text-[#acacac]">NS. 
            <span>
              {data.HOTEN}
            </span>
          </div>
          </Dropdown>
        </div>
        </Badge.Ribbon>
      ) : (
        <Badge.Ribbon text="Rảnh" color="blue">
        <div className="border-2.4 border-[#b8b8b8] rounded-md h-[40px] flex items-center p-3" >
          <Dropdown
            menu={{
              items: detail({ mans: data.MANS, sott: data.SOTT }),
            }}
          >
          <div className="font-montserrat font-semibold text-base">NS. 
            <span>
              {data.HOTEN}
            </span>
          </div>
          </Dropdown>
        </div>
        </Badge.Ribbon>
      )}
    </>
  );
};

const TitleSchedule = ({ maca }) => {
  let caContent = null;

  switch (maca) {
    case "CA001":
      caContent = <span>CA 1 | 9:00 - 11:00</span>;
      break;
    case "CA002":
      caContent = <span>CA 2 | 11:00 - 13:00</span>;
      break;
    case "CA003":
      caContent = <span>CA 3 | 13:00 - 15:00</span>;
      break;
    case "CA004":
      caContent = <span>CA 4 | 15:00 - 17:00</span>;
      break;
    case "CA005":
      caContent = <span>CA 5 | 17:00 - 19:00</span>;
      break;
    case "CA006":
      caContent = <span>CA 6 | 19:00 - 21:00</span>;
      break;
  };

  return caContent;
};

const ListLichhen = () => {
  const data1 = 
  {
    "MACA": "CA002",
    "NHASI": [
      {
        "MANS": "NS0001",
        "HOTEN": "Lê Văn Hòa",
        "SOTT": 1,
        "GIOBATDAU": "1970-01-01T11:00:00.000Z",
        "GIOKETTHUC": "1970-01-01T13:00:00.000Z",
        "SODT": "0323456789",
        "LYDOKHAM": "Người thân tôi nói rằng tôi kêu răng khi ngủ, và tôi muốn kiểm tra xem có vấn đề gì về nha khoa gây ra điều này\n."
      },
      {
        "MANS": "NS0004",
        "HOTEN": "Trần Thị Mai Loan",
        "SOTT": 5,
        "GIOBATDAU": "1970-01-01T19:00:00.000Z",
        "GIOKETTHUC": "1970-01-01T21:00:00.000Z",
        "SODT": null
      }
    ]
  }; 

  return (
    <div className="gap-0">
      <h1 className="text-montserrat text-blue font-bold text-base pb-1">
        <TitleSchedule maca={data1.MACA} />
      </h1>
      <OneWorkSchedule data={data1.NHASI[0]} />
      <OneWorkSchedule data={data1.NHASI[1]} />
    </div>
  );
};

const XemLichTruc = ( schedule ) => {
  const temp = 
  {
    "NGAY": "11/12/2023",
    "CA": [
        {
            "MACA": "CA002",
            "GIOBATDAU": "18:00:00",
            "GIOKETTHUC": "20:00:00",
            "NHASI": [
                {
                    "MANS": "NS0001",
                    "HOTENNS": "Lê Văn Hòa",
                    "SODTKH": "0323456789",
                    "HOTENKH": "Lê Thị Thu Hà",
                    "SOTTLH": 1,
                    "LYDOKHAM": "Đau rát răng và nướu: Tôi đã cảm thấy đau rát và sưng nướu ở chiếc răng ở phía dưới bên trái trong vài ngày qua. Đau đớn khi chải răng và ăn."
                },
                {
                    "MANS": "NS0010",
                    "HOTENNS": "Vũ Hoàng Anh",
                    "SODTKH": "0378236541",
                    "HOTENKH": "Vũ Thị Hồng Loan",
                    "SOTTLH": 1,
                    "LYDOKHAM": "Răng của tôi lệch và tôi muốn tư vấn về cách chỉnh nha."
                }
            ]
        },
        {
            "MACA": "CA003",
            "GIOBATDAU": "20:00:00",
            "GIOKETTHUC": "22:00:00",
            "NHASI": [
                {
                    "MANS": "NS0001",
                    "HOTENNS": "Lê Văn Hòa",
                    "SODTKH": "0345678901",
                    "HOTENKH": "Lê Minh Hoàng",
                    "SOTTLH": 2,
                    "LYDOKHAM": "Nhổ răng khôn"
                },
                {
                    "MANS": "NS0007",
                    "HOTENNS": "Phạm Thị Minh Trang",
                    "SOTTLR": 1,
                    "SODTKH": null
                }
            ]
        },
        {
            "MACA": "CA005",
            "GIOBATDAU": "00:00:00",
            "GIOKETTHUC": "02:00:00",
            "NHASI": [
                {
                    "MANS": "NS0002",
                    "HOTENNS": "Phạm Xuân Thanh",
                    "SODTKH": "0712345678",
                    "HOTENKH": "Ngô Đình Quân",
                    "SOTTLH": 1,
                    "LYDOKHAM": "Tôi nhận thấy có một vết đen trên chiếc răng cửa sau bên trái và nghi ngờ răng bị hỏng. Tôi muốn làm sạch và lấy mảng cặn."
                },
                {
                    "MANS": "NS0006",
                    "HOTENNS": "Hoàng Thị Ngọc Anh",
                    "SODTKH": "0387654321",
                    "HOTENKH": "Dương Văn Quyền",
                    "SOTTLH": 1,
                    "LYDOKHAM": "Người thân tôi nói rằng tôi kêu răng khi ngủ, và tôi muốn kiểm tra xem có vấn đề gì về nha khoa gây ra điều này."
                }
            ]
        },
        {
            "MACA": "CA001",
            "GIOBATDAU": "16:00:00",
            "GIOKETTHUC": "18:00:00",
            "NHASI": [
                {
                    "MANS": "NS0003",
                    "HOTENNS": "Trần Thị Mai Loan",
                    "SODTKH": "0987654321",
                    "HOTENKH": "Dương Thị Thảo",
                    "SOTTLH": 1,
                    "LYDOKHAM": "Lợi của tôi thường bị sưng và chảy máu khi chải răng. Tôi lo lắng về tình trạng viêm nướu này và muốn tư vấn và điều trị."
                },
                {
                    "MANS": "NS0004",
                    "HOTENNS": "Trần Minh Tuấn",
                    "SODTKH": "0301234567",
                    "HOTENKH": "Hoàng Văn Tùng",
                    "SOTTLH": 1,
                    "LYDOKHAM": "Chiếc răng trước cửa đã bị nứt và tôi cảm thấy đau."
                }
            ]
        },
        {
            "MACA": "CA004",
            "GIOBATDAU": "22:00:00",
            "GIOKETTHUC": "00:00:00",
            "NHASI": [
                {
                    "MANS": "NS0003",
                    "HOTENNS": "Trần Thị Mai Loan",
                    "SODTKH": "0723456789",
                    "HOTENKH": "Bùi Văn Thành",
                    "SOTTLH": 2,
                    "LYDOKHAM": "Răng xấu, cần được khám và tư vấn niềng răng."
                },
                {
                    "MANS": "NS0004",
                    "HOTENNS": "Trần Minh Tuấn",
                    "SOTTLR": 2,
                    "SODTKH": null
                }
            ]
        },
        {
            "MACA": "CA006",
            "GIOBATDAU": "02:00:00",
            "GIOKETTHUC": "04:00:00",
            "NHASI": [
                {
                    "MANS": "NS0003",
                    "HOTENNS": "Trần Thị Mai Loan",
                    "SOTTLR": 3,
                    "SODTKH": null
                },
                {
                    "MANS": "NS0006",
                    "HOTENNS": "Hoàng Thị Ngọc Anh",
                    "SOTTLR": 2,
                    "SODTKH": null
                }
            ]
        }
    ]
  };

  return (
    <>
      <div className="bg-[#FFFFFF] w-[460px] rounded-2xl py-8 px-10">
        <h1 className="text-2xl mb-5 font-montserrat font-black">LỊCH TRỰC</h1>
        <div className="rounded-none flex flex-col gap-6">
          <ListLichhen />
          <ListLichhen />
          <ListLichhen />
          <ListLichhen />
          <ListLichhen />
          <ListLichhen />
        </div>
      </div>
    </>
  );
};

const DatLich = () => {
  return (
    <>
      <div className="  min-h-[700px] flex gap-6 justify-center">
        <TaoLichHen />
        <XemLichTruc schedule={lichhen5} />
      </div>
    </>
  );
};

export default DatLich;
