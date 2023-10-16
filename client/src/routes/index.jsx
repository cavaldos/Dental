import { createBrowserRouter, Outlet } from "react-router-dom";

import HomePage from "~/pages/home";
import AddPage from "~/pages/add";
export default createBrowserRouter([
  {
    element: <HomePage />,
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
