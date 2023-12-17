import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const KhachHangItem = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: `Đặt lịch hẹn`,
    path: "/dat-lich-hen",
  },
  {
    name: "Xem lich hen",
    path: "/xem-lich-hen",
  },
  {
    name: "Xem hồ sơ bệnh",
    path: "/xem-ho-so-benh",
  },
  {
    name: "Cập nhật tài khoản",
    path: "/cap-nhat-tai-khoan",
  },
  {
    name: "Cap nhật tài khoản",
    path: "/profile",
  },
];

const OnlineItem = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: `Đội ngũ nha khoa`,
    path: "/doi-ngu-nha-khoa",
  },
  {
    name: "Bảng giá dịch vụ",
    path: "/bang-gia-dich-vu",
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
      className={`flex items-center justify-center align-middle h-14 min-w-40 cursor-pointer rounded-md ${
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
  const user = useSelector((state) => state.user);
  const menuItem = user.ROLE === "KH" ? KhachHangItem : OnlineItem;
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
