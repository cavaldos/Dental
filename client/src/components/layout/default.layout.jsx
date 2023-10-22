import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <h1 className="text-red-600">Default Layout</h1>
      <Outlet />
    </>
  );
};

export default DefaultLayout;
