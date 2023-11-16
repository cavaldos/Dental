import nhanvien from "../../fakedata/nhanvien";
import React, { useRef } from "react";
import { Table, Input, Button, Tag, message } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";

const TableNhanVien = ({ staff }) => {
  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "MANV",
      key: "MANV",
    },
    {
      title: "Họ tên",
      dataIndex: "HOTEN",
      key: "HOTEN",
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

const QuanLiNV = () => {
  return (
    <>
      <h1>QuanLiTV</h1>
      <TableNhanVien staff={nhanvien} />
    </>
  );
};
export default QuanLiNV;
