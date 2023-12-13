import { setRole, deleteRole } from "~/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import OnlineService from "~/services/online";
import { useState } from "react";
import useCookie from "~/hooks/useCookie";
const SignInPage = () => {
  const [cookie, setCookie] = useCookie("token", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await OnlineService.dangnhap(values).then((res) => {
      console.log(res);
      setCookie(res.accessToken);
      dispatch(
        setRole({
          ...res.info,
          ROLE: res.info.ROLE,
        })
      );
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className=" w-full h-[100vh] flex">
      <div className="w-[400px] h-[500px]  drop-shadow-md bg-gray-200 flex flex-col justify-center mx-auto  my-auto items-center">
        <Form
          name="signin_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="matk" name="matk">
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matkhau"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <button
              htmlFor="submit"
              className=" bg-blue-400 h-9 w-24 rounded-lg"
            >
              Đăng nhập
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default SignInPage;
