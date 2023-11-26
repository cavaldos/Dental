


//online
import DefaultLayout from "~/components/layout/defaultLayout";

import HomePage from "~/pages/online";
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


export default OnlineRouter;