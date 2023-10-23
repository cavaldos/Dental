import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole } from "~/redux/features/userSlice";
const Header = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="bg-[#eee] w-full h-16 flex gap-1  justify-end  px-5 drop-shadow-lg">
        <div className=" h-full text-center  flex">
          <h1 className="my-auto mr-3">{user.role}</h1>
        </div>

        {user.role === "online" ? (
          <div className="flex">
            <button
              className="bg-blue-500 px-5 py-2 my-3 rounded-md"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign In
            </button>
            <button
              className="bg-blue-500 px-5 py-2 my-3 rounded-md"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 px-5 py-2 my-3 rounded-md"
            onClick={() => {
              dispath(deleteRole());
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </>
  );
};

export default Header;
