
import dv from "../../fakedata/dv";
import React from "react";
import { Table, Modal, Button, message } from "antd";
import ColumnSearch from "~/hooks/useSortTable";
import { useState } from "react";

import '../../assets/styles/admin.css'
import ButtonGreen from "../../components/button";

const DichVuTable = ({ data }) => {
    const formatCurrency = (amount) => {
      const formattedAmount = amount.toLocaleString("vi-VN");
      return `${formattedAmount} VND`;
    };

  const columns = [
    {
      title: "Mã Dich vụ",
      dataIndex: "MADV",
      key: "MADV",
      className: "text-center px-[60px] min-w-[120px] ",
      ...ColumnSearch("MADV", "Mã Dich vụ"),
    },
    {
      title: "Tên dich vụ",
      dataIndex: "TENDV",
      key: "TENDV",
      ...ColumnSearch("TENDV", "Tên dich vụ"),
    },
    {
      title: "Mô tả",
      dataIndex: "MOTA",
      key: "MOTA",
      ...ColumnSearch("MOTA", "Mô tả"),
    },
    {
      title: "Đơn giá",
      dataIndex: "DONGIA",
      key: "DONGIA",
      className: "text-center px-[60px] min-w-[120px] ",
      sorter: (a, b) => a.DONGIA - b.DONGIA,
      render: (text) => formatCurrency(text),
    },
    {
      title: "Quản lí",
      key: "action",
      className: "text-center px-[60px] min-w-[120px] ",
      render: (text, record) => (
        <Button
          className="bg-blue-600"
          type="primary"
          size="small"
          onClick={
            () => message.info(`Edit ${record.TENDV}`)
          }
        >
          Sửa
        </Button>
      ),
    }
  ];
  return (
    <Table
      columns={columns}
      dataSource={data.map((item, index) => ({ ...item, key: index }))}
      pagination={true}
      bordered
      size="middle"
    />
  );
};

const ThemDichVuMoi = () => {
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
      <ButtonGreen text="THÊM DỊCH VỤ MỚI" modal={showModal}></ButtonGreen>

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

const QuanliDV = () => {
  return (
    <>
      <div className=" w-full">
        <ThemDichVuMoi />
        <DichVuTable data={dv} />
      </div>
    </>
  );
};

export default QuanliDV;
