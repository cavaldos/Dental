import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
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
