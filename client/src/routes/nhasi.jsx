// Nha si
import AdminLayout from "~/components/layout/adminLayout";
import { lazy } from "react";

import DentistPage from "~/pages/dentist";
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
];

export default DentistRouter;
