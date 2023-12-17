import React, { useState, useEffect, memo } from "react";
import { Table, Pagination, Empty, message } from "antd";

import "~/assets/styles/staff_invoice.css";
import { ButtonGreen, ButtonGrey } from "~/components/button";
import { PrinterOutlined } from "@ant-design/icons";
import StaffService from "../services/staff";
import { useSelector } from "react-redux";

const formatCurrency = (amount) => {
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
  return formattedAmount.replace(/\u200B/g, ""); // Loại bỏ dấu 0 đặc biệt (nếu có)
};

const GuestInfo = ({ currentRecord }) => {
  console.log(currentRecord);
  if (!currentRecord) {
    return null;
  }

  const { HOTENKH, SODT, SOTTHD, NGAYXUAT } = currentRecord;
  return (
    <div>
      <div className="font-montserrat">
        <p className="text-lg text-blue font-[700]">NHA KHOA HAHA</p>
        <p className="text-[#adadad] italic text-sm">
          227 Đ.Nguyễn Văn Cừ, Quận 5
        </p>
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
            {HOTENKH}
          </p>
        </div>
        <div>
          <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
            <span className="">Hóa đơn số: </span>
            {SOTTHD}
          </p>
          <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
            <span className="">Ngày xuất: </span>
            {NGAYXUAT}
          </p>
        </div>
      </div>
    </div>
  );
};

const DichVuTable = memo(({ dataDV, openDrawer }) => {
  const formatDVData = (dvData) => {
    if (!dvData || !Array.isArray(dvData) || dvData[0].MATHUOC === null) {
      return [];
    }
    return dvData.map((item) => {
      return {
        ...item,
      };
    });
  };

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
      dataIndex: "DONGIADV",
      key: "DONGIADV",
      render: (text, record) => <p>{formatCurrency(record.DONGIADV)}</p>,
    },
    {
      title: "Thành tiền",
      key: "THANHTIEN",
      render: (text, record) => (
        <p>{formatCurrency(record.DONGIADV * record.SLDV)}</p>
      ),
    },
  ];
  return (
    <Table
      columns={columnDV}
      dataSource={formatDVData(dataDV).map((item, index) => ({
        ...item,
        key: index,
      }))}
      pagination={false}
    />
  );
});

const ThuocTable = memo(({ dataThuoc, openDrawer }) => {
  const formatThuocData = (dataThuoc) => {
    if (
      !dataThuoc ||
      !Array.isArray(dataThuoc) ||
      dataThuoc[0].MATHUOC === null
    ) {
      return [];
    }

    return dataThuoc.map((item, index) => {
      return {
        ...item,
        SLTHUOC: `${item.SLTHUOC}`,
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
      dataIndex: "SLTHUOC",
      key: "SLTHUOC",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "DONVITINH",
      key: "DONVITINH",
    },
    {
      title: "Đơn giá",
      dataIndex: "DONGIATHUOC",
      key: "DONGIATHUOC",
      render: (text, record) => <p>{formatCurrency(record.DONGIATHUOC)}</p>,
    },
    {
      title: "Thành tiền",
      key: "THANHTIEN",
      render: (record) => (
        <p>{formatCurrency(record.DONGIATHUOC * record.SLTHUOC)}</p>
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
  const _DATHANHTOAN = 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const recordsPerPage = 1;
  const user = useSelector((state) => state.user);
  useEffect(() => {
    StaffService.getHoaDon(sdt).then((res) => {
      console.log(res);
      if (res === undefined) {
        message.info("Không tìm thấy thông tin hồ sơ bệnh!");
      }
      setMedicalRecords(res ? res : []);
    });
  }, [currentPage]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = medicalRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paying =async ({ sdt, sott }) => {
    const newData = {
      sdt,
      sott,
      manv: user.MANV,
    };
    StaffService.xacNhanThanhToan(newData).then((res) => {
      console.log(res);
    });
  };

  const print = () => {
    window.print();
  };

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
            <DichVuTable dataDV={currentRecords[0]?.DICHVU} openDrawer="" />
          </div>
          <div className="mb-5">
            <ThuocTable dataThuoc={currentRecords[0]?.THUOC} openDrawer="" />
          </div>
          <div className="grid grid-cols-[2.3fr,0.7fr] gap-5">
            <p className="text-right">TỔNG CỘNG: </p>
            <p>{currentRecords[0].TONGCHIPHI}</p>
          </div>
          <div className="mt-5">
            <p>Nhân viên phụ trách: {currentRecords[0].HOTENNV} </p>

            {_DATHANHTOAN === 0 ? (
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
            <ButtonGrey
              text={
                <>
                  <PrinterOutlined /> IN HÓA ĐƠN
                </>
              }
              func={() => print()}
            />
          </p>
          {_DATHANHTOAN === 0 ? (
            <p>
              <ButtonGreen
                text="XÁC NHẬN THANH TOÁN"
                func={() => paying({ sdt, sott: currentRecords[0].SOTTHD })}
              />
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
