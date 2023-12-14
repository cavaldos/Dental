import "../../assets/styles/staff.css";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from 'dayjs';
import {ButtonGreen, ButtonPink} from "../../components/button";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const DangKiTaiKhoanKhachHang = () => {
  const [formValues, setFormValues] = useState({}); // State để lưu giá trị của các trường đầu vào
  const [form] = Form.useForm(); // Sử dụng useForm() để tạo đối tượng form

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Đăng kí thành công!");
    form.resetFields();
    setFormValues({});
  };

  const handleReset = () => {
    form.resetFields();
    setFormValues({});
    message.success("Đã xóa trường!");
  };
  
  return (
    <div
      className="bg-white w-[1000px] h-fit p-10 mx-10 sm:px-15 md:px-25 lg:px-40 pb-0"
      style={{
        borderRadius: "27px",
        boxShadow: "0px 3.111px 3.111px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
      >
        <Form.Item
          name="SODT"
          label="Số điện thoại: "
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
        >
          <Input placeholder="Số điện thoại khách hàng."/>
        </Form.Item>

        <Form.Item
          name="HOTEN"
          label="Họ tên: "
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên!",
            },
          ]}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
        >
          <Input placeholder="Họ và tên khách hàng."/>
        </Form.Item>

        <Form.Item
          name="PHAI"
          label="Phái: "
          rules={[
            {
              required: true,
              message:"Vui lòng chọn giới tính"
            },
          ]}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
        >
          <Select placeholder="Chọn giới tính.">
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nữ">Nữ</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="NGAYSINH"
          label="Ngày sinh: "
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ngày sinh!",
            },
          ]}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
        >
          <DatePicker placeholder="Chọn ngày sinh." />
        </Form.Item>

        <Form.Item
          name="DIACHI"
          label="Địa chỉ: "
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ!",
            },
          ]}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
        >
          <Input placeholder="Địa chỉ thường trú."/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <ButtonGreen text="ĐĂNG KÝ" func={""}/>
          <Button
                onClick={handleReset}
                style={{ marginLeft: 10 }}
                type="danger"
          >
            ĐẶT LẠI
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DangKiTaiKhoanKhachHang;
