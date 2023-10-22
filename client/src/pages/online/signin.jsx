import { setRoute } from "~/redux/features/routeSlice";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClicked = async (route) => {
    await dispatch(
      setRoute({
        route: route,
      })
    );
    await navigate("/");
  };

  return (
    <div className=" w-full h-[100vh] flex">
      <div className="w-[400px] h-[500px]  bg-red-300 flex flex-col justify-center mx-auto  my-auto items-center">
        signin
        <Button
          onClick={() => {
            handleClicked("admin");
          }}
          type="primary"
          className="text-black text-3xl h-auto"
        >
          Admin
        </Button>
        <Button
          onClick={() => {
            handleClicked("staff");
          }}
          type="primary"
          className="text-black text-3xl h-auto"
        >
          Staff
        </Button>
        <Button
          onClick={() => {
            handleClicked("guest");
          }}
          type="primary"
          className="text-black text-3xl h-auto"
        >
          Guest
        </Button>
        <Button
          onClick={() => {
            handleClicked("dentist");
          }}
          type="primary"
          className="text-black text-3xl h-auto"
        >
          Dentist
        </Button>
      </div>
    </div>
  );
};
export default SignInPage;
