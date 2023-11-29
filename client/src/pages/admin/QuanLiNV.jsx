import nhanvien from "../../fakedata/nhanvien";
import React, { useState } from "react";
import { Table, Button, Tag, Modal, Popconfirm, Space} from "antd";
import ColumnSearch from "~/hooks/useSortTable";

import '../../assets/styles/admin.css'
import ButtonGreen from "../../components/button";
import { 
  EditOutlined, 
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

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
      title: "Tình trạng",
      dataIndex: "_DAKHOA",
      key: "_DAKHOA",
      render: (_, record) => {
        const tags = record._DAKHOA ? ["Đã khóa"] : ["Hoạt động"]; // Cập nhật với các giá trị trạng thái tùy chỉnh của bạn
        return (
          <>
            {tags.map((tag) => {
              let color = tag === "Đã khóa" ? "volcano" : "green"; // Tùy chỉnh màu sắc dựa trên trạng thái
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
      fixed: "right",
      width: "9%",
      className: "px-[60px] min-w-[120px] ",
      render: (_, record) => {
          const handleAction = record._DAKHOA == 0 ? handleLock : handleUnlock;
          const buttonText = record._DAKHOA == 0 ? "Khóa" : "Mở khóa";
          const buttonIcon = record._DAKHOA == 0 ? <LockOutlined /> : <UnlockOutlined />;

          return (
              <Space size="middle">
              <a 
                  className="text-blue font-montserrat text-sm hover:text-darkblue"
                  onClick={() => handleUpdate(record.key)}>
                  <EditOutlined/>
              </a>
              <Popconfirm title={`${buttonText} tài khoản này?`} onConfirm={() => handleAction(record.SODT)}>
                  <a className="text-blue font-montserrat text-sm hover:text-darkblue">{buttonIcon}</a>
              </Popconfirm>
              </Space>
          );
      },
  },
  ];

  const handleLock = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleUnlock = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={staff.map((item, index) => ({ ...item, key: index }))}
        pagination={true}
        bordered
        size="middle"
        scroll={{x: "max-content",}}
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
