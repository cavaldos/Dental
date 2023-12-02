import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const ThemBenhAnMoi = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const lastPart = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  const [showForm, setShowForm] = useState(false);
  const [dichVuList, setDichVuList] = useState([]);

  // Hàm gọi API để lấy danh sách dịch vụ
  const fetchDichVuList = () => {
      const data = [
        {
          id: 1,
          name: "Cạo vôi răng",
        },
        {
          id: 2,
          name: "Chụp hình răng",
        },
        {
          id: 3,
          name: "Nhổ răng",
        },
      ];
    // fetch("api/dichvu")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDichVuList(data);
    //   });
    setDichVuList(data);
    
  };

  const handleThemDichVuClick = () => {
    setShowForm(true);
    fetchDichVuList();
  };

  return (
    <>
      <div className="bg-gray-300 min-h-[500px]  min-w-[70%] p-3">
        <h1 className="text-2xl mb-5 font-bold">
          Them benh an moi cho khach hang
        </h1>
        <div className="flex">
          <h1 className="text-gray-600 mr-3">So Thu Tu Ho So:</h1>
          <p>{"6"}</p>
        </div>
        <div className="flex ">
          <h1 className="text-gray-600 mr-3">Ngay Kham:</h1>
          <p>{"5-1-2024"}</p>
        </div>
        <div className="flex">
          <h1 className="text-gray-600 mr-3">Nha Si:</h1>
          <p>{"Hoang Thi Ngoc Anh"}</p>
        </div>
        <div className="mb-5">
          <h1 className="text-gray-600 mr-3">Dan Do</h1>
          <TextArea
            className="border border-spacing-2"
            rows={6}
            placeholder="maxLength is 6"
            maxLength={5}
          />
        </div>
        <div className="text-gray-600 mr-3 my-5">
          <h1 className="text-gray-600 mr-3">Dich Vu:</h1>
          
          {showForm ? (
            <form>
              <Select defaultValue="" style={{ width: 200 }}>
                {dichVuList.map((dichVu) => (
                  <Option key={dichVu.id} value={dichVu.id}>
                    {dichVu.name}
                  </Option>
                ))}
              </Select>
            </form>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleThemDichVuClick}
            >
              Thêm dịch vụ
            </button>
          )}
        </div>
        <div className="text-gray-600 mr-3 my-5">
          <h1 className="text-gray-600 mr-3">Thuoc:</h1>
        </div>
      </div>
    </>
  );
};

export default ThemBenhAnMoi;
