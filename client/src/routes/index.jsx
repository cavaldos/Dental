import { createBrowserRouter, Outlet } from "react-router-dom";

import HomePage from "../pages/home";

export default createBrowserRouter([
  {
    element: HomePage,
    path: "/",
  },
]);
