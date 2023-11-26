import { lichhen2 } from "../../fakedata/lhnv";

import React from "react";
import { Form, Input, Button } from "antd";

const TaoLichHen = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Submitted values:", values);
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <div className="bg-[#FFFEFE] w-[650px] h-[600px] rounded-lg p-5">
      <h1 className="text-2xl mb-4">Tạo lịch hẹn</h1>
      <Form
        name="appointmentForm"
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 24 }}
      >
        <Form.Item
          name="dentist"
          label="Nha sĩ"
          rules={[{ required: true, message: "Vui lòng nhập Nha sĩ!" }]}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="appointmentNumber"
          label="Số thứ tự lịch hẹn"
          rules={[
            { required: true, message: "Vui lòng nhập số thứ tự lịch hẹn!" },
          ]}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại !" }]}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="reason"
          label="Lý do khám"
          rules={[{ required: true, message: "Vui lòng nhập lý do khám!" }]}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button className="bg-green-600 " type="primary" htmlType="submit">
            Tạo
          </Button>
          <Button className="ml-3" onClick={handleCancel}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const ListLichhen = () => {
  return (
    <>
      <div className=" ">
        <h1 className="text-blue-600">CA1 | 9:00 - 11:00</h1>
        <div className=" border border-gray-400 ">sdfdsf</div>
        <div className=" border border-gray-400 ">sdfdsf</div>
        <div className=" border border-gray-400	">sdfdsf</div>
      </div>
    </>
  );
};
const XemLichTruc = () => {
  return (
    <>
      <div className="bg-[#FFFEFE] w-[400px] rounded-lg">
        <h1>Lich Truc Ngay</h1>
        <div className=" mx-4  rounded-none p-2 flex flex-col gap-6 ">
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
      <div className="  min-h-[700px] flex gap-10 justify-center">
        <TaoLichHen />
        <XemLichTruc />
      </div>
    </>
  );
};

export default DatLich;
