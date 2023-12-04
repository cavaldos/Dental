import axios from "axios";
import { useEffect, useState } from "react";
import Axios from "~/services/Axios";
import AdminService from "./services/admin/index";
import StaffService from "./services/staff";
const Test = () => {
  useEffect(() => {
    AdminService.getAllNhanVien().then((res) => {
      console.log(res);
    });
    AdminService.getAllKhachHang().then((res) => {
      console.log(res);
    });
    StaffService.getLichRanhNS().then((res) => {
      console.log(res);
    });
    StaffService.getAllThuoc().then((res) => {
      console.log(res);
    });
  }, []);

  return <></>;
};
export default Test;
