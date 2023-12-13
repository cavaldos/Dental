// import {lichhen} from "../../fakedata/lhnv";
import "../../assets/styles/staff.css";
import StaffService from "../../services/staff";

import React, { useState, useCallback, useEffect } from "react";
import { Table, message, Modal, Form, Input, Select, Space } from "antd";

import { StopOutlined } from "@ant-design/icons";
import ColumnSearch from "~/hooks/useSortTable";

import { ButtonGreen, ButtonPink } from "../../components/button";

const ModalHuyThuoc = ({ data }) => {
  const [formValues, setFormValues] = useState(data);
  const [form] = Form.useForm();
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    form.setFieldsValue(data);
    if (data && data.GIOBATDAU && !formattedTime) {
      const time = new Date(data.GIOBATDAU);
      const options = { hour: "numeric", minute: "numeric" };
      const formattedTime = time.toLocaleTimeString("en-US", options);
      setFormattedTime(formattedTime);
    }
  }, [data, form, formattedTime]);

  const handleSubmit = (values) => {
    console.log("Success:", values);
    message.success("Hủy lịch hẹn thành công!");
    form.resetFields();
    setFormValues({});
    window.location.reload();
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        form={form}
        name="registration-form"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          GIOBATDAU: formattedTime,
        }}
      >
        <Form.Item label="Khách hàng" name="KH_HOTEN" style={{ width: "100%" }}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="Ngày hẹn" name="NGAY" style={{ width: "100%" }}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="Giờ hẹn" name="GIOBATDAU" style={{ width: "100%" }}>
          <Input value={formattedTime} disabled />
        </Form.Item>
        <Form.Item
          label="Nha sĩ đã hẹn"
          name="NS_HOTEN"
          style={{ width: "100%" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonPink text="HỦY LỊCH NÀY" func={""} />
        </Form.Item>
      </Form>
    </>
  );
};

const LichhenTabble = ({ appointment }) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [data1, setData1] = useState({});

  const handleDelete = (record) => {
    console.log("record", record);
    setOpenDeleteModal(true);
    setData1(record);
  };

  const handleCancelDelete = useCallback(() => {
    setOpenDeleteModal(false);
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
        const date = new Date(text);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      },
    },
    {
      title: "Giờ khám",
      dataIndex: "GIOBATDAU",
      key: "GIOBATDAU",
      render: (text) => {
        const time = new Date(text);
        const formattedTime = time.toLocaleTimeString("en-US", options);
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

      <Modal
        title={
          <h1 className="font-montserrat text-xl mb-3 mt-2 font-extrabold">
            XÁC NHẬN HỦY HẸN
          </h1>
        }
        open={openDeleteModal}
        onCancel={handleCancelDelete}
        footer={[]}
      >
        <ModalHuyThuoc data={data1} />
      </Modal>
    </>
  );
};

const XemLichHen = () => {
  const [lichHen, setLichHen] = useState([]);
  useEffect(() => {
    StaffService.getLichHenNS().then((res) => {
      console.log(res);
      setLichHen(res);
    });
  }, []);
  return (
    <>
      <div className=" rounded-lg w-full">
        <LichhenTabble appointment={ []} />
      </div>
    </>
  );
};

export default XemLichHen;
