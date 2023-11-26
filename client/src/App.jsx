import {
  OnlineRouter,
  AdminRouter,
  GuestRouter,
  StaffRouter,
  DentistRouter,
} from "~/routes";
import NotfoundError from "~/components/err";
import { Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import Test from "./test";
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
      <Test />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
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
                <Fragment>
                  <NotfoundError />
                </Fragment>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
