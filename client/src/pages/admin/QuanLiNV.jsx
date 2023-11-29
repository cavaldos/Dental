import nhanvien from "../../fakedata/nhanvien";
import React, { useState } from "react";
import { 
  Table, 
  Button, 
  Tag, 
  Modal, 
  Popconfirm, 
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  InputNumber,
} from "antd";
import ColumnSearch from "~/hooks/useSortTable";
import TextArea from "antd/es/input/TextArea";

import '../../assets/styles/admin.css'
import ButtonGreen from "../../components/button";
import { 
  SearchOutlined,
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
      width: "10%",
      className: "px-[60px] min-w-[100px] ",
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
      { <Form
        onSubmit={handleSubmit}
        form={form}
        name="registration-form"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={formValues}
      >
        <Form.Item
          label="Họ tên"
          name="hoten"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập họ tên nhân viên!" }]}
        >
          <Input placeholder="Họ và tên nhân viên."/>
        </Form.Item>
        <Form.Item
          label="Phái"
          name="phai"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Select placeholder="Chọn giới tính.">
            <Select.Option value="nam">Nam</Select.Option>
            <Select.Option value="nu">Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Vị trí công việc"
          name="vitricongviec"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập vị trí công việc!" }]}
        >
          <Input placeholder="Vị trí công việc phụ trách."/>
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleReset} style={{ marginRight: 10 }} type="danger">
            ĐẶT LẠI
          </Button>
          <ButtonGreen text="TẠO" modal={""}></ButtonGreen>
        </Form.Item>
      </Form> }
    </>
  );
};

const TaoNhanVienMoiButton = () => {
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
      <ButtonGreen text="THÊM NHÂN VIÊN MỚI" modal={showModal}></ButtonGreen>

      <Modal
        title={<h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">THÊM NHÂN VIÊN MỚI</h1>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <TaoNhanVienMoi />
      </Modal>
    </>
  );
};
const QuanLiNV = () => {
  return (
    <>
      <div className=" w-full">
        <TaoNhanVienMoiButton />
        <TableNhanVien staff={nhanvien} />
      </div>
    </>
  );
};
export default QuanLiNV;
