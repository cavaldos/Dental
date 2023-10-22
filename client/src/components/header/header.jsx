import { Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRoute } from "~/redux/features/routeSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Space className="bg-gray-400 w-full h-16 flex justify-end  px-5">
        <Button
          onClick={() => {
            navigate("/signin");
          }}
          type="primary"
          className="text-black"
        >
          SignIn
        </Button>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
          type="primary"
          className="text-black "
        >
          Signup
        </Button>
        <Button
          onClick={() => {
            dispath(
              deleteRoute({
                route: "online",
              })
            );
          }}
          type="primary"
          className="text-black "
        >
          SignOut
        </Button>
      </Space>
    </>
  );
};

export default Header;
