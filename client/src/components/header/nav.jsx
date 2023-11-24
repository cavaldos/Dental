import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

const menuItem = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Đăng kí tài khoản khách hàng",
    path: "/dang-ki-tk-kh",
  },
  {
    name: "Đặt lịch hẹn",
    path: "/dat-lich-hen",
  },
  {
    name: "Xem lịch hẹn",
    path: "/xem-lich-hen",
  },
  {
    name: "Xem thuốc",
    path: "/xem-thuoc",
  },
  {
    name: "Xem dịch vụ",
    path: "/xem-dich-vu",
  },
  {
    name: "Hồ sơ bệnh án",
    path: "/ho-so-benh-an",
  },
  {
    name: "Hóa đơn",
    path: "/hoa-don",
  },
];

const Menu = ({ name, path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(path);
  };

  const isActive = location.pathname === path;

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center align-middle h-14 w-40 cursor-pointer rounded-md ${
        isActive ? "bg-gray-400" : "bg-gray-300"
      } mx-2 transition-all duration-300 hover:bg-gray-400`}
    >
      <div
        className={`flex items-center justify-center align-middle h-14 w-52 relative overflow-hidden`}
        style={{ transition: "opacity 1s ease" }}
      >
        <h1
          className="whitespace-nowrap overflow-ellipsis"
          style={{ maxWidth: "100%" }}
        >
          {name}
        </h1>
      </div>
    </button>
  );
};

const Nav = () => {
  return (
    <>
      <div className="bg-[#eee] w-full min-h-14 flex gap-1 justify-center align-middle items-center px-5 drop-shadow-lg py-2 z-50">
        {menuItem.map((item, index) => {
          return <Menu key={index} name={item.name} path={item.path} />;
        })}
      </div>
    </>
  );
};

export default Nav;
