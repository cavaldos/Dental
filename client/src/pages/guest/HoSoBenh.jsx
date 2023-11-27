import React, { useState } from 'react';
import {Table } from 'antd';
import '../../assets/styles/guest.css'

const GuestInfo = () => {
  return(
    <div>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Họ tên: </span>Nguyễn Văn A</p>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Số điện thoại: </span>0932497324</p>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Số thứ tự hồ sơ: </span>2</p>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Ngày khám: </span>1/1/2024</p>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Nha sĩ: </span>Lê Văn Hoàng</p>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B"><span className="text-grey">Dặn dò: </span>Chải răng cẩn thận, ít nhất hai lần mỗi ngày. Sử dụng bàn chải mềm và kem đánh răng chứa fluor. Hạn chế thức ăn và đồ uống nóng hoặc lạnh.</p>
    </div>
  )
};

const DichVuTable = () => {
  const columnDV = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width:'20%'
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'tenDV',
      key: 'tendv',
      width:'20%',
      render: (text) => <a className='text-primary underline decoration-solid'>{text}</a>
    },
    {
      title: 'Số lượng',
      dataIndex: 'sl',
      key: 'sl',
    },
  ]
  const dataDV = [
    {
      key:'1',
      stt: '1',
      tenDV: 'Trám răng',
      sl: '1'
    },
    {
      key:'2',
      stt: '2',
      tenDV: 'Nhổ răng sâu',
      sl: '1'
    },
  ];
  return (
    <Table columns={columnDV} dataSource={dataDV}  pagination={false}/>
  )
};

const ThuocTable = () => {
  const columnThuoc = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width:'20%'
    },
    {
      title: 'Tên thuốc',
      dataIndex: 'tenThuoc',
      key: 'tenThuoc',
      width:'20%',
      render: (text) => <a className='text-primary underline decoration-solid'>{text}</a>
    },
    {
      title: 'Số lượng/đơn vị tính',
      dataIndex: 'sl',
      key: 'sl',
      width:'30%',
    },
    {
      title: 'Thời điểm dùng',
      dataIndex: 'thoiDiemDung',
      key: 'thoiDiemDung',
    },
  ]
  const dataThuoc = [
    {
      key:'1',
      stt: '1',
      tenThuoc: 'Vitamin',
      sl: '14 viên',
      thoiDiemDung:'Buổi sáng: 1 viên thuốc sau bữa sáng.Buổi trưa: 1 viên thuốc sau bữa trưa.Buổi tối: 1 viên thuốc sau bữa tối.'
    }
  ];
  return(
    <Table columns ={columnThuoc} dataSource={dataThuoc}  pagination={false} />
  )
};

const HoSoBenh = () => {
  return (
    <div>
      <div className='bg-white p-10 mx-10' style={{borderRadius:'35px', boxShadow:'0px 4px 4px 0px rgba(0, 0, 0, 0.10)'}}>
        <div className='mb-3'><GuestInfo/></div>
        <div className='mb-5'><DichVuTable/></div>
        <ThuocTable/>
      </div>
    </div>
  );
};
export default HoSoBenh;
