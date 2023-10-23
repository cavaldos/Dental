import { useNavigate } from "react-router-dom";
import Header from "~/components/header/header";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full flex ">
        <h1 className="mx-auto">Home page</h1>
      </div>
    </>
  );
};
export default HomePage;
