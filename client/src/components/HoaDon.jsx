import React, { useState, useEffect, memo } from "react";
import { Table, Pagination, Drawer, Empty } from "antd";
import hsb from "~/fakedata/hsb";

import '~/assets/styles/staff_invoice.css'
import Axios from "../services/Axios";
import {ButtonGreen, ButtonGrey} from "~/components/button";
import { PrinterOutlined } from "@ant-design/icons";

const escapedNewLineToLineBreakTag = (text) => {
  const replacedText = text.replace(/\\n/g, "\n");
  const lines = replacedText.split("\n");
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

const formatCurrency = (amount) => {
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
  return formattedAmount.replace(/\u200B/g, ""); // Loại bỏ dấu 0 đặc biệt (nếu có)
};

const GuestInfo = ({ currentRecord }) => {
  if (!currentRecord) {
    return null;
  }

  const { HOTEN, SODT, SOTT, NGAYKHAM } = currentRecord;
  return (
    <div>
      <div className="font-montserrat">
        <p className="text-lg text-blue font-[700]">NHA KHOA HAHA</p>
        <p className="text-[#adadad] italic text-sm">227 Đ.Nguyễn Văn Cừ, Quận 5</p>
        <p className="text-[#adadad] italic text-sm">nhakhoahaha.com</p>
      </div>
      <div className="font-montserrat text-2xl text-center font-[900] my-6">
        HÓA ĐƠN KHÁM BỆNH
      </div>
      <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
          <span className="">Số điện thoại: </span>
          {SODT}
        </p>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
          <span className="">Họ tên: </span>
          {HOTEN}
        </p>
      </div>
      <div>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
          <span className="">Hóa đơn số: </span>
          {SOTT}
        </p>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
          <span className="">Ngày xuất: </span>
          {NGAYKHAM}
        </p>
      </div>
      </div>
    </div>
  );
};

const DichVuTable = memo(({ dataDV, openDrawer }) => {
  const columnDV = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "TENDV",
      key: "TENDV",
      width: "23%",
    },
    {
      title: "Số lượng",
      dataIndex: "SLDV",
      key: "SLDV",
    },
    {
      title: "Đơn giá",
      dataIndex: "DONGIA",
      key: "DONGIA",
    },
    {
      title: "Thành tiền",
      key: "THANHTIEN",
      render: (text, record) => (
        <p>
          {record.DONGIA * record.SLDV}
        </p>
      ),
    },
  ];
  return (
    <Table
      columns={columnDV}
      dataSource={dataDV.map((item, index) => ({ ...item, key: index }))}
      pagination={false}
    />
  );
});

const ThuocTable = memo(({ dataThuoc, openDrawer }) => {
  const formatThuocData = (thuocData) => {
    if (!thuocData || !Array.isArray(thuocData)) {
      return [];
    }

    return thuocData.map((item) => {
      const donViTinh = item.DONVITINH.trim();
      const formattedThoiDiemDung = escapedNewLineToLineBreakTag(
        item.THOIDIEMDUNG
      );
      return {
        ...item,
        SLTHUOC: `${item.SLTHUOC} ${donViTinh}`,
        THOIDIEMDUNG: formattedThoiDiemDung,
      };
    });
  };

  const columnThuoc = [
    {
      title: "STT",
      key: "STT",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên thuốc",
      dataIndex: "TENTHUOC",
      key: "TENTHUOC",
      width: "23%",
    },
    {
      title: "Số lượng",
      dataIndex: "SLDV",
      key: "SLDV",
    },
    {
      title: "Đơn giá",
      dataIndex: "DONGIA",
      key: "DONGIA",
    },
    {
      title: "Thành tiền",
      key: "THANHTIEN",
      render: (record) => (
        <p>
          {record.DONGIA * record.SLDV}
        </p>
      ),
    },
  ];

  return (
    <Table
      columns={columnThuoc}
      dataSource={formatThuocData(dataThuoc).map((item, index) => ({
        ...item,
        key: index,
      }))}
      pagination={false}
    />
  );
});

const HoaDon = ({ sdt }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const recordsPerPage = 1; // Số hồ sơ bệnh hiển thị trên mỗi trang
  const [sdts, setSdts] = useState(sdt);

  const openDrawer = async (type, id) => {
    setDrawerVisible(true);
    try {
      const response = await Axios.get(
        `http://localhost:3000/khachhang/${type}/${id}`
      );
      const item = response.data[0];

      setSelectedType(type);

      if (type === "loaiDV") {
        setSelectedService(item);
      } else if (type === "loaiThuoc") {
        setSelectedDrug(item);
      }
    } catch (error) {
      console.log("Lỗi khi lấy thông tin:", error);
    }
  };

  useEffect(() => {
    setSdts(sdt);
    setMedicalRecords(hsb);
  }, [currentPage, sdt]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = medicalRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <div>
      {medicalRecords.length > 0 ? (
        <div
          className="bg-white p-10"
          style={{
            borderRadius: "35px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="mb-3">
            <GuestInfo currentRecord={currentRecords[0]} />
          </div>
          <div className="mb-5">
            <DichVuTable
              dataDV={currentRecords[0]?.DICHVU}
              openDrawer={openDrawer}
            />
          </div>
          <div className="mb-5">
          <ThuocTable
            dataThuoc={currentRecords[0]?.THUOC}
            openDrawer={openDrawer}
          />
          </div>
          <div className="grid grid-cols-[2.3fr,0.7fr] gap-5">
            <p className="text-right">TỔNG CỘNG: </p>
            <p>{currentRecords[0].TONGCHIPHI}</p>
          </div>
          <div className="mt-5">
            <p>Nhân viên phụ trách: {currentRecords[0].HOTENNV} </p>

            {currentRecords[0]._DAXUATHOADON === 0 ? (
              <p className="text-pinkk italic">*Hóa đơn chưa được thanh toán</p>
            ) : (
              <p className="text-pinkk italic">*Hóa đơn đã được thanh toán</p>
            )}
          </div>
        </div>
      ) : (
        <Empty />
      )}
      <div className="grid grid-cols-[2fr,1fr] gap-4 mt-6">
        <div className="flex justify-start">
          <p className="me-4">
            <ButtonGrey text={<><PrinterOutlined /> IN HÓA ĐƠN</>} func=""/>
          </p>
          {currentRecords[0]._DAXUATHOADON === 0 ? (
          <p>
            <ButtonGreen text="XÁC NHẬN THANH TOÁN" func=""/>
          </p>
          ) : null}
        </div>
        <div className="flex justify-end py-3">
        {medicalRecords.length > 0 && (
          <Pagination
            simple
            defaultCurrent={1}
            total={medicalRecords.length}
            pageSize={recordsPerPage}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      </div>
    </div>
  );
};


export default HoaDon;
