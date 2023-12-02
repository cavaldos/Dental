import nhasi from "../../fakedata/nhasi";
import React from "react";
import { 
    Table, 
    Modal, 
    Button, 
    message, 
    Tag, 
    Popconfirm, 
    Space,
    Form,
    Input,
    Select,
    Checkbox,
    DatePicker,
    InputNumber,
} from "antd";
import ColumnSearch from "~/hooks/useSortTable";
import { useState } from "react";

import TextArea from "antd/es/input/TextArea";
import "../../assets/styles/admin.css";
import {ButtonGreen} from "../../components/button";
import { 
    SearchOutlined,
    EditOutlined, 
    LockOutlined,
    UnlockOutlined,
} from "@ant-design/icons";

const NhaSiTable = ({ data }) => {
    const format = (text) => {
        const replacedText = text.replace(/\\n/g, "\n");
        const lines = replacedText.split("\n");
        return lines.map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };
    const columns = [
        {
            title: "Mã NS",
            dataIndex: "MANS",
            key: "MANS",
            className: "px-[60px] min-w-[100px] ",
            ...ColumnSearch("MANS", "Mã NS"),
        },
        {
            title: "Họ và tên",
            dataIndex: "HOTEN",
            key: "HOTEN",
            className: "px-[60px] min-w-[100px] ",
            ...ColumnSearch("HOTEN", "Họ và tên"),
        },
        {
            title: "Giới tính",
            dataIndex: "PHAI",
            key: "PHAI",
            className: "px-[60px] min-w-[100px] ",
        },
        {
            title: "Giới thiệu",
            dataIndex: "GIOITHIEU",
            key: "GIOITHIEU",
            width: "45%",
            render: (text) => format(text),
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

    const paginationOptions = {
        pageSize: 5,
        total: data.length,
        showQuickJumper: true,
    };

    return <Table 
        columns={columns} 
        dataSource={data.map((item, index) => ({ ...item, key: index }))} 
        pagination={paginationOptions} 
        bordered 
        size="middle" 
        // scroll={{x: "max-content",}} 
    />;
};


const ThemNhaSiMoi = () => {
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
          rules={[{ required: true, message: "Vui lòng nhập họ tên nha sĩ!" }]}
        >
          <Input placeholder="Họ và tên nha sĩ."/>
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
            label="Giới thiệu"
            name="gioithieu"
            style={{ width: "100%" }}
            rules={[{required: true, message: "Vui lòng nhập giới thiệu!" }]}
          >
            <TextArea showCount minLength={10} maxLength={500} style={{ height: 120, }}
                placeholder="Giới thiệu về học vấn, kinh nghiệm của nha sĩ."/>
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


const ThemNhaSiMoiButton = () => {
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
                title={<h1 className="font-montserrat text-lg mb-3 mt-2 font-extrabold">TẠO TÀI KHOẢN NHA SĨ</h1>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[]}
            >
                <ThemNhaSiMoi />
            </Modal>
        </>
    );
};

const QuanliNS = () => {
    return (
        <>
            <div className=" w-full z-0">
                <ThemNhaSiMoiButton />
                <NhaSiTable data={nhasi} />
            </div>
        </>
    );
};

export default QuanliNS;
