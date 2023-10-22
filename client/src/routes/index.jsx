import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "~/components/layout/defaultLayout";

import HomePage from "~/pages/online/home";
import SignInPage from "~/pages/online/signin";
import SignUpPage from "~/pages/online/signup";

import AdminPage from "~/pages/admin";
import DentistPage from "~/pages/dentist";
import GuestPage from "~/pages/guest";
import StaffPage from "~/pages/staff";

const OnlineRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

const GuestRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <GuestPage />,
      },
    ],
  },
]);

const AdminRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <AdminPage />,
      },
    ],
  },
]);

const DentistRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <DentistPage />,
      },
    ],
  },
]);

const StaffRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <StaffPage />,
      },
    ],
  },
]);


export { GuestRouter, AdminRouter, DentistRouter, StaffRouter, OnlineRouter };