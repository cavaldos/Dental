import DefaultLayout from "~/components/layout/defaultLayout";
import AdminLayout from "~/components/layout/adminLayout";

import HomePage from "~/pages/online/home";

import AdminPage from "~/pages/admin";
import GuestPage from "~/pages/guest";
import StaffPage from "~/pages/staff";
import DentistPage from "~/pages/dentist";

//  QTV
import QuanLiKH from "../pages/admin/QuanLiKH";
import QuanLiNS from "../pages/admin/QuanLiNS";
import QuanLiDV from "../pages/admin/QuanLiDV";
import QuanLiThuoc from "../pages/admin/QuanLiThuoc";
import QuanLiNV from "../pages/admin/QuanLiNhanVien";

// Nha si
import DangKiLichRanh from "../pages/dentist/DkLichRanh";
import XemBenhAnCu from "../pages/dentist/XemBenhAnCu";
import XemBenhAnMoi from "../pages/dentist/XemBenhAnMoi";
import XemLichHenNS from "../pages/dentist/XemLichHen";
import XemLichTruc from "../pages/dentist/XemLichTruc";
// Nhan vien
import DangKiTaiKhoanKhachHang from "../pages/staff/DangKiTaiKhoanKH";
import XemLichHen from "../pages/staff/xemLichHen";
import XemThuoc from "../pages/staff/Xemthuoc";
import XemDichVu from "../pages/staff/XemDichVu";
import HoSoBenh from "../pages/staff/HoSoBenh";
import HoaDon from "../pages/staff/HoaDon";
import DatLich from "../pages/staff/DatLich";
//online
import DanhSachNhaSi from "~/pages/online/ListNhaSi";
import DanhSachDichVu from "~/pages/online/ListDV";
import SignInPage from "~/pages/online/signin";
import SignUpPage from "~/pages/online/signup";
const OnlineRouter = [
  {
    path: "/",
    component: HomePage,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-danh-sach-nha-si",
    component: DanhSachNhaSi,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-danh-sach-dich-vu",
    component: DanhSachDichVu,
    Layout: DefaultLayout,
  },
  {
    path: "/signin",
    component: SignInPage,
    Layout: null,
  },
  {
    path: "/signup",
    component: SignUpPage,
    Layout: null,
  },
];
const GuestRouter = [
  {
    path: "/",
    component: GuestPage,
    Layout: DefaultLayout,
  },
  {
    path: "/dat-lich-hen",
    component: GuestPage,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-ho-so-benh",
    component: GuestPage,
    Layout: DefaultLayout,
  },
  {
    path: "/cap-nhat-tai-khoan",
    component: GuestPage,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-lich-hen",
    component: GuestPage,
    Layout: DefaultLayout,
  },
];

const AdminRouter = [
  {
    path: "/",
    component: AdminPage,
    Layout: AdminLayout,
  },
  {
    path: "/quan-li-khach-hang",
    component: QuanLiKH,
    Layout: AdminLayout,
  },
  {
    path: "/quan-li-nha-si",
    component: QuanLiNS,
    Layout: AdminLayout,
  },
  {
    path: "/quan-li-dich-vu",
    component: QuanLiDV,
    Layout: AdminLayout,
  },
  {
    path: "/quan-li-thuoc",
    component: QuanLiThuoc,
    Layout: AdminLayout,
  },
  {
    path: "/quan-li-nhan-vien",
    component: QuanLiNV,
    Layout: AdminLayout,
  },
];



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
    path: "/xem-lich-hen",
    component: XemLichHenNS,
    Layout: AdminLayout,
  },
  {
    path: "/xem-benh-an-cu",
    component: XemBenhAnCu,
    Layout: AdminLayout,
  },
  {
    path: "/tao-benh-an-moi",
    component: XemBenhAnMoi,
    Layout: AdminLayout,
  },
];

export { OnlineRouter, AdminRouter, GuestRouter, StaffRouter, DentistRouter };
