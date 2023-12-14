import { setRole, deleteRole } from "~/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import OnlineService from "~/services/online";
import { useState } from "react";
import useCookie from "~/hooks/useCookie";
import Hash from "~/hooks/Hash";

const SignInPage = () => {
  const [cookie, setCookie] = useCookie("token", "");
  const [password, setPassword] = useCookie("password", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hashPassword = new Hash(1);

  const onFinish = async (values) => {
    console.log("Success:", values);

    await OnlineService.dangnhap({
      matk: "QTV0001", //values.matk,
      matkhau: "21126054", // values.matkhau,
    }).then((res) => {
      console.log(res);
      setCookie(res.accessToken);
      const encodedpass = hashPassword.encode(values.matkhau);
      setPassword(values.matkhau);

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
