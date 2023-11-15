import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Menu = ({ name, icon, path, toggle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-start align-middle h-14 cursor-pointer rounded-md bg-slate-100 mx-2 transition-all duration-300 ${
        toggle ? "pl-2 pr-8" : "pl-8 pr-2"
      }`}
    >
      <div
        className={`flex justify-center items-center w-14 h-14 rounded-md transition-all duration-300 ${
          toggle ? "mr-2" : "ml-1"
        }`}
      >
        {icon}
      </div>
      {!toggle && (
        <p
          className={`text-black text-lg font-semibold transition-all duration-300 ${
            toggle ? "opacity-0" : "opacity-100"
          }`}
        >
          {name}
        </p>
      )}
    </button>
  );
};

const Sidebar = (props) => {
  const navigate = useNavigate();
  const toggle = props.toggle;

  const menuItem = [
    {
      name: "Quản lí thuốc",
      icon: <AiOutlineMenuFold size={30} />,
      path: "/quan-li-thuoc",
    },
    {
      name: "Quản lí dịch vụ",
      icon: <AiOutlineMenuFold size={30} />,
      path: "/quan-li-dich-vu",
    },
    {
      name: "Quản lí thành viên",
      icon: <AiOutlineMenuFold size={30} />,
      path: "/quan-li-thanh-vien",
    },
    {
      name: "Quản lí nha sĩ",
      icon: <AiOutlineMenuFold size={30} />,
      path: "/quan-li-nha-si",
    },
    {
      name: "Quản lí khách hàng",
      icon: <AiOutlineMenuFold size={30} />,
      path: "/quan-li-khach-hang",
    },
  ];

  return (
    <>
      <div className="h-[70px]">LOGO</div>
      <div className="flex flex-col gap-2">
        {menuItem.map((item, index) => (
          <Menu
            key={index}
            name={item.name}
            icon={item.icon}
            path={item.path}
            toggle={toggle}
          />
        ))}
      </div>
    </>
  );
};

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div
          className={`w-[18vw] bg-slate-500 h-screen overflow-y-auto sticky top-0 transition-all duration-300 ${
            sidebarCollapsed ? "w-[5vw]" : ""
          }`}
        >
          <Sidebar toggle={sidebarCollapsed} />
        </div>
        <div className="w-full  flex flex-col">
          <div className="bg-gray-50 h-[70px] sticky top-0 flex justify-between items-center px-5 shadow-lg shadow-gray-500/50">
            <div className="flex items-center">
              <button className="" onClick={toggleSidebar}>
                {sidebarCollapsed ? (
                  <AiOutlineMenuUnfold size={30} />
                ) : (
                  <AiOutlineMenuFold size={30} />
                )}
              </button>
            </div>
            <div className="">account</div>
          </div>
          <div className="bg-slate-400 min-h-[89vh] m-5 rounded-lg p-4 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
