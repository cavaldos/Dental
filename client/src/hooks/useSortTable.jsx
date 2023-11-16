import React, { useRef, useState } from "react";
import {  Input, Button, Space} from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";

const useColumnSearch = (dataIndex, placeholder) => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const searchInputRef = useRef(null);

  const getColumnSearchProps = {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
          ref={searchInputRef}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              setSelectedKeys([]);
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select(), 100);
      }
    },
  };

};




export default useColumnSearch;