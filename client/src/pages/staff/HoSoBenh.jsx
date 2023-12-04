import { Empty } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useState, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";

const HoSoBenh = lazy(() => import("~/components/HoSoBenh"));
const { Search } = Input;
const XemHoSoBenh = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const lastPath = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  const [searchResults, setSearchResults] = useState("");
  const onSearch = (value) => {
    setSearchResults(value);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="text-center">
          <Search
            className="w-[1100px] rounded-2xl"
            placeholder="Tim Kiem Ho So Benh An (theo so dien thoai), nhap so bat ki vo day"
            allowClear
            onSearch={onSearch}
            suffix={<AudioOutlined />}
            size="large"
            defaultValue={lastPath === "ho-so-benh-an" ? "" : lastPath}
          />
        </div>

        {searchResults === "" ? (
          <Empty className="w-[1100px] mt-6 rounded-3xl border border-spacing-4" />
        ) : (
          <div className="flex flex-col gap-5 mt-5">
            <HoSoBenh sdt={searchResults} />
          </div>
        )}
      </div>
    </Suspense>
  );
};
export default XemHoSoBenh;
