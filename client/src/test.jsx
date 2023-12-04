import { useEffect } from "react";
import {GetUserInfo} from "./redux/features/userSlice";
import AdminService from "./services/admin/index";
import StaffService from "./services/staff";
import { useDispatch } from "react-redux";

const Test = () => {
  const CallApi = async () => {
    const res = await AdminService.getAllNhanVien();
    console.log(res);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(GetUserInfo({name: "test"}));



    // AdminService.getAllNhanVien().then((res) => {
    //   // console.log(res);
    // });
    // AdminService.getAllKhachHang().then((res) => {
    //   console.log(res);
    // });
    // StaffService.getLichRanhNS().then((res) => {
    //   console.log(res);
    // });
    // StaffService.getAllThuoc().then((res) => {
    //   console.log(res);
    // });
    // StaffService.getAllDV().then((res) => {
    //   console.log(res);
    // });
    // console.log("test");
    // CallApi();
  }, []);

  return <></>;
};
export default Test;
