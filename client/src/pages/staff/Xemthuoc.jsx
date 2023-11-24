import thuoc from "../../fakedata/thuoc";
import React, { useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import ColumnSearch from "~/hooks/useSortTable";

const MedicineInfo = ({ medicine }) => {
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const columns = [
    {
      title: "Mã thuốc",
      dataIndex: "MATHUOC",
      key: "MATHUOC",
      ...ColumnSearch("MATHUOC", "Mã thuốc"),
    },
    {
      title: "Tên thuốc",
      dataIndex: "TENTHUOC",
      key: "TENTHUOC",
      ...ColumnSearch("TENTHUOC", "Tên thuốc"),
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
    
  ];
  return (
    <Table
      className="table-striped"
      columns={columns}
      dataSource={medicine.map((item, index) => ({ ...item, key: index }))}
      pagination={true}
      bordered
      size="middle"
    />
  );
};

const XemThuoc = () => {
  return (
    <>
      <div className="">
        <MedicineInfo medicine={thuoc} />
      </div>
    </>
  );
};

export default XemThuoc;
