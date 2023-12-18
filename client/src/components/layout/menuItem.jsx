import { AiOutlineMenuFold } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaBookMedical } from "react-icons/fa";
import { FaFileMedical } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsCalendar2PlusFill } from "react-icons/bs";

const menuDentist = [
  {
    name: "Đăng kí lịch rảnh",
    icon: <BsCalendar2PlusFill size={30} />,
    path: "/dang-ki-lich-ranh",
  },
  {
    name: "Xem lịch trực",
    icon: <FaCalendarDays size={30} />,
    path: "/xem-lich-truc",
  },
  {
    name: "Xem bệnh án cũ",
    icon: <FaBookMedical size={30} />,
    path: "/xem-benh-an-cu",
  },
  {
    name: "Tạo bệnh án mới",
    icon: <FaFileMedical size={30} />,
    path: "/tao-benh-an-moi",
  },
  {
    name: "Thông tin cá nhân",
    icon: <ImProfile size={30} />,
    path: "/thong-tin-ca-nhan",
  },
];

const menuAdmin = [
  {
    name: "Quản lí thuốc",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/quan-li-thuoc",
  },
  {
    name: "Quản lí dịch vụ",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/quan-li-dich-vu",
  },
  {
    name: "Quản lí nhân viên",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/quan-li-nhan-vien",
  },
  {
    name: "Quản lí nha sĩ",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/quan-li-nha-si",
  },
  {
    name: "Quản lí khách hàng",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/quan-li-khach-hang",
  },
  {
    name: "Quản lí quản trị viên",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/quan-li-quan-tri-vien",
  },
  {
    name: "Thông tin cá nhân",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/thong-tin-ca-nhan",
  },
];

const menuStaff = [
  {
    name: "Đăng kí tài khoản KH",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/dang-ki-tk-kh",
  },
  {
    name: "Đặt lịch hẹn",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/dat-lich-hen",
  },
  {
    name: "Xem lịch hẹn",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/xem-lich-hen",
  },
  {
    name: "Xem thuốc",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/xem-thuoc",
  },
  {
    name: "Xem dịch vụ",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/xem-dich-vu",
  },
  {
    name: "Hồ sơ bệnh án",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/ho-so-benh-an",
  },
  {
    name: "Hóa đơn",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/hoa-don",
  },
  {
    name: "Thông tin cá nhân",
    icon: <AiOutlineMenuFold size={30} />,
    path: "/thong-tin-ca-nhan",
  },
];

export { menuDentist, menuAdmin, menuStaff };
