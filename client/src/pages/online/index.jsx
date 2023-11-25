// import { useNavigate } from "react-router-dom";
// const HomePage = () => {
//   const navigate = useNavigate();
//   return (
//     <>

//         <div>
//           <h1>chao mung ban den voi nha khoa Fivu</h1>
//         </div>
//     </>
//   );
// };
// export default HomePage;
import React, { useState } from "react";
import { Form, Button, Input, Select, Checkbox } from "antd";

const UpdateMedicineType = () => {
  const [medicineType, setMedicineType] = useState({
    code: "MT02",
    name: "Vitamin B",
    unit: "Viên",
    indication: "3/200",
    price: 5000,
  });

  const handleSubmit = () => {
    // Thực hiện cập nhật thông tin loại thuốc
  };

  return (
    <>
      <div className="bg-red-400">
        <Form
          onSubmit={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="Mã thuốc">
            <Input value={medicineType.code} />
          </Form.Item>
          <Form.Item label="Tên thuốc">
            <Input value={medicineType.name} />
          </Form.Item>
          <Form.Item label="Đơn vị tính">
            <Select value={medicineType.unit}>
              <Select.Option value="Viên">Viên</Select.Option>
              <Select.Option value="Ống">Ống</Select.Option>
              <Select.Option value="Hộp">Hộp</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chỉ định">
            <Input value={medicineType.indication} />
          </Form.Item>
          <Form.Item label="Đơn giá">
            <Input value={medicineType.price} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
            <Button type="danger">Hủy</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateMedicineType;
