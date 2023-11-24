import { Empty } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useState } from "react";
const { Search } = Input;

const ChitietHoSoBenh = ({ searchResults }) => {
  return (
    <div className=" mt-3 rounded-md border border-gray-300 mx-2 p-3">
      <h1>ChitietHoSoBenh</h1>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
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
    <div className=" bg-white rounded-lg p-5 flex flex-col justify-center ">
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
