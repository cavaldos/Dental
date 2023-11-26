//  QTV
import AdminLayout from "~/components/layout/adminLayout";
import { lazy } from "react";

import AdminPage from "~/pages/admin";
const QuanLiKH = lazy(() => import("~/pages/admin/QuanLiKH"));
const QuanLiNS = lazy(() => import("~/pages/admin/QuanLiNS"));
const QuanLiDV = lazy(() => import("~/pages/admin/QuanLiDV"));
const QuanLiThuoc = lazy(() => import("~/pages/admin/QuanLiThuoc"));
const QuanLiNV = lazy(() => import("~/pages/admin/QuanLiNV"));

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