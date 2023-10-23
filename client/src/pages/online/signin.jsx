import { setRole, deleteRole } from "~/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button,message } from "antd";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    if(values.email === "admin@gmail.com" && values.password === "admin"){
      dispatch(setRole("admin"));
      navigate("/");
    }
    else if(values.email === "guest@gmail.com" && values.password === "guest"){
      dispatch(setRole("guest"));
      navigate("/");
    }
    else if(values.email === "staff@gmail.com" && values.password === "staff"){
      dispatch(setRole("staff"));
      navigate("/");
    }
    else if(values.email === "dentist@gmail.com" && values.password === "dentist"){
      dispatch(setRole("dentist"));
      navigate("/");
    }
    else{
      message.error("Email hoặc mật khẩu không đúng!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className=" w-full h-[100vh] flex">
      <div className="w-[400px] h-[500px]  drop-shadow-md bg-gray-200 flex flex-col justify-center mx-auto  my-auto items-center">
        <div className="mb-4 text-sm font-normal">
          <p>email :"admin@gmail.com"</p>
          <p>pass :"admin"</p>
          <p> guest, staff, dentist dang nhap tuong tu</p>
        </div>
        <Form
          name="signin_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
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
