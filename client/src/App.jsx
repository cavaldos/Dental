import {
  OnlineRouter,
  AdminRouter,
  GuestRouter,
  StaffRouter,
  DentistRouter,
} from "~/routes";

import { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user);
  const VerifyRoure = () => {
    switch (user.role) {
      case "admin":
        return AdminRouter;
      case "guest":
        return GuestRouter;
      case "staff":
        return StaffRouter;
      case "dentist":
        return DentistRouter;
      default:
        return OnlineRouter;
    }
  };

  return (
    <>
      <Router>
        <Routes>
          {VerifyRoure().map((route, index) => {
            const Layout = route.Layout === null ? Fragment : route.Layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route
            path="*"
            element={
              <h1 className="text-3xl text-center mt-10">
                404 - Not Found
              </h1>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
