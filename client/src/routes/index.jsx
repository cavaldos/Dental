import DefaultLayout from "~/components/layout/defaultLayout";

import SignInPage from "~/pages/online/signin";
import SignUpPage from "~/pages/online/signup";
import HomePage from "~/pages/online/home";

import AdminPage from "~/pages/admin";
import GuestPage from "~/pages/guest";
import StaffPage from "~/pages/staff";
import DentistPage from "~/pages/dentist";

const OnlineRouter = [
  {
    path: "/",
    component: HomePage,
    Layout: DefaultLayout ,
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
    Layout: DefaultLayout,
  },
 
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
 
];

const DentistRouter = [
  {
    path: "/",
    component: DentistPage,
    Layout: DefaultLayout,
  },
  
];

export { OnlineRouter, AdminRouter, GuestRouter, StaffRouter, DentistRouter };
