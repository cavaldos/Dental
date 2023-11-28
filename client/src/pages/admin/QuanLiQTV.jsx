import qtv from "../../fakedata/qtv";
import React, { useState } from "react";
import { Table, Button, Tag, Modal } from "antd";
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
            ...ColumnSearch("MAQTV", "Mã nhân viên"),
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
                title="Tạo Nhân Viên Mới"
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
                <p> Viet form tao nhan vien moi trong day </p>
            </Modal>
        </>
    );
};
const QuanLiNV = () => {
    return (
        <>
            <div className=" w-full">
                <TaoQTVMoi />
                <TableQTV admin={qtv} />
            </div>
        </>
    );
};
export default QuanLiNV;