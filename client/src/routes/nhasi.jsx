
// Nha si
import AdminLayout from "~/components/layout/adminLayout";

import DangKiLichRanh from "../pages/dentist/DkLichRanh";
import XemBenhAnCu from "../pages/dentist/XemBenhAnCu";
import XemBenhAnMoi from "../pages/dentist/XemBenhAnMoi";
import XemLichHenNS from "../pages/dentist/XemLichHen";
import XemLichTruc from "../pages/dentist/XemLichTruc";
import DentistPage from "~/pages/dentist";


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

export default DentistRouter;   