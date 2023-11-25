import nhasi from "../../fakedata/nhasi";
import React from "react";
import { Table, Modal, Button, message, Tag } from "antd";
import ColumnSearch from "~/hooks/useSortTable";
import { useState } from "react";

const NhaSiTable = ({ data }) => {
  const columns = [
    {
      title: "Mã NS",
      dataIndex: "MANS",
      key: "MANS",
      className: "text-center px-[60px] min-w-[100px] ",
      ...ColumnSearch("MANS", "Mã NS"),
    },
    {
      title: "Họ và tên",
      dataIndex: "HOTEN",
      key: "HOTEN",
      className: "text-center px-[60px] min-w-[100px] ",

      ...ColumnSearch("HOTEN", "Họ và tên"),
    },
    {
      title: "Giới tính",
      dataIndex: "PHAI",
      key: "PHAI",
      className: "text-center px-[60px] min-w-[100px] ",
    },
    {
      title: "Giới thiệu",
      dataIndex: "GIOITHIEU",
      key: "GIOITHIEU",
    },

    {
      title: "Đã khóa",
      dataIndex: "_DAKHOA",
      key: "_DAKHOA",
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
      className: "text-center px-[60px] min-w-[120px] ",
      render: (text, record) => (
        <Button
          className="bg-blue-600"
          type="primary"
          size="small"
          onClick={() => message.info(`Edit ${record.HOTEN} , ${text.MANS}`)}
        >
          Sửa
        </Button>
      ),
    },
  ];

   const paginationOptions = {
     pageSize: 6, 
     total: data.length,
     showSizeChanger: true, 
     showQuickJumper: true, 
   };

  return (
    <Table
      className="table-striped w-full"
      columns={columns}
      dataSource={data.map((item, index) => ({ ...item, key: index }))}
      pagination={paginationOptions}
      bordered
      size="middle"
    />
  );
};

const ThemNhaSiMoi = () => {
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
        Thêm Nha Sĩ Mới
      </Button>
      <Modal
        title="Tạo Nha Sĩ Mới"
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
        <p> Viet form tao nha si moi trong day </p>
      </Modal>
    </>
  );
};

const QuanliNS = () => {
  return (
    <>
      <div className=" w-full z-0">
        <ThemNhaSiMoi />
        <NhaSiTable data={nhasi} />
      </div>
    </>
  );
};

export default QuanliNS;
