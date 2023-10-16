import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        }}
        className=" min-h-[175px] w-[1220px] mx-auto mt-16 rounded-lg flex flex-col"
      >
        <div className=" bg-[#F7F7F7] h-[55px] rounded-t-lg border-b-[1px] border-gray-300 flex items-center">
          <h1 className=" text-2xl font-medium mx-4 ">Add Site</h1>
        </div>
        <div className="min-h-[100px]  flex flex-col gap-6 px-8 py-2">
          <div>
            <h1 className="text-xl font-medium text-gray-500">Name</h1>
            <input
              className="mt-2 h-11 w-full rounded-lg border-[1px] border-gray-300 px-4 "
              type="text"
              placeholder="name"
            />
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-500">Url</h1>
            <input
              className="mt-2 h-11 w-full rounded-lg border-[1px] border-gray-300 px-4"
              type="text"
              placeholder="url"
            />
          </div>
        </div>
        <div className="bg-[#F7F7F7] min-h-[60px] rounded-b-lg border-t-[1px] border-gray-300  mb-auto flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="ml-6 h-11 w-24 rounded-lg bg-blue-500 font-medium text-xl text-gray-100 "
          >
            List
          </button>
          <button className="ml-6 h-11 rounded-lg w-24 bg-green-500 font-medium text-xl text-gray-100 ">
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default AddPage;
