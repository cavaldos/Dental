//  QTV
import AdminLayout from "~/components/layout/adminLayout";


import AdminPage from "~/pages/admin";
import QuanLiKH from "../pages/admin/QuanLiKH";
import QuanLiNS from "../pages/admin/QuanLiNS";
import QuanLiDV from "../pages/admin/QuanLiDV";
import QuanLiThuoc from "../pages/admin/QuanLiThuoc";
import QuanLiNV from "../pages/admin/QuanLiNhanVien";

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
export default AdminRouter;