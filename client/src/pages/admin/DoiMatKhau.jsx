import React, { useState } from "react";
import { Form, Input } from "antd";
import AdminService from "../../services/admin";
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
const DoiMatKhauNS = () => {
  const user = useSelector((state) => state.user);
  const { ROLE, HOTEN, PHAI, MAQTV } = user;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const newInfo = {
      maqtv: MAQTV,
      matkhaucu: values.matkhaucu,
      matkhaumoi: values.matkhaumoi,
    };
    AdminService.doimatKhau(newInfo).then((res) => {
      if (res.success === true) {
        message.success("Đổi mật khẩu thành công!");
      } else if (res.success === false) {
        message.error("Đổi mật khẩu thất bại!");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-white w-[800px] h-[500px] shadow-xl rounded-lg p-2">
      <h1 className="text-2xl mb-5">Đổi mật khẩu quản trị viên</h1>
      <div className="flex flex-col  min-h-[400px]">
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="MÃ QTV" name="maqtv">
            <Input placeholder={MAQTV} disabled />
          </Form.Item>
          <Form.Item label="Họ Tên" name="hoten">
            <Input placeholder={HOTEN} disabled />
          </Form.Item>
          <Form.Item label="Phái" name="phai">
            <Input placeholder={PHAI} disabled />
          </Form.Item>
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
export default DoiMatKhauNS;
