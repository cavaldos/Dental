// khach hang

import { lazy } from "react";
import DefaultLayout from "~/components/layout/defaultLayout";
const GuestPage = lazy(() => import("../pages/guest"));
const CapNhatTaiKhoan = lazy(() => import("../pages/guest/CapNhatTk"));
const DatLichHen = lazy(() => import("../pages/guest/DatLichHen"));
const HoSoBenhKH = lazy(() => import("../pages/guest/HoSoBenh"));
const XemLichHenKH = lazy(() => import("../pages/guest/XemLichHen"));

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