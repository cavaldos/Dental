import { Form, Input, DatePicker, Radio, Button, message } from "antd";
import { useState } from "react";

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
    <div className="h-[450px] w-[55vw] bg-slate-50 mx-auto rounded-lg flex flex-col justify-center">
      <div className=" w-full  ">
        <h1 className="text-2xl  mb-4 ml-20 ">Tạo tài khoản khách hàng</h1>
      </div>
      <Form
        className="mx-auto flex flex-col justify-start pr-60 w-[80%]"
        form={form}
        name="registration-form"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={formValues}
        onValuesChange={(changedValues, allValues) => setFormValues(allValues)} // Cập nhật state khi có sự thay đổi giá trị đầu vào
      >
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Radio.Group>
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="birthdate"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="bg-blue-600" type="primary" htmlType="submit">
            Đăng kí
          </Button>
          <Button className="bg-red-600 ml-4" onClick={handleReset}>
            Đặt lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DangKiTaiKhoanKhachHang;
