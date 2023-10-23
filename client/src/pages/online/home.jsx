import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full flex ">
        <div className="mx-auto">
          <div
            style={{
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            }}
            className=" min-h-[175px] w-[1120px] mx-auto mt-16 rounded-lg flex flex-col"
          >
            <div className=" bg-[#F7F7F7] h-[70px] rounded-t-lg border-b-[1px] border-gray-300 flex items-center">
              <h1 className=" text-2xl font-medium mx-4 ">Sites</h1>
              <button
                onClick={() => navigate("/add")}
                className=" ml-auto mx-7 font-medium text-xl text-blue-600 border border-blue-500 px-4 py-2 rounded-md"
              >
                {" "}
                Add Site
              </button>
            </div>
            <div className="min-h-[100px]  flex px-8 pt-2">
              <div className="h-[100px] flex  w-full px-8 pt-2 ">
                <div className="flex-1">#</div>
                <div className="flex-1">Name</div>
                <div className="flex-1">Url</div>
              </div>
            </div>
            <div className="bg-[#F7F7F7] min-h-[60px] rounded-b-lg border-t-[1px] border-gray-300  mb-auto flex items-center">
              <h1 className="ml-6  font-medium text-xl text-gray-500 ">Footer</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
