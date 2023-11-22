import DefaultLayout from "~/components/layout/defaultLayout";
import AdminLayout from "~/components/layout/adminLayout";
import SignInPage from "~/pages/online/signin";
import SignUpPage from "~/pages/online/signup";
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

// Nhan vien
import DangKiTaiKhoanKhachHang from "../pages/staff/DangKiTaiKhoanKhachHang";
import AddPage from "~/pages/online/add";
const OnlineRouter = [
  {
    path: "/",
    component: HomePage,
    Layout: DefaultLayout ,
  },
  {
    path: "/add",
    component: AddPage,
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
  }
];

const GuestRouter = [
  {
    path: "/",
    component: GuestPage,
    Layout: DefaultLayout,
  },
  
];

const StaffRouter = [
  {
    path: "/",
    component: StaffPage,
    Layout: DefaultLayout,
  },
  {
    path: "/dang-ki-tk-kh",
    component: DangKiTaiKhoanKhachHang,
    Layout: DefaultLayout,
  },
  {
    path: "/dat-lich-hen",
    component: StaffPage,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-lich-hen",
    component: StaffPage,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-thuoc",
    component: StaffPage,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-dich-vu",
    component: StaffPage,
    Layout: DefaultLayout,
  },
  {
    path: "/ho-so-benh-an",
    component: StaffPage,
    Layout: DefaultLayout,
  },
  {
    path: "/hoa-don",
    component: StaffPage,
    Layout: DefaultLayout,
  },
];

const DentistRouter = [
  {
    path: "/",
    component: DentistPage,
    Layout: DefaultLayout,
  },
  {
    path: "/dang-ki-lich-ranh",
    component: DangKiLichRanh,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-lich-truc",
    component: DentistPage,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-lich-hen",
    component: DentistPage,
    Layout: DefaultLayout,
  },
  {
    path: "/xem-benh-an",
    component: DentistPage,
    Layout: DefaultLayout,
  },
  {
    path: "/tao-benh-an",
    component: DentistPage,
    Layout: DefaultLayout,
  },
];

export { OnlineRouter, AdminRouter, GuestRouter, StaffRouter, DentistRouter };
