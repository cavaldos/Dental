import {
  OnlineRouter,
  AdminRouter,
  GuestRouter,
  StaffRouter,
  DentistRouter,
} from "~/routes";
import React, { Fragment, Suspense, lazy } from "react";

import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes,useNavigate } from "react-router-dom";
import Loading from "./components/err/loading";
const NotfoundError = lazy(() => import("~/components/err"));
import OnlineService from "./services/online";
import Axios from "./services/axios.config";
import GetCookie from "./hooks/GetCookie";
import {
  setRole,
  updateUserInfo,
  deleteRole,
} from "~/redux/features/userSlice";

import Test from "./test";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pass = GetCookie("password");
  React.useEffect(() => {
    OnlineService.checkLogin()
      .then((res) => {
        if (res.message === "ok") {
          Axios.post("/online/dangnhap", {
            matk: user.MAQTV || user.MANS || user.MANV || user.SODT,
            matkhau: pass,
          })
            .then((resp) => {
              dispatch(setRole(resp.data.info.ROLE));
              dispatch(updateUserInfo(resp.data.info));
            })
            .catch((error) => {
              console.log("err", error);
            });
        }
      })
      .catch((err) => {
        dispatch(deleteRole());
        navigate("/signins");

        console.log(err);
      });
  }, []);
  const VerifyRoure = () => {
    switch (user.ROLE) {
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
        <Suspense fallback={<Loading />}>
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
