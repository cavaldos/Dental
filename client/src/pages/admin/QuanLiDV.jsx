
import dv from "../../fakedata/dv";
import React from "react";
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
import ColumnSearch from "~/hooks/useSortTable";
import { useState } from "react";

import TextArea from "antd/es/input/TextArea";
import '../../assets/styles/admin.css'
import ButtonGreen from "../../components/button";
import { 
  SearchOutlined,
  EditOutlined, 
} from "@ant-design/icons";

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
      fixed: "left",
      className: "px-[60px] min-w-[120px] ",
      ...ColumnSearch("MADV", "Mã Dich vụ"),
    },
    {
      title: "Tên dich vụ",
      dataIndex: "TENDV",
      key: "TENDV",
      fixed: "left",
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
      fixed: 'right',
      width: "6%",
      render: (text, record) => (
        <Space size="middle">
          <a 
              className="text-blue font-montserrat text-sm hover:text-darkblue"
              onClick={() => handleUpdate(record.key)}>
              <EditOutlined/>
          </a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data.map((item, index) => ({ ...item, key: index }))}
      pagination={true}
      bordered
      size="middle"
      tableLayout="auto"
      scroll={{x: "calc(900px + 50%)",}}
    />
  );
};

const TaoDichVuMoi = () => {
  const [formValues, setFormValues] = useState({});
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    console.log("Success:", values);
    message.success("Đăng kí thành công!");
    form.resetFields();
    setFormValues({});
  };

  const handleReset = () => {
    form.resetFields();
    setFormValues({});
    message.success("Đã xóa thông tin!");
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        form={form}
        name="registration-form"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={formValues}
      >
        <Form.Item
          label="Tên dịch vụ"
          name="tendv"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
        >
          <Input placeholder="Tên dịch vụ."/>
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="mota"
          style={{ width: "100%" }}
          rules={[{required: true, message: "Vui lòng mô tả dịch vụ!" }]}
        >
          <TextArea showCount minLength={10} maxLength={500} style={{ height: 120, }}
              placeholder="Mô tả về dịch vụ nha khoa."/>
        </Form.Item>
        <Form.Item
          label="Đơn giá"
          name="dongia"
          placeholder="VND"
          style={{ width: "100%" }}
          rules={[
            { required: true, message: "Vui lòng nhập đơn giá!" }]}
        >
          <InputNumber min={50000} placeholder="Đơn giá dịch vụ phòng khám"/>
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleReset} style={{ marginRight: 10 }} type="danger">
            ĐẶT LẠI
          </Button>
          <ButtonGreen text="THÊM DỊCH VỤ" modal={""}></ButtonGreen>
        </Form.Item>
      </Form>
    </>
  );
};

const ThemDichVuMoiButton = () => {
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
      <ButtonGreen text="THÊM LOẠI DỊCH VỤ MỚI" modal={showModal}></ButtonGreen>

      <Modal
        title={<h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">THÊM LOẠI DỊCH VỤ MỚI</h1>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <TaoDichVuMoi />
      </Modal>
    </>
  );
};

const QuanliDV = () => {
  return (
    <>
      <div className=" w-full">
        <ThemDichVuMoiButton />
        <DichVuTable data={dv} />
      </div>
    </>
  );
};

export default QuanliDV;
