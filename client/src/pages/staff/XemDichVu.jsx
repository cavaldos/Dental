import thuoc from "../../fakedata/thuoc";
import dv from "../../fakedata/dv";
import React from "react";
import { Table } from "antd";
import ColumnSearch from "~/hooks/useSortTable";

const DichVuTable = ({ data }) => {

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
    },
  ];
  return (
    <Table
      className="table-striped"
      columns={columns}
      dataSource={data.map((item, index) => ({ ...item, key: index }))}
      pagination={true}
      bordered
      size="middle"
    />
  );
};

const XemDichVu = () => {
  return (
    <>
      <div className="">
        <DichVuTable data={dv} />
      </div>
    </>
  );
};

export default XemDichVu;
