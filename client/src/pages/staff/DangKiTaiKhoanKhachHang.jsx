import { Form, Input, DatePicker, Radio, Button, message } from "antd";

const DangKiTaiKhoanKhachHang = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Đăng kí thành công!");
  };

  return (
    <div className="h-[600px] w-[60vw] bg-slate-50 mx-auto rounded-lg flex flex-col justify-center items-center">
      <h1 className=" text-3xl font-extrabold mb-3">
        Tạo tài khoản khách hàng
      </h1>
      <Form
        className="mx-auto flex flex-col justify-start  pr-60"
        name="registration-form"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "80%" }}
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
          <Button type="primary" htmlType="submit">
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DangKiTaiKhoanKhachHang;
