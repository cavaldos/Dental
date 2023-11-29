import qtv from "../../fakedata/qtv";
import React, { useState } from "react";
import { 
    Table, 
    Button, 
    Tag, 
    Modal,
    Form,
    Select,
    Input,
} from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import ColumnSearch from "~/hooks/useSortTable";

import "../../assets/styles/admin.css";
import ButtonGreen from "../../components/button";

const TableQTV = ({ admin }) => {
    const columns = [
        {
            title: "Mã QTV",
            dataIndex: "MAQTV",
            key: "MAQTV",
            ...ColumnSearch("MAQTV", "Mã QTV"),
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
    ];
    return (
        <>
            <Table columns={columns} dataSource={admin.map((item, index) => ({ ...item, key: index }))} pagination={true} bordered size="middle" scroll={{ x: 1000 }} />
        </>
    );
};


const TaoQTVMoi = () => {
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
          label="Họ tên"
          name="hoten"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Vui lòng nhập họ tên quản trị viên!" }]}
        >
          <Input placeholder="Họ và tên quản trị viên."/>
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
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end'  }}>
            <Button onClick={handleReset} style={{ marginRight: 10 }} type="danger">
                ĐẶT LẠI
            </Button>
            <ButtonGreen text="TẠO" modal={""}></ButtonGreen>
            </Form.Item>
        </Form>
      </>
    );
};


const TaoQTVMoiButton = () => {
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
            <ButtonGreen text="TẠO TÀI KHOẢN MỚI" modal={showModal}></ButtonGreen>

            <Modal
                title={<h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">TẠO TÀI KHOẢN QUẢN TRỊ VIÊN</h1>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[]}
            >
                <TaoQTVMoi />
            </Modal>
        </>
    );
};
const QuanLiNV = () => {
    return (
        <>
            <div className=" w-full">
                <TaoQTVMoiButton />
                <TableQTV admin={qtv} />
            </div>
        </>
    );
};
export default QuanLiNV;