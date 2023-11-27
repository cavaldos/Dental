import nhanvien from "../../fakedata/nhanvien";
import React, { useState } from "react";
import { Table, Button, Tag, Modal } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import ColumnSearch from "~/hooks/useSortTable";

import '../../assets/styles/admin.css'
import ButtonGreen from "../../components/button";

const TableNhanVien = ({ staff }) => {
  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "MANV",
      key: "MANV",
      ...ColumnSearch("MANV", "Mã nhân viên"),
    },
    {
      title: "Họ tên",
      dataIndex: "HOTEN",
      key: "HOTEN",
      ...ColumnSearch("HOTEN", "Họ tên"),
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
      ...ColumnSearch("VITRICV", "Vị trí công việc"),
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
        dataSource={staff.map((item, index) => ({ ...item, key: index }))}
        pagination={true}
        bordered
        size="middle"
        scroll={{x: 1000,}}
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
      <ButtonGreen text="THÊM TÀI KHOẢN MỚI" modal={showModal}></ButtonGreen>

      <Modal
        title="Tạo Nhân Viên Mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={handleOk}
            className=" bg-blue-500"
          >
            OK
          </Button>,
        ]}
      >
        <p> Viet form tao nhan vien moi trong day </p>
      </Modal>
    </>
  );
};
const QuanLiNV = () => {
  return (
    <>
      <div className=" w-full">
        <TaoNhanVienMoi />
        <TableNhanVien staff={nhanvien} />
      </div>
    </>
  );
};
export default QuanLiNV;
