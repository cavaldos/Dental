import thuoc from "../../fakedata/thuoc";
import React, { useState } from "react";
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
} from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import ColumnSearch from "~/hooks/useSortTable";
import TextArea from "antd/es/input/TextArea";
const MedicineInfo = ({ medicine }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const formatCurrency = (amount) => {
    const formattedAmount = amount.toLocaleString("vi-VN");
    return `${formattedAmount} VND`;
  };
  const handleEdit = (record) => {
    // Thực hiện cập nhật thông tin thuốc
    message.info(`Edit ${record.MATHUOC}`);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    // Đóng modal khi nhấp vào nút "Hủy"
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    // Thực hiện cập nhật thông tin thuốc
    setIsModalVisible(false); // Đóng modal sau khi cập nhật thành công
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
      render: (text) => formatCurrency(text),
    },
    {
      title: "Quản lí",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => handleEdit(record)}
          className="bg-blue-600"
          type="primary"
          icon={<EditOutlined />}
          size="small"
          key={`edit-${record.MATHUOC}`}
        >
          Edit
        </Button>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={medicine.map((item, index) => ({ ...item, key: index }))}
        pagination={true}
        bordered
        size="middle"
      />
      <Modal
        title="Chỉnh sửa thông tin thuốc"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            className="bg-blue-500"
            key="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="Mã thuốc">
            <Input />
          </Form.Item>
          <Form.Item label="Tên thuốc">
            <Input />
          </Form.Item>
          <Form.Item label="Đơn vị tính">
            <Select>
              <Select.Option value="Viên">Viên</Select.Option>
              <Select.Option value="Ống">Ống</Select.Option>
              <Select.Option value="Hộp">Hộp</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chỉ định">
            <Input />
          </Form.Item>
          <Form.Item label="Đơn giá">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const CapNhatThongTinThuoc = () => {
  const [medicineType, setMedicineType] = useState({
    code: "MT02",
    name: "Vitamin B",
    unit: "Viên",
    indication: "3/200",
    price: 5000,
  });

  const handleSubmit = () => {
    // Thực hiện cập nhật thông tin loại thuốc
  };
  return (
    <>
      <div className="bg-grin ">
        <Form
          onSubmit={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="Mã thuốc">
            <Input value={medicineType.code} />
          </Form.Item>
          <Form.Item label="Tên thuốc">
            <Input value={medicineType.name} />
          </Form.Item>
          <Form.Item label="Đơn vị tính">
            <Select value={medicineType.unit}>
              <Select.Option value="Viên">Viên</Select.Option>
              <Select.Option value="Ống">Ống</Select.Option>
              <Select.Option value="Hộp">Hộp</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chỉ định">
            <Input value={medicineType.indication} />
          </Form.Item>
          <Form.Item label="Đơn giá">
            <Input value={medicineType.price} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
            <Button type="danger">Hủy</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

const TaoThuocMoi = () => {
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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="registration-form"
        onFinish={handleSubmit}
        initialValues={formValues}
      >
        <Form.Item
          label="Tên thuốc"
          name="tenthuoc"
          rules={[{ required: true, message: "Vui lòng nhập tên thuốc!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Đơn vị tính"
          name="donvitinh"
          rules={[{ required: true, message: "Vui lòng nhập đơn vị tính!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Chỉ định"
          name="chidinh"
          minLength={6}
          rules={[{ required: true, message: "Vui lòng nhập chỉ định!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Số lượng nhập"
          name="soluongnhap"
          rules={[{ required: true, message: "Vui lòng nhập số lượng nhập!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày hết hạn"
          name="ngayhethan"
          rules={[{ required: true, message: "Vui lòng nhập ngày hết hạn!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Đơn giá"
          name="dongia"
          placeholder="VND"
          rules={[{ required: true, message: "Vui lòng nhập đơn giá!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="bg-blue-600 " type="primary" htmlType="submit">
            Tạo
          </Button>
          <Button onClick={handleReset} style={{ marginLeft: 8 }} type="danger">
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const TaoThuocMoiButton = () => {
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
        Tạo Thuốc Mới
      </Button>
      <Modal
        title={<h1 className="text-2xl mb-3">Tạo Thuốc Mới</h1>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <TaoThuocMoi />
      </Modal>
    </>
  );
};

const QuanLiThuoc = () => {
  return (
    <>
      <div className="w-full">
        <TaoThuocMoiButton />
        <MedicineInfo medicine={thuoc} />
      </div>
    </>
  );
};
export default QuanLiThuoc;
