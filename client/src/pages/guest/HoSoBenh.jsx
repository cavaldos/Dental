import React, { useState, useEffect } from 'react';
import { Table, Pagination, Drawer, Empty } from 'antd';
import axios from 'axios';
import hsb from '../../fakedata/hsb';
import '../../assets/styles/guest.css';

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
  const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  return formattedAmount.replace(/\u200B/g, ''); // Loại bỏ dấu 0 đặc biệt (nếu có)
};

const GuestInfo = ({ currentRecord }) => {
  if (!currentRecord) {
    return null;
  }

  const { HOTEN, SODT, SOTT, NGAYKHAM, NHASI, DANDO } = currentRecord;
  return (
    <div>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Họ tên: </span>{HOTEN}</p>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Số điện thoại: </span>{SODT}</p>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Số thứ tự hồ sơ: </span>{SOTT}</p>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Ngày khám: </span>{NGAYKHAM}</p>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Nha sĩ: </span>{NHASI}</p>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Dặn dò: </span>{DANDO}</p>
    </div>
  );
};

const DichVuTable = ({ dataDV, openDrawer }) => {
  const columnDV = [
    {
      title: 'STT',
      width: '20%',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'TENDV',
      key: 'TENDV',
      width: '20%',
      render: (text, record) => <a className='text-primary underline decoration-solid' onClick={() => openDrawer('loaiDV', record.MADV)}>{text}</a>
    },
    {
      title: 'Số lượng',
      dataIndex: 'SLDV',
      key: 'SLDV'
    },
  ];
  return (
    <Table columns={columnDV} dataSource={dataDV} pagination={false} />
  );
};

const ThuocTable = ({ dataThuoc, openDrawer }) => {
  const formatThuocData = (thuocData) => {
    if (!thuocData || !Array.isArray(thuocData)) {
      return [];
    }

    return thuocData.map((item) => {
      const donViTinh = item.DONVITINH.trim();
      const formattedThoiDiemDung = escapedNewLineToLineBreakTag(item.THOIDIEMDUNG);
      return {
        ...item,
        SLTHUOC: `${item.SLTHUOC} ${donViTinh}`,
        THOIDIEMDUNG: formattedThoiDiemDung,
      };
    });
  };

  const columnThuoc = [
    {
      title: 'STT',
      width: '20%',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Tên thuốc',
      dataIndex: 'TENTHUOC',
      key: 'TENTHUOC',
      width: '20%',
      render: (text, record) => <a className='text-primary underline decoration-solid' onClick={() => openDrawer('loaiThuoc', record.MATHUOC)}>{text}</a>
    },
    {
      title: 'Số lượng/đơn vị tính',
      dataIndex: 'SLTHUOC',
      key: 'SLTHUOC',
      width: '30%',
    },
    {
      title: 'Thời điểm dùng',
      dataIndex: 'THOIDIEMDUNG',
      key: 'THOIDIEMDUNG',
    },
  ];

  return (
    <Table columns={columnThuoc} dataSource={formatThuocData(dataThuoc)} pagination={false} />
  );
};

const HoSoBenh = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const recordsPerPage = 1; // Số hồ sơ bệnh hiển thị trên mỗi trang

  // Hiển thị chi tiết loại dịch vụ
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const [selectedDrug, setSelectedDrug] = useState({});
  const [selectedType, setSelectedType] = useState("");

  const openDrawer = async (type, id) => {
    try {
      const response = await axios.get(`http://localhost:3000/khachhang/${type}/${id}`);
      const item = response.data[0];

      setSelectedType(type);
      setDrawerVisible(true);

      if (type === 'loaiDV') {
        setSelectedService(item);
      } else if (type === 'loaiThuoc') {
        setSelectedDrug(item);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin:', error);
    }
  };

  const closeDrawer = () => {
    // Đóng Drawer
    setDrawerVisible(false);
    setSelectedDrug({});
    setSelectedService({});
    setSelectedType("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/khachhang/benhAn/0387654321');
        const fetchedMedicalRecords = response.data;
        setMedicalRecords(fetchedMedicalRecords);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu hồ sơ bệnh:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = medicalRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div>
      {medicalRecords.length > 0 ? (
        <div className='bg-white p-10 mx-10' style={{ borderRadius: '35px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.10)' }}>
          <div className='mb-3'><GuestInfo currentRecord={currentRecords[0]} /></div>
          <div className='mb-5'><DichVuTable dataDV={currentRecords[0]?.DICHVU} openDrawer={openDrawer} /></div>
          <Drawer
            title={`THÔNG TIN ${selectedType === 'loaiDV' ? 'DỊCH VỤ' : 'THUỐC'}`}
            placement="right"
            onClose={closeDrawer}
            open={drawerVisible}>
            {selectedType === 'loaiDV' && (
              <>
                <p className='mb-2'>Tên dịch vụ: {selectedService.TENDV}</p>
                <p className='mb-2'>Mô tả: {selectedService.MOTA}</p>
                <p>Đơn giá: {formatCurrency(selectedService.DONGIA)}/lần</p>
              </>
            )}
            {selectedType === 'loaiThuoc' && (
              <>
                <p className='mb-2'>Tên thuốc: {selectedDrug.TENTHUOC}</p>
                <p className='mb-2'>Chỉ định: {selectedDrug.CHIDINH}</p>
                <p>Đơn giá: {formatCurrency(selectedDrug.DONGIA)}/{selectedDrug.DONVITINH}</p>
              </>
            )}
          </Drawer>
          <ThuocTable dataThuoc={currentRecords[0]?.THUOC} openDrawer={openDrawer} />
        </div>
      ) : (
        <Empty />
      )}
      <div className='flex justify-center py-3'>
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
  );
};

export default HoSoBenh;
