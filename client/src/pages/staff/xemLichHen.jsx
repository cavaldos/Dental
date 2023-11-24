import {lichhen} from "../../fakedata/lhnv";

import thuoc from "../../fakedata/thuoc";
import React from "react";
import { Table, Input, Button, Space, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ColumnSearch from "~/hooks/useSortTable";

const LichhenTabble = ({ data }) => {
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Date().toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedTime} ${formattedDate} `;
  };

  const columns = [
    {
      title: "Mã ca",
      dataIndex: "MACA",
      key: "MACA",
      ...ColumnSearch("MACA", "Mã ca"),
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "GIOBATDAU",
      key: "GIOBATDAU",
      render: (text) => formatDateString(text),
      sorter: (a, b) => a.GIOBATDAU - b.GIOBATDAU,
    },
    {
      title: "Mã nha sĩ",
      dataIndex: "MANS",
      key: "MANS",
    },
    {
      title: "Tên nha sĩ",
      dataIndex: "NS_HOTEN",
      key: "NS_HOTEN",
      ...ColumnSearch("NS_HOTEN", "Tên nha sĩ"),
    },
    {
      title: "Số  điện thoại khách hàng",
      dataIndex: "SODT",
      key: "SODT",
      ...ColumnSearch("SODT", "Số điện thoại"),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "KH_HOTEN",
      key: "KH_HOTEN",
      sorter: (a, b) => a.KH_HOTEN - b.KH_HOTEN,
      ...ColumnSearch("KH_HOTEN", "Tên khách hàng"),
    },
    {
      title: "Quản lí",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => message.info(`Edit ${record.NS_HOTEN}`)}
          className="bg-blue-600"
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          size="small"
          key={`edit-${record.MANS}`}
        >
          Edit
        </Button>
      ),
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

const XemLichHen = () => {
  return (
    <>
      <div className="bg-white rounded-lg">
        <LichhenTabble data={lichhen} />
      </div>
    </>
  );
};

export default XemLichHen;
