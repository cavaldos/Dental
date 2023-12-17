import { useEffect, useState } from "react";
import { Input, Select, message, Button, Form, InputNumber } from "antd";
import {
  DeleteOutlined 
} from "@ant-design/icons";
import dv from "~/fakedata/dv";
import thuoc from "~/fakedata/thuoc";
const { TextArea } = Input;
import moment from 'moment';
import { ButtonGreen } from "../../components/button";
import '../../assets/styles/dentist.css'

const { Item } = Form;

const ThongTinLichHen = ({ info }) => {
  if (!info) {
    return null;
  }

  const { HOTENKH, SODT, NGAYKHAM, HOTENNS } = info;
  return (
    <div>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
        <span className="text-grey">Họ tên: </span>
        {HOTENKH}
      </p>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
        <span className="text-grey">Số điện thoại: </span>
        {SODT}
      </p>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
        <span className="text-grey">Ngày khám: </span>
        {NGAYKHAM}
      </p>
      <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
        <span className="text-grey">Tên nha sĩ: </span>
        {HOTENNS}
      </p>
    </div>
  );
};

const DichVuDaChon = ({ ten, soLuong, madv, onClickXoa }) => {
  return (
    <>
      <div className="flex w-[840px]">
        <Input className="w-[300px]" value={ten} disabled />
        <Input className="w-[137px] ml-5" value={soLuong} disabled />
        <Button 
          className="w-[90px] font-montserrat text-base font-semibold text-pinkk 
                      text-center border-0 hover:text-darkpinkk" 
          onClick={() => onClickXoa(madv)}>
          <DeleteOutlined />
        </Button>
      </div>
    </>
  );
};

const ThuocDaChon = ({ ten, soLuong, mathuoc, thoidiemdung, onClickXoa }) => {

  return (
    <>
      <div className="flex w-[990px]">
        <Input className="w-[300px]" value={ten} disabled />
        <Input className="w-[137px] ml-5" value={soLuong} disabled />
        <Input className="w-[360px] h-fit ml-5" value={thoidiemdung} disabled />
        <Button 
          className="w-[90px] font-montserrat text-base font-semibold text-pinkk 
                      text-center border-0 hover:text-darkpinkk" 
          onClick={() => onClickXoa(mathuoc)}>
          <DeleteOutlined />
        </Button>
      </div>
    </>
  );
};

const FormDienThongTin = ({}) => {
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
        <div className="my-1">
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
          <span className="text-grey">Dặn dò: </span>
        </p>
          <TextArea
            className="border border-spacing-2"
            rows={3}
            placeholder="Nhập các chẩn đoán và lời dặn cho bệnh nhân."
            maxLength={500}
          />
        </div>
        <div>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
          <span className="text-grey">Dịch vụ: </span>
        </p>
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
          <Form form={form} layout="inline" >
            <Item name="MADV">
              <Select
                placeholder="Chọn loại dịch vụ"
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
                className="border border-spacing-2 ml-1"
                placeholder="Số lượng"
                min={1}
                inputMode="numeric"
              />
            </Item>
            <Item>
              <Button
                className="ml-2 bg-white border-blue border-2 border-dashed 
                         text-blue font-montserrat text-sm h-[37px] rounded-lg"
                onClick={handleThemDichVu}
              >
                Thêm
              </Button>
            </Item>
          </Form>
        </div>
        <div>
        <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
          <span className="text-grey">Thuốc: </span>
        </p>
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
          <Form form={form} layout="inline" >
            <Item name="MATHUOC">
              <Select
                placeholder="Chọn loại thuốc"
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
                className="border border-spacing-2 ml-1"
                placeholder="Số lượng"
                min={1}
                inputMode="numeric"
              />
            </Item>
            <Item name="THOIDIEMDUNG"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập thời điểm dùng',
                    },
                    {
                      max: 200,
                      message: 'Không quá 200 ký tự',
                    },
                  ]}
            >
              <TextArea
                className="border border-spacing-2 ml-1"
                placeholder="Thời điểm dùng"
                showCount
                minLength={10}
                maxLength={200}
                rows={1}
                style={{
                  width: 360,
                }}
              />
            </Item>
            <Item>
              <Button
                className="ml-2 bg-white border-blue border-2 border-dashed 
                        text-blue font-montserrat text-sm h-[37px] rounded-lg"
                onClick={handleThemThuoc}
              >
                Thêm
              </Button>
            </Item>
          </Form>
        </div>
        <div className="flex justify-start mt-5">
              <ButtonGreen text="HOÀN TẤT HỒ SƠ" func=""/>
              <Button
                // onClick={handleReset}
                style={{ marginLeft: 20, marginBottom: "14px" }}
                type="danger"
            
              >
                ĐẶT LẠI
              </Button>
            </div>
    </>
  );
};

const ThemBenhAnMoi = () => {

  const infos = {
    HOTENKH: "Vũ Nguyễn Xuân Uyên",
    SODT: "0932312908",
    NGAYKHAM: moment(),
    HOTENNS: "",
  }
  infos.NGAYKHAM = infos.NGAYKHAM.format('DD/MM/YYYY');

  return (
    <div className="w-[1160px] flex flex-col gap-5 mt-1">
      <div className="bg-white p-10 mx-10 pb-8"
          style={{
            borderRadius: "35px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
          }}
      >
            <ThongTinLichHen info={infos}/>
            <FormDienThongTin />
      </div>
    </div>
  );
};

export default ThemBenhAnMoi;
