import { setRole, updateUserInfo } from "~/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import OnlineService from "~/services/online";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
import useCookie from "~/hooks/useCookie";
const SignInPage = () => {
  const [cookie, setCookie] = useCookie("token", "");
  const [password, setPassword] = useCookie("password", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    await OnlineService.dangnhap({
      matk: values.matk, //"QTV0001"
      matkhau: values.matkhau, //"21126054",
    })
      .then((res) => {
        setCookie(res.accessToken);
        setPassword(values.matkhau);
        dispatch(setRole(res.info.ROLE));
        dispatch(updateUserInfo(res.info));
        navigate("/");
      })
      .catch((err) => {
        // message.error("Sai tài khoản hoặc mật khẩu");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className=" w-full h-[100vh] flex flex-col">
      <div className="w-[500px] h-[600px]  drop-shadow-md bg-gray-200 flex flex-col justify-center mx-auto  my-auto items-center ">
        <button className="text-3xl mt-0 mb-10"> Đăng nhập</button>
        <Form
          {...layout}
          name="signin_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className="flex flex-col "
            label="Mã Tài Khoản"
            name="matk"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matkhau"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className=" flex justify-center mt-6 ">
            <div className="flex w-[300px] justify-center gap-7">
              <button
                onClick={() => navigate(-1)}
               className="flex w-[100px] justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 bg-gray-400 hover:bg-gray-300 hover:text-gray-900 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                Huỷ
              </button>
              <button
                htmlFor="submit"
                className="flex w-[100px] justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 "
              >
                Đăng nhập
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default SignInPage;
