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
import "../../assets/styles/admin.css";
import ButtonGreen from "../../components/button";

const MedicineInfo = ({ medicine }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [data, setData] = useState();

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const formatCurrency = (amount) => {
    const formattedAmount = amount.toLocaleString("vi-VN");
    return `${formattedAmount} VND`;
  };

  const handleEdit = (record) => {
    message.info(`Edit ${record.MATHUOC} ${open3}`);
    setIsModalVisible(true);
    setOpen3(true);
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
      fixed: "left",
      ...ColumnSearch("MATHUOC", "Mã thuốc"),
    },
    {
      title: "Tên thuốc",
      dataIndex: "TENTHUOC",
      key: "TENTHUOC",
      fixed: "left",
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
      fixed: "right",
      // width: "20%",

      render: (text, record) => (
        <Space size="middle">
          <button
            className="text-orange font-montserrat hover:text-darkorange hover:underline"
            onClick={() => handleDelete(record)}
          >
            <StopOutlined /> Hủy
          </button>
          <button
            className="text-grin font-montserrat hover:text-darkgrin hover:underline"
            onClick={() => handleAddMedicine(record)}
          >
            <PlusCircleOutlined /> Nhập kho
          </button>
          <button
            className="text-blue font-montserrat hover:text-darkblue"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
        </Space>
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
        tableLayout="auto"
        scroll={{ x: "calc(900px + 50%)" }}
      />
      <Modal
        title={
          <h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">
            THÊM LOẠI THUỐC MỚI
          </h1>
        }
        open={isModalOpen}
        onCancel={handleCancel()}
        footer={[]}
      ></Modal>{" "}
      <Modal
        title={
          <h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">
            THÊM LOẠI THUỐC MỚI
          </h1>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      ></Modal>{" "}
      <Modal
        title={
          <h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">
            THÊM LOẠI THUỐC MỚI
          </h1>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      ></Modal>
    </>
  );
};

const CapNhatThongTinThuoc = ({ data, toggle }) => {
  console.log("toogle", toggle);
  // const [data, setdata] = useState({
  //   code: "MT02",
  //   name: "Vitamin B",
  //   unit: "Viên",
  //   indication: "3/200",
  //   price: 5000,
  // });
  const [medicineType, setMedicineType] = useState(data);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(!toggle);
  console.log("open", open);

  const handleSubmit = (values) => {
    console.log("Success:", values);
    message.success("Đăng kí thành công!");
    form.resetFields();
    setMedicineType(data);
  };

  const handleReset = () => {
    // Đặt lại giá trị trực tiếp trong hàm handleReset
    form.resetFields(); // Đặt lại trường của Form
    setMedicineType({}); // Đặt lại giá trị Form (nếu có)
  };

  const handleCancel = () => {
    //su dung toan tu 3 ngoi de tat toggle
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <Modal
      title={
        <h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">
          THÊM LOẠI THUỐC MỚI
        </h1>
      }
      open={open}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="bg-grin ">
        <Form
          onSubmit={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="Mã thuốc">
            <Input value={1} disabled />
          </Form.Item>
          <Form.Item label="Tên thuốc">
            <Input value={2} />
          </Form.Item>
          <Form.Item label="Đơn vị tính">
            <Select value={1}>
              <Select.Option value="Viên">Viên</Select.Option>
              <Select.Option value="Ống">Ống</Select.Option>
              <Select.Option value="Hộp">Hộp</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chỉ định">
            <Input value={2} />
          </Form.Item>
          <Form.Item label="Đơn giá">
            <Input value={1} />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleReset}
              style={{ marginRight: 10 }}
              type="danger"
            >
              HOÀN TÁC
            </Button>
            <ButtonGreen text="CẬP NHẬT" modal={""}></ButtonGreen>
          </Form.Item>
        </Form>
      </div>
    </Modal>
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
        form={form}
        name="registration-form"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={formValues}
      >
        <Form.Item
          label="Tên thuốc"
          name="tenthuoc"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập tên thuốc!" }]}
        >
          <Input placeholder="Tên thuốc." />
        </Form.Item>
        <Form.Item
          label="Đơn vị tính"
          name="donvitinh"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng chọn đơn vị tính!" }]}
        >
          <Select placeholder="Chọn đơn vị tính.">
            <Select.Option value="vien">Viên</Select.Option>
            <Select.Option value="ong">Ống</Select.Option>
            <Select.Option value="goi">Gói</Select.Option>
            <Select.Option value="chai">Chai</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Chỉ định"
          name="chidinh"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập chỉ định!" }]}
        >
          <TextArea
            showCount
            minLength={10}
            maxLength={500}
            style={{ height: 120 }}
            placeholder="Chỉ định sử dụng thuốc của nhà sản xuất."
          />
        </Form.Item>
        <Form.Item
          label="Số lượng nhập"
          name="soluongnhap"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập số lượng nhập!" }]}
        >
          <InputNumber
            min={10}
            placeholder="Số lượng thuốc dựa trên đơn vị tính."
          />
        </Form.Item>
        <Form.Item
          label="Ngày hết hạn"
          name="ngayhethan"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập ngày hết hạn!" }]}
        >
          <DatePicker placeholder="Ngày hết hạn của thuốc." />
        </Form.Item>
        <Form.Item
          label="Đơn giá"
          name="dongia"
          placeholder="VND"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập đơn giá!" }]}
        >
          <InputNumber min={500} placeholder="Đơn giá dựa trên đơn vị tính" />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleReset}
            style={{ marginRight: 10 }}
            type="danger"
          >
            ĐẶT LẠI
          </Button>
          <ButtonGreen text="THÊM THUỐC" modal={""}></ButtonGreen>
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
      <ButtonGreen text="THÊM LOẠI THUỐC MỚI" modal={showModal}></ButtonGreen>

      <Modal
        title={
          <h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">
            THÊM LOẠI THUỐC MỚI
          </h1>
        }
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
