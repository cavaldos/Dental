import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from 'dayjs';
import { ButtonGreen } from "../../components/button"
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

const DangKyTaiKhoan = () => {
  const initialValues = {
    user: {
      phone: "0987654321", // Giá trị số điện thoại mặc định
      name: "John Doe", // Giá trị họ tên mặc định
      gender: "Nam", // Giá trị giới tính mặc định
      address: "Trong tim ...", // Giá trị giới tính mặc định
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
        style={{ maxWidth: "95%" }}
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
            {
              pattern: /^[0-9]{10}$/,
              message: "Số điện thoại không hợp lệ!"
            }
          ]}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          validateTrigger={['onBlur']}
        >
          <Input />
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
              message: "Vui lòng chọn giới tính"
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
          <DatePicker format={dateFormatList} placeholder="Chọn ngày" />
        </Form.Item>

        <Form.Item
          name={["user", "address"]}
          label="Địa chỉ:"
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
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Mật khẩu"
          rules={[{
            required: true,
            message: "Vui lòng nhập mật khẩu"
          },
          {
            min: 6,
            message: "Mật khẩu cần ít nhất 6 ký tự"
          }]}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name={["user", "verify-password"]}
          label="Xác nhận mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(["user", "password"]) === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu xác nhận không khớp!");
              },
            }),
          ]}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          validateTrigger={['onBlur']}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 5,
          }}
          style={{ marginBottom: 0 }}
        >
          <button className="bg-grin font-montserrat font-bold text-base text-white py-2 
            px-5 rounded-lg hover:bg-darkgrin active:bg-grin">
            ĐĂNG KÝ
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default DangKyTaiKhoan;
