// Nhan vien
import StaffPage from "~/pages/staff";
import DangKiTaiKhoanKhachHang from "../pages/staff/DangKiTaiKhoanKH";
import XemLichHen from "../pages/staff/xemLichHen";
import XemThuoc from "../pages/staff/Xemthuoc";
import XemDichVu from "../pages/staff/XemDichVu";
import HoSoBenh from "../pages/staff/HoSoBenh";
import HoaDon from "../pages/staff/HoaDon";
import DatLich from "../pages/staff/DatLich";

import AdminLayout from "~/components/layout/adminLayout";

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
