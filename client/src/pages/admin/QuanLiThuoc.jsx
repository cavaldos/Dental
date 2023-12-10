import thuoc from "../../fakedata/thuoc";
import "../../assets/styles/admin.css";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  InputNumber,
} from "antd";

import {
  StopOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ColumnSearch from "~/hooks/useSortTable";
import TextArea from "antd/es/input/TextArea";

import {ButtonGreen, ButtonPink} from "../../components/button";
import moment from 'moment';

const { Option } = Select;

const ModalHuyThuoc = ({ data }) => {
  data.NGAYHETHAN = data.NGAYHETHAN ? moment(data.NGAYHETHAN).format('YYYY-MM-DD'): undefined;
  const [formValues, setFormValues] = useState(data);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const handleSubmit = (values) => {
    console.log("Success:", values);
    message.success("Hủy thuốc thành công!");
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
        // initialValues={formValues}
      >
        <Form.Item
          label="Mã thuốc"
          name="MATHUOC"
          style={{ width: "100%" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tên thuốc"
          name="TENTHUOC"
          style={{ width: "100%" }}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="Đơn vị tính"
          name="DONVITINH"
          style={{ width: "100%" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Số thuốc sẽ hủy"
          name="SLTON"
          style={{ width: "100%" }}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="Ngày hết hạn"
          name="NGAYHETHAN"
          style={{ width: "100%" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonPink text="XÁC NHẬN HỦY THUỐC" func={""} />
        </Form.Item>
      </Form>
    </>
  );
};

const ModalNhapThuoc = ({ data }) => {
  const [formValues, setFormValues] = useState(data);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const handleSubmit = (values) => {
    console.log("Success:", values);
    message.success("Nhập thêm thuốc thành công!");
    form.resetFields();
    setFormValues({});
    window.location.reload();
  };

  const handleReset = () => {
    form.resetFields();
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
        // initialValues={formValues}
      >
        <Form.Item
          label="Mã thuốc"
          name="MATHUOC"
          style={{ width: "100%" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tên thuốc"
          name="TENTHUOC"
          style={{ width: "100%" }}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="Đơn vị tính"
          name="DONVITINH"
          style={{ width: "100%" }}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="Số lượng nhập"
          name="soluongnhap"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập số lượng nhập!" }]}
        >
          <InputNumber
            min={10}
            placeholder="Số lượng thuốc nhập thêm dựa trên đơn vị tính."
          />
        </Form.Item>
        <Form.Item
          label="Ngày hết hạn"
          name="ngayhethan"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập ngày hết hạn!" }]}
        >
          <DatePicker placeholder="Ngày hết hạn mới của thuốc." />
        </Form.Item>
        <Form.Item
          label="Đơn giá"
          name="DONGIA"
          style={{ width: "100%" }}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleReset}
            style={{ marginRight: 10 }}
            type="danger"
            // initialValues={formValues}
          >
            ĐẶT LẠI
          </Button>
          <ButtonGreen text="THÊM THUỐC" func={""}/>
        </Form.Item>
      </Form>
    </>
  );
};

const ModalCapNhatThuoc = ({ data }) => {
  const [formValues, setFormValues] = useState(data);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const handleSubmit = (values) => {
    console.log("Success:", values);
    message.success("Cập nhật thuốc thành công!");
    form.resetFields();
    setFormValues({});
    window.location.reload();
  };

  const handleReset = () => {
    form.resetFields();
    message.success("Hoàn tác quá trình cập nhật!");
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        form={form}
        name="registration-form"
        layout="vertical"
        onFinish={handleSubmit}
        // initialValues={formValues}
      >
        <Form.Item
          label="Mã thuốc"
          name="MATHUOC"
          style={{ width: "100%" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tên thuốc"
          name="TENTHUOC"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Tên thuốc không được để trống!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Đơn vị tính"
          name="DONVITINH"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng chọn đơn vị tính!" }]}
        >
          <Select placeholder="Chọn đơn vị tính.">
            <Option value="Viên">Viên</Option>
            <Option value="Ống">Ống</Option>
            <Option value="Gói">Gói</Option>
            <Option value="Chai">Chai</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Chỉ định"
          name="CHIDINH"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Chỉ định sử dụng không được để trống!" }]}
        >
          <TextArea
            showCount
            minLength={10}
            maxLength={500}
            style={{ height: 120 }}
          />
        </Form.Item>
        <Form.Item
          label="Đơn giá"
          name="DONGIA"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Đơn giá không được để trống!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleReset}
            style={{ marginRight: 10 }}
            type="danger"
            // initialValues={formValues}
          >
            ĐẶT LẠI
          </Button>
          <ButtonGreen text="CẬP NHẬT" func={""}/>
        </Form.Item>
      </Form>
    </>
  );
};

const ThuocTable = ({ medicine }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const selectedDataRef = useRef({});

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
      render: (text) => {
        const date = new Date(text);
        const dateString = date.toLocaleDateString();
        return dateString;
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "DONGIA",
      key: "DONGIA",
      sorter: (a, b) => a.DONGIA - b.DONGIA,
      render: (text) => {
        const formattedAmount = text.toLocaleString("vi-VN");
        return `${formattedAmount} VND`;
      },
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
      </Modal>
    </>
  );
};

const TaoThuocMoi = () => {
  const [formValues, setFormValues] = useState({});
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Success:", values);
    message.success("Tạo thuốc mới thành công!");
    form.resetFields();
    setFormValues({});
    window.location.reload();
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
        // initialValues={formValues}
      >
        <Form.Item
          label="Tên thuốc"
          name="tendv"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập tên thuốc!" }]}
        >
          <Input placeholder="Tên thuốc." />
        </Form.Item>
        <Form.Item
          label="Đơn vị tính"
          name="DONVITINH"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng chọn đơn vị tính!" }]}
        >
          <Select placeholder="Chọn đơn vị tính.">
            <Select.Option value="Viên">Viên</Select.Option>
            <Select.Option value="Ống">Ống</Select.Option>
            <Select.Option value="Gói">Gói</Select.Option>
            <Select.Option value="Chai">Chai</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Chỉ định"
          name="CHIDINH"
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
          name="SLNHAP"
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
          name="NGAYHETHAN"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập ngày hết hạn!" }]}
        >
          <DatePicker placeholder="Ngày hết hạn của thuốc." />
        </Form.Item>
        <Form.Item
          label="Đơn giá"
          name="DONGIA"
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
          <ButtonGreen text="THÊM THUỐC" func={""}/>
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
      <ButtonGreen text="THÊM LOẠI THUỐC MỚI" func={showModal}/>

      <Modal
        title={
          <h1 className="font-montserrat text-xl mb-3 mt-2 font-extrabold">
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
        <ThuocTable medicine={thuoc} />
      </div>
    </>
  );
};

export default QuanLiThuoc;
