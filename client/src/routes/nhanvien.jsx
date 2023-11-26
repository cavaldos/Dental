import AdminLayout from "~/components/layout/adminLayout";

import { lazy } from "react";


import StaffPage from "~/pages/staff";
const DangKiTaiKhoanKhachHang = lazy(() => import("../pages/staff/DangKiTaiKhoanKH"));
const XemLichHen = lazy(() => import("../pages/staff/XemLichHen"));
const XemThuoc = lazy(() => import("../pages/staff/XemThuoc"));
const XemDichVu = lazy(() => import("../pages/staff/XemDichVu"));
const HoSoBenh = lazy(() => import("../pages/staff/HoSoBenh"));
const HoaDon = lazy(() => import("../pages/staff/HoaDon"));
const DatLich = lazy(() => import("../pages/staff/DatLich"));


const StaffRouter = [
  {
    path: "/",
    component: StaffPage,
    Layout: AdminLayout,
  },
  {
    path: "/dang-ki-tk-kh",
    component: DangKiTaiKhoanKhachHang,
    Layout: AdminLayout,
  },
  {
    path: "/dat-lich-hen",
    component: DatLich,
    Layout: AdminLayout,
  },
  {
    path: "/xem-lich-hen",
    component: XemLichHen,
    Layout: AdminLayout,
  },
  {
    path: "/xem-thuoc",
    component: XemThuoc,
    Layout: AdminLayout,
  },
  {
    path: "/xem-dich-vu",
    component: XemDichVu,
    Layout: AdminLayout,
  },
  {
    path: "/ho-so-benh-an",
    component: HoSoBenh,
    Layout: AdminLayout,
  },
  {
    path: "/hoa-don",
    component: HoaDon,
    Layout: AdminLayout,
  },
];

export default StaffRouter;
