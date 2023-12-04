import axios from "axios";
import { useEffect, useState } from "react";
import Axios from "~/services/Axios";
import useCookie from "./hooks/useCookie";
const Test = () => {
  const [token, setToken, removeToken] = useCookie("token", "");
  useEffect(() => {
    setToken("123dddddddddddddd");
  }, []);

  return <></>;
};
export default Test;
