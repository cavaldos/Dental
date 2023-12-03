import { Empty } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useState } from "react";
import HoSoBenh from "~/components/HoSoBenh";
import { useLocation } from "react-router-dom";
const { Search } = Input;

const XemBenhAnCu = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const lastPath = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  const [searchResults, setSearchResults] = useState("");
  const onSearch = (value) => {
    setSearchResults(value);
  };

  return (
    <div className=" bg-white rounded-lg p-5 flex flex-col w-full  ">
      <div className=" mx-2">
        <Search
          className="w-[600px]"
          placeholder="Tim Kiem Ho So Benh An (theo so dien thoai), nhap so bat ki vo day"
          allowClear
          onSearch={onSearch}
          suffix={<AudioOutlined />}
          size="large"
          defaultValue={lastPath==="xem-benh-an-cu"?"":lastPath}
        />
      </div>

      {searchResults === "" ? (
        <Empty className=" mt-3 rounded-md border border-spacing-4" />
      ) : (
        <div className="flex flex-col gap-5 mt-5">
          <HoSoBenh sdt={searchResults} />
        </div>
      )}
    </div>
  );
};
export default XemBenhAnCu;
