import nhasi from "../../fakedata/nhasi";
import React from "react";
import { Table, Modal, Button, message, Tag, Popconfirm, Space} from "antd";
import ColumnSearch from "~/hooks/useSortTable";
import { useState } from "react";

import "../../assets/styles/admin.css";
import ButtonGreen from "../../components/button";
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
            <ButtonGreen text="THÊM TÀI KHOẢN MỚI" modal={showModal}></ButtonGreen>

            <Modal
                title="Tạo Nha Sĩ Mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="ok" type="primary" onClick={handleOk} className=" bg-blue-500">
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
