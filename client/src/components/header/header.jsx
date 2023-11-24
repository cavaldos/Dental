import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole } from "~/redux/features/userSlice";
const Account = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const handleSignOut = async () => {
    await dispath(deleteRole());
    await navigate("/");
  };
  return (
    <>
      <button
        className="bg-blue-500 px-5 py-2 my-3 rounded-md"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </>
  );
};
const Header = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="bg-[#1576FE] w-full h-16 flex gap-1  justify-end  px-5 drop-shadow-lg z-50">
        <div className=" h-full text-center  flex mr-auto ml-4">
          <h1 className="my-auto mr-3 text-white text-2xl font-serif">
            {" "}
            Phong Kham cua Dogtor Phi Vu
          </h1>
        </div>
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
          <Account />
        )}
      </div>
    </>
  );
};

export default Header;
