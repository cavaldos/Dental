// Nha si
import { lazy } from "react";
const AdminLayout = lazy(() => import("~/components/layout/adminLayout"));

const DentistPage = lazy(() => import("~/pages/dentist"));
const DangKiLichRanh = lazy(() => import("~/pages/dentist/DkLichRanh"));
const XemBenhAnCu = lazy(() => import("~/pages/dentist/XemBenhAnCu"));
const ThemBenhAnMoi = lazy(() => import("~/pages/dentist/ThemBenhAnMoi"));
const XemLichTruc = lazy(() => import("~/pages/dentist/XemLichTruc"));
const DentistRouter = [
  {
    path: "/",
    component: DentistPage,
    Layout: AdminLayout,
  },
  {
    path: "/dang-ki-lich-ranh",
    component: DangKiLichRanh,
    Layout: AdminLayout,
  },
  {
    path: "/xem-lich-truc",
    component: XemLichTruc,
    Layout: AdminLayout,
  },

  {
    path: "/xem-benh-an-cu",
    component: XemBenhAnCu,
    Layout: AdminLayout,
  },
  {
    path: "/xem-benh-an-cu/:sdt",
    component: XemBenhAnCu,
    Layout: AdminLayout,
  },

  {
    path: "/tao-benh-an-moi/",
    component: ThemBenhAnMoi,
    Layout: AdminLayout,
  },
  {
    path: "/tao-benh-an-moi/:sdt",
    component: ThemBenhAnMoi,
    Layout: AdminLayout,
  },
  {
    path: "/cap-nhat-tai-khoan",
    component: CapNhatTaiKhoan,
    Layout: AdminLayout,
  }
];

export default DentistRouter;
