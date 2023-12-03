import { useEffect, useState } from "react";
import { Input, Select, message, Button, Form, InputNumber } from "antd";
import dv from "~/fakedata/dv";
import thuoc from "~/fakedata/thuoc";
const { TextArea } = Input;

const { Item } = Form;

const DichVuDaChon = ({ ten, soLuong, madv, onClickXoa }) => {
  return (
    <>
      <div className="flex w-[440px]  gap-6 ">
        <Input className=" w-[300px]" value={ten} disabled />
        <Input className="w-[130px]" value={soLuong} disabled />
        <Button onClick={() => onClickXoa(madv)}>Xóa</Button>
      </div>
    </>
  );
};

const ThuocDaChon = ({ ten, soLuong, mathuoc, onClickXoa }) => {

  return (
    <>
      <div className="flex w-[440px]  gap-6 ">
        <Input className=" w-[300px]" value={ten} disabled />
        <Input className="w-[130px]" value={soLuong} disabled />
        <Button onClick={() => onClickXoa(mathuoc)}>Xóa</Button>
      </div>
    </>
  );
};

const ThemBenhAnMoi = ({}) => {
  const [form] = Form.useForm();
  const [dichVuList, setDichVuList] = useState(dv);
  const [chonDichVu, setChonDichVu] = useState([]);
  const [thuocList, setThuocList] = useState(thuoc);
  const [chonThuoc, setChonThuoc] = useState([]);

  const handleThemDichVu = () => {
    const formData = form.getFieldsValue();
    const { MADV, SOLUONG } = formData;
    const daChon = chonDichVu.find((item) => item.MADV === MADV);
    if (!MADV) {
      message.error("Vui lòng chọn dịch vụ");
      return;
    }
    if (!SOLUONG) {
      message.error("Vui lòng nhập số lượng");
      return;
    }
    if (daChon) {
      message.error("Đã chọn dịch vụ này!");
      return;
    }
    const tenDichVu = dichVuList.find((item) => item.MADV === MADV).TENDV;
    const newData = {
      MADV,
      TENDV: tenDichVu,
      soLuong: SOLUONG,
    };
    setChonDichVu([...chonDichVu, newData]);
    form.resetFields();

  };
  const handleThemThuoc = () => {
    const formData = form.getFieldsValue();
    const { MATHUOC, SLTHUOC } = formData;
    const daChon = chonThuoc.find((item) => item.MATHUOC === MATHUOC);
    if (!MATHUOC) {
      message.error("Vui lòng chọn thuốc");
      return;
    }
    if (!SLTHUOC) {
      message.error("Vui lòng nhập số lượng");
      return;
    }
    if (daChon) {
      message.error("Đã chọn thuốc này!");
      return;
    }
    const tenThuoc = thuocList.find(
      (item) => item.MATHUOC === MATHUOC
    ).TENTHUOC;
    const newData = {
      MATHUOC,
      TENTHUOC: tenThuoc,
      soLuong: SLTHUOC,
    };
    setChonThuoc([...chonThuoc, newData]);
    form.resetFields();
  };

  console.log("ct",chonThuoc);
  const handleXoaDichVu = (maDV) => {
    setChonDichVu(chonDichVu.filter((item) => item.MADV !== maDV));
  };

  const handleXoaThuoc = (maThuoc) => {
    setChonThuoc(chonThuoc.filter((item) => item.MATHUOC !== maThuoc));
  };

  return (
    <>
      <div className="bg-gray-300 min-h-[500px]  min-w-[70%] p-3">
        <h1 className="text-2xl mb-5 font-bold">
          Them benh an moi cho khach hang
        </h1>
        <div className="flex">
          <h1 className="text-gray-600 mr-3">So Thu Tu Ho So:</h1>
          <p>{"6"}</p>
        </div>
        <div className="flex ">
          <h1 className="text-gray-600 mr-3">Ngay Kham:</h1>
          <p>{"5-1-2024"}</p>
        </div>
        <div className="flex">
          <h1 className="text-gray-600 mr-3">Nha Si:</h1>
          <p>{"Hoang Thi Ngoc Anh"}</p>
        </div>
        <div className="mb-5">
          <h1 className="text-gray-600 mr-3">Dan Do</h1>
          <TextArea
            className="border border-spacing-2"
            rows={6}
            placeholder="maxLength is 6"
            maxLength={5}
          />
        </div>
        <div className="text-gray-600 mr-3 my-5">
          <h1 className="text-gray-600 mr-3">Dich Vu:</h1>
          <div className="flex flex-col gap-1">
            {chonDichVu.map((item, index) => {
              return (
                <DichVuDaChon
                  ten={item.TENDV}
                  madv={item.MADV}
                  soLuong={item.soLuong}
                  onClickXoa={handleXoaDichVu}
                  key={index}
                />
              );
            })}
          </div>
          <Form form={form} layout="inline">
            <Item name="MADV">
              <Select
                className="w-72"
                placeholder="Chon dich vu"
                style={{
                  width: 300,
                }}
                options={dichVuList.map((item) => ({
                  value: item.MADV,
                  label: item.TENDV,
                }))}
              />
            </Item>
            <Item name="SOLUONG">
              <InputNumber
                className="border border-spacing-2 w-32 ml-3"
                placeholder="So luong"
                min={1}
                inputMode="numeric"
              />
            </Item>
            <Item>
              <Button
                className="ml-3 bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={handleThemDichVu}
              >
                Them
              </Button>
            </Item>
          </Form>
        </div>
        <div className="text-gray-600 mr-3 my-5">
          <h1 className="text-gray-600 mr-3">Thuoc:</h1>
          <div className="flex flex-col gap-1">
            {chonThuoc.map((item, index) => {
              return (
                <ThuocDaChon
                  ten={item.TENTHUOC}
                  mathuoc={item.MATHUOC}
                  soLuong={item.soLuong}
                  onClickXoa={handleXoaThuoc}
                  key={index}
                />
              );
            })}
          </div>
          <Form form={form} layout="inline">
            <Item name="MATHUOC">
              <Select
                className="w-72"
                placeholder="Chon thuoc"
                style={{
                  width: 300,
                }}
                options={thuocList.map((item) => ({
                  value: item.MATHUOC,
                  label: item.TENTHUOC,
                }))}
              />
            </Item>
            <Item name="SLTHUOC">
              <InputNumber
                className="border border-spacing-2 w-32 ml-3"
                placeholder="So luong"
                min={1}
                inputMode="numeric"
              />
            </Item>
            <Item>
              <Button
                className="ml-3 bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={handleThemThuoc}
              >
                Them
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ThemBenhAnMoi;
