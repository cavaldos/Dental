import { RouterProvider } from "react-router-dom";

import {
  GuestRouter,
  AdminRouter,
  DentistRouter,
  StaffRouter,
  OnlineRouter,
} from "~/routes";
import { useSelector } from "react-redux";
import { useState } from "react";
function App() {
  const routes = useSelector((state) => state.route.route);


  return (
    <>
      <RouterProvider router={OnlineRouter} />
    </>
  );
}

export default App;
