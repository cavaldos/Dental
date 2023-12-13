import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  // const navigate = useNavigate();
  // useEffect( () => {
  //   axios
  //     .get("https://fakestoreapi.com/producdts")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <>
      <div className="bg-red-100 flex justify-center">
        <h1>
          chao mung ban den voi nha khoa Fivu
          <p> trang này edit mấy cái slider cho web nha</p>
        </h1>
      </div>
    </>
  );
};
export default HomePage;
