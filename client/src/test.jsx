import { useEffect } from "react";
import { GetUserInfo } from "./redux/features/userSlice";
import AdminService from "./services/admin/index";
import StaffService from "./services/staff";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "./redux/features/userSlice";
import axios from "axios";
import Axios from "./services/Axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJRVFYwMDAxIiwidXNlclJvbGUiOiJRVFYiLCJpYXQiOjE3MDI0NTYzMzEsImV4cCI6MTcwMjQ1NjM5MX0.jq6sWsZa1BPgRnjbyZsU1Gyg0eSeqOvU5NHGx5GuuYE";

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

    axios
      .get("http://localhost:3000/checklogin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });

    // AdminService.getAllThuoc()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return <></>;
};
export default Test;
