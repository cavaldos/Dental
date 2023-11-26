import {Table } from 'antd';
import '../../assets/styles/guest.css'
const columnDV = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDV',
    key: 'tendv',
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

const columnThuoc = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDV',
    key: 'tendv',
    render: (text) => <a className='text-primary underline decoration-solid'>{text}</a>
  },
  {
    title: 'Số lượng',
    dataIndex: 'sl',
    key: 'sl',
  },
]
const dataThuoc = [
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

const DichVu = () => <Table columns={columnDV} dataSource={dataDV}  pagination={false} />;

const Thuoc = () => <Table columns ={columnThuoc} dataSource={dataThuoc}  pagination={false} />;
const HoSoBenh = () => {
  return (
    <div>
        <div className='mb-3'>
          <p className="leading-9"><span className="text-grey">Họ tên: </span>Nguyễn Văn A</p>
          <p className="leading-9"><span className="text-grey">Số điện thoại: </span>0932497324</p>
          <p className="leading-9"><span className="text-grey">Số thứ tự hồ sơ: </span>2</p>
          <p className="leading-9"><span className="text-grey">Ngày khám: </span>1/1/2024</p>
          <p className="leading-9"><span className="text-grey">Nha sĩ: </span>Lê Văn Hoàng</p>
          <p className="leading-9"><span className="text-grey">Dặn dò: </span>Chải răng cẩn thận, ít nhất hai lần mỗi ngày. Sử dụng bàn chải mềm và kem đánh răng chứa fluor. Hạn chế thức ăn và đồ uống nóng hoặc lạnh.</p>
        </div>
        <div className='mb-5'><DichVu/></div>
        <Thuoc/>
    </div>
    
  );
};
export default HoSoBenh;
