import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from 'dayjs';
import {ButtonGreen} from "../../components/button"
import axios from "axios";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;

const CapNhatTaiKhoan = () => {
  const initialValues = {
    user: {
      phone: "0987654321", // Giá trị số điện thoại mặc định
      name: "John Doe", // Giá trị họ tên mặc định
      gender: "Nam", // Giá trị giới tính mặc định
      date: dayjs('01/01/1990', dateFormatList[0]), // Giá trị ngày sinh mặc định
    },
  };
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div
      className="bg-white p-10 mx-10 sm:px-15 md:px-25 lg:px-40"
      style={{
        borderRadius: "27px",
        boxShadow: "0px 3.111px 3.111px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{maxWidth:"95%"}}
        initialValues={initialValues}
      >
        <Form.Item
          name={["user", "phone"]}
          label="Số điện thoại:"
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
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          name={["user", "name"]}
          label="Họ tên:"
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
          <Input />
        </Form.Item>

        <Form.Item
          name={["user", "gender"]}
          label="Phái"
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
          <Select>
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nữ">Nữ</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={["user", "date"]}
          label="Ngày sinh"
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
          <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} placeholder="Chọn ngày" />
        </Form.Item>

        <Form.Item
          name={["user", "verify-password"]}
          label="Xác nhận mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu!",
            },
          ]}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 5,
          }}
          style={{marginBottom:0}}
        >
          <button className="bg-grin font-montserrat font-bold text-base text-white py-2 
            px-5 rounded-lg hover:bg-darkgrin active:bg-grin">
        CẬP NHẬT
        </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CapNhatTaiKhoan;
