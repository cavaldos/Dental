import nhanvien from "../../fakedata/nhanvien";
import React, { useRef,useState } from "react";
import { Table, Input, Button, Tag, Space, message,Modal } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";

const TableNhanVien = ({ staff }) => {
  const searchInputRefs = useRef(null);
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
          ref={searchInputRefs}
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
      title: "Mã nhân viên",
      dataIndex: "MANV",
      key: "MANV",
      ...getColumnSearchProps("MANV", "Mã nhân viên"),
    },
    {
      title: "Họ tên",
      dataIndex: "HOTEN",
      key: "HOTEN",
      ...getColumnSearchProps("HOTEN", "Họ tên"),
    },
    {
      title: "Giới tính",
      dataIndex: "PHAI",
      key: "PHAI",
    },
    {
      title: "Vị trí công việc",
      dataIndex: "VITRICV",
      key: "VITRICV",
      ...getColumnSearchProps("VITRICV", "Vị trí công việc"),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        const tags = record._DAKHOA ? ["Locked"] : ["Open"]; // Update with your custom status values
        return (
          <>
            {tags.map((tag) => {
              let color = tag === "Locked" ? "volcano" : "green"; // Customize colors based on status
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Quản lí",
      key: "action",
      render: (text, record) => (
        <Button
          className="bg-blue-600"
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          size="small"
        >
          Edit
        </Button>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={staff.map((item) => ({ ...item, key: item.MANV }))}
        pagination={true}
        bordered
        size="middle"
      />
    </>
  );
};

const TaoNhanVienMoi = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button className="bg-green-600 mb-4" type="primary" onClick={showModal}>
        Tạo Nhân Viên Mới
      </Button>
      <Modal
        title="Tạo Nhân Viên Mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p> Viet form tao nhan vien moi trong day </p>
      </Modal>
    </>
  );
};
const QuanLiNV = () => {
  return (
    <>
      <TaoNhanVienMoi />
      <TableNhanVien staff={nhanvien} />
    </>
  );
};
export default QuanLiNV;
