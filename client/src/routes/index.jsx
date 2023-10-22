import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "../components/layout/default.layout";

import AdminPage from "~/pages/admin";
export default createBrowserRouter([
  {
    element: <DefaultLayout />,
    path: "/",
  },
  {
    element: <AddPage />,
    path: "/add",
  },
  {
    element: HomePage,
    path: "/signup",
  },
  {
    element: HomePage,
    path: "/signin",
  },
]);
