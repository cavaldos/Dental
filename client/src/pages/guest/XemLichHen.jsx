import React from "react";
import { Card, Col, Row } from "antd";

const XemLichHen = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full lg:w-4/12">
        <Card bordered={false}>
          <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
            <span className="text-grey">Nha </span>
            5/1/2024 - 09:00
          </p>
          <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
            <span className="text-grey">Nha sĩ: </span>
            Lê Văn Hòa
          </p>
          <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
            <span className="text-grey">Họ tên khách: </span>
            Nguyễn Huyền Trang
          </p>
          <p className="leading-9 font-montserrat font-semibold text-base text-#4B4B4B">
            <span className="text-grey">Lý do khám: </span>
            Đau rát răng và nướu: Tôi đã cảm thấy đau rát và sưng nướu ở chiếc răng ở phía dưới bên trái trong vài ngày qua. Đau đớn khi chải răng và ăn.
          </p>
          <button className="rounded-md text-pink flex justify-right">HỦY LỊCH HẸN</button>
        </Card>
      </div>
      <div className="w-full lg:w-4/12">
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </div>
      <div className="w-full lg:w-4/12">
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </div>
    </div>
  );
};
export default XemLichHen;
