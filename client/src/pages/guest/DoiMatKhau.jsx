import React, { useState } from "react";
import { Form, Input, message } from "antd";
import GuestService from "../../services/guest";
import { useSelector } from "react-redux";
import { ButtonBlue } from "~/components/button";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const DoiMatKhau = () => {
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const newInfo = {
      sdt: user.SODT,
      matkhaucu: values.matkhaucu,
      matkhaumoi: values.matkhaumoi,
    };
    GuestService.doiMatKhau(newInfo).then((res) => {
      if (res && res.data) {
        if (res.data.status === 200) {
          message.success("Đổi mật khẩu thành công");
        }
        if (res.data.status === 404) {
          message.error("Mật khẩu cũ không đúng");
        }
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-white w-[800px] h-[300px] shadow-xl rounded-lg p-2 mx-auto">
      <h1 className="text-2xl mb-7">Đổi mật khẩu khách hàng</h1>
      <div className="flex flex-col  min-h-[400px]">
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Mật Khẩu Cũ"
            name="matkhaucu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mật Khẩu Mới"
            name="matkhaumoi"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác Nhận Mật Khẩu Mới"
            name="xacnhanmatkhaumoi"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("matkhaumoi") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Mật khẩu xác nhận không trùng khớp với mật khẩu mới!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <ButtonBlue
              text="Đổi mật khẩu"
              htmlType="submit"
              className=" h-[50px] w-[150px]"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default DoiMatKhau;
