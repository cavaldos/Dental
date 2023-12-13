//online
// import DefaultLayout from "~/components/layout/defaultLayout";
import { lazy } from "react";
const DefaultLayout = lazy(() => import("~/components/layout/defaultLayout"));
const HomePage = lazy(() => import("~/pages/online"));
const DanhSachNhaSi = lazy(() => import("~/pages/online/ListNhaSi"));
const DanhSachDichVu = lazy(() => import("~/pages/online/ListDV"));
const SignInPage = lazy(() => import("~/pages/online/signin"));
const SignUpPage = lazy(() => import("~/pages/online/signup"));
const TestSignIn = lazy(() => import("~/pages/online/testsignin"));

const OnlineRouter = [
  {
    path: "/",
    component: HomePage,
    Layout: DefaultLayout,
  },
  {
    path: "/doi-ngu-nha-khoa",
    component: DanhSachNhaSi,
    Layout: DefaultLayout,
  },
  {
    path: "/bang-gia-dich-vu",
    component: DanhSachDichVu,
    Layout: DefaultLayout,
  },
  {
    path: "/signin",
    component: SignInPage,
    Layout: null,
  },
  {
    path: "/signins",
    component: TestSignIn,
    Layout: null,
  },
  {
    path: "/signup",
    component: SignUpPage,
    Layout: null,
  },
];

export default OnlineRouter;
