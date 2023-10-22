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

  const routersMap = {
    guest: GuestRouter,
    admin: AdminRouter,
    dentist: DentistRouter,
    staff: StaffRouter,
    default: OnlineRouter,
  };
  console.log(routes);
  const [veryroute, setVeryroute] = useState(routersMap.default);
  // switch (routes) {
  //   case "guest":
  //     veryroute = routersMap.guest;
  //     break;
  //   case "admin":
  //     veryroute = routersMap.admin;
  //     break;
  //   case "dentist":
  //     veryroute = routersMap.dentist;
  //     break;
  //   case "staff":
  //     veryroute = routersMap.staff;
  //     break;
  //   default:
  //     veryroute = routersMap.default;
  //     break;
  // }
  // setVeryroute(routersMap.admin);

  return (
    <>
      <RouterProvider router={veryroute} />
    </>
  );
}

export default App;
