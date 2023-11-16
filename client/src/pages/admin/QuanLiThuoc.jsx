import thuoc from "../../fakedata/thuoc";
import React, { useRef } from "react";
import { Table, Input, Button, Space, message } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";

const MedicineInfo = ({ medicine }) => {
  const searchInputRef = useRef(null);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
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
  });

  const columns = [
    {
      title: "Mã thuốc",
      dataIndex: "MATHUOC",
      key: "MATHUOC",
      ...getColumnSearchProps("MATHUOC", "Mã thuốc"),
    },
    {
      title: "Tên thuốc",
      dataIndex: "TENTHUOC",
      key: "TENTHUOC",
      ...getColumnSearchProps("TENTHUOC", "Tên thuốc"),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "DONVITINH",
      key: "DONVITINH",
    },
    {
      title: "Chỉ định",
      dataIndex: "CHIDINH",
      key: "CHIDINH",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "SLTON",
      key: "SLTON",
      sorter: (a, b) => a.SLTON - b.SLTON,
    },
    {
      title: "Số lượng nhập",
      dataIndex: "SLNHAP",
      key: "SLNHAP",
      sorter: (a, b) => a.SLNHAP - b.SLNHAP,
    },
    {
      title: "Số lượng đã hủy",
      dataIndex: "SLDAHUY",
      key: "SLDAHUY",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "NGAYHETHAN",
      key: "NGAYHETHAN",
      render: (text) => formatDateString(text),
    },
    {
      title: "Đơn giá",
      dataIndex: "DONGIA",
      key: "DONGIA",
      sorter: (a, b) => a.DONGIA - b.DONGIA,
    },
    {
      title: "Quản lí",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => message.info(`Edit ${record.TENTHUOC}`)}
          className="bg-blue-600"
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          size="small"
          key={`edit-${record.MATHUOC}`}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={medicine.map((item) => ({ ...item, key: item.MATHUOC }))}
      pagination={true}
      bordered
      size="middle"
    />
  );
};

const QuanLiThuoc = () => {
  return (
    <>
      <h1>QuanLiThuoc</h1>
      <MedicineInfo medicine={thuoc} />
    </>
  );
};

export default QuanLiThuoc;
