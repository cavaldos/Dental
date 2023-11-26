// khach hang
import GuestPage from "~/pages/guest";
import CapNhatTaiKhoan from "../pages/guest/CapNhatTk";
import DatLichHen from "../pages/guest/DatLichHen";
import HoSoBenhKH from "../pages/guest/HoSoBenh";
import XemLichHenKH from "../pages/guest/XemLichHen";
import DefaultLayout from "~/components/layout/defaultLayout";

const GuestRouter = [
  {
    path: "/",
    component: GuestPage,
    Layout: DefaultLayout,
  },
  {
    path: "/dat-lich-hen",
    component: DatLichHen,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-ho-so-benh",
    component: HoSoBenhKH,
    Layout: DefaultLayout,
  },
  {
    path: "/cap-nhat-tai-khoan",
    component: CapNhatTaiKhoan,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-lich-hen",
    component: XemLichHenKH,
    Layout: DefaultLayout,
  },
];

export default GuestRouter;