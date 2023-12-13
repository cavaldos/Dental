import { useEffect } from "react";
import { GetUserInfo } from "./redux/features/userSlice";
import AdminService from "./services/admin/index";
import StaffService from "./services/staff";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "./redux/features/userSlice";
import axios from "axios";
import Axios from "./services/Axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJRVFYwMDAxIiwidXNlclJvbGUiOiJRVFYiLCJpYXQiOjE3MDI0MTE5MTAsImV4cCI6MTcwNTAwMzkxMH0.i-AM-pEV2PhW84dilocZvduJ9u6vtAefDfdaGm6_9sI";
const Test = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(updateUserInfo({
    //   SODT: "123",
    //   MANS: "123",
    //   MANV: "123",
    //   HOTEN: "123",
    //   PHAI: "123",
    //   NGAYSINH: "123",
    //   DIACHI: "123",
    //   VITRICV: "123",
    // }));
    // console.log("Test");
    // dispatch(GetUserInfo({name:"adfads"}));

    Axios.get("http://localhost:3000/checklogin").then((res) =>
      console.log("khanh", res)
    );
  }, []);

  return <></>;
};
export default Test;
