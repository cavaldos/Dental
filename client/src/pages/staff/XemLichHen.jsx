import {lichhen} from "../../fakedata/lhnv";
import '../../assets/styles/admin.css'

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  DatePicker,
  Tag,
  Space,
  InputNumber,
} from "antd";

import {
  SearchOutlined,
  StopOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ColumnSearch from "~/hooks/useSortTable";
import TextArea from "antd/es/input/TextArea";

import {ButtonGreen, ButtonPink} from "../../components/button";
import moment from 'moment';

const { Option } = Select;


const LichhenTabble = ({ appointment }) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});

  const handleDelete = (record) => {
    console.log("record", record);
    setOpenDeleteModal(true);
    setData1(record);
  };

  const handleAddMedicine = (record) => {
    setOpenAddModal(true);
    setData2(record);
  };

  const handleEdit = (record) => {
    setOpenEditModal(true);
    setData3({ ...record });
  };

  const handleCancelDelete = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const handleCancelAdd = useCallback(() => {
    setOpenAddModal(false);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const columns = [
    {
      title: "Mã ca",
      dataIndex: "MACA",
      key: "MACA",
      ...ColumnSearch("MACA", "Mã ca"),
    },
    {
      title: "Ngày khám",
      dataIndex: "NGAY",
      key: "NGAY",
      render: (text) => {
        const formattedDate = new Date().toLocaleDateString();
        return formattedDate;
      },
    },
    {
      title: "Giờ khám",
      dataIndex: "GIOBATDAU",
      key: "GIOBATDAU",
      render: (text) => {
        const time = new Date(text);
        const formattedTime = time.toLocaleTimeString('en-US', options);
        return formattedTime;
      },
      sorter: (a, b) => a.GIOBATDAU - b.GIOBATDAU,
    },
    {
      title: "Mã NS",
      dataIndex: "MANS",
      key: "MANS",
    },
    {
      title: "Tên nha sĩ",
      dataIndex: "NS_HOTEN",
      key: "NS_HOTEN",
      width: "14%",
      ...ColumnSearch("NS_HOTEN", "Tên nha sĩ"),
    },
    {
      title: "Số ĐT khách",
      dataIndex: "SODT",
      key: "SODT",
      ...ColumnSearch("SODT", "Số điện thoại"),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "KH_HOTEN",
      key: "KH_HOTEN",
      width: "14%",
      sorter: (a, b) => a.KH_HOTEN - b.KH_HOTEN,
      ...ColumnSearch("KH_HOTEN", "Tên khách hàng"),
    },
    {
      title: "Lý do khám",
      dataIndex: "LYDOKHAM",
      key: "LYDOKHAM",
    },
    {
      title: "Quản lí",
      key: "action",
      fixed: "right",
      width: "9%",

      render: (text, record) => (
        <Space size="middle">
          <button
            className="text-orange font-montserrat hover:text-darkorange hover:underline mx-1"
            onClick={() => handleDelete(record)}
          >
            <StopOutlined /> Hủy hẹn
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={appointment.map((item, index) => ({ ...item, key: index }))}
        pagination={true}
        bordered
        size="middle"
        tableLayout="auto"
        scroll={{ x: "calc(900px + 50%)" }}
      />

      {/* <Modal
        title={
          <h1 className="font-montserrat text-xl mb-3 mt-2 font-extrabold">
            HỦY THUỐC
          </h1>
        }
        open={openDeleteModal}
        onCancel={handleCancelDelete}
        // onOk={handleSubmitDelete}
        footer={[]}
      >
        <ModalHuyThuoc data={data1} />
      </Modal>

      <Modal
        title={
          <h1 className="font-montserrat text-xl mb-3 mt-2 font-extrabold">
            NHẬP THÊM THUỐC VÀO KHO
          </h1>
        }
        open={openAddModal}
        onCancel={handleCancelAdd}
        // onOk={handleSubmitAdd}
        footer={[]}
      >
        <ModalNhapThuoc data={data2} />
      </Modal>

      <Modal
        title={
          <h1 className="font-montserrat text-xl mb-3 mt-2 font-extrabold">
            CẬP NHẬT THÔNG TIN THUỐC
          </h1>
        }
        open={openEditModal}
        onCancel={handleCancelEdit}
        // onOk={handleSubmitEdit}
        footer={[]}
      >
        <ModalCapNhatThuoc data={data3} />
      </Modal> */}
    </>
  );
};

const XemLichHen = () => {
  return (
    <>
      <div className=" rounded-lg w-full">
        <LichhenTabble appointment={lichhen} />
      </div>
    </>
  );
};

export default XemLichHen;
