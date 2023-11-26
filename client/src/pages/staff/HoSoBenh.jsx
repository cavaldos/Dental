import { Empty } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useState } from "react";
const { Search } = Input;

const ChitietHoSoBenh = ({ searchResults }) => {
  const hoSoBenh = {
    Hoten: "Nguyen Van A",
    sdt: "0123456789",
    stt: "1",
    Nhasi: "Nguyen Van B",
    dando: "Dang dieu tri",
  };
  return (
    <div className=" mt-3 rounded-md border border-gray-300 mx-2 p-3 w-[50vw]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-lg font-bold">Ho Ten: {hoSoBenh.Hoten}</div>
          <div className="text-lg font-bold">SDT: {hoSoBenh.sdt}</div>
          <div className="text-lg font-bold">STT: {hoSoBenh.stt}</div>
          <div className="text-lg font-bold">Nha Si: {hoSoBenh.Nhasi}</div>
          <div className="text-lg font-bold">Tinh Trang: {hoSoBenh.dando}</div>
        </div>
      </div>
    </div>
  );
};

const HoSoBenh = () => {
  const [searchResults, setSearchResults] = useState([]);
  const onSearch = (value) => {
    // Make API call here with the search value
    // Replace the following code with your actual API call implementation
    const mockAPIResults = ["Result 1", "Result 2", "Result 3"];
    setSearchResults(mockAPIResults);
  };
  return (
    <div className=" bg-white rounded-lg p-5 flex flex-col w-full  ">
      <div className=" mx-2">
        <Search
          className="w-[600px]"
          placeholder="Tim Kiem Ho So Benh An"
          allowClear
          onSearch={onSearch}
          suffix={<AudioOutlined />}
          size="large"
        />
      </div>
      <ChitietHoSoBenh searchResults={searchResults} />

      {searchResults.length > 0 ? (
        <ChitietHoSoBenh searchResults={searchResults} />
      ) : (
        <Empty className=" mt-3 rounded-md border border-spacing-4" />
      )}
    </div>
  );
};
export default HoSoBenh;
