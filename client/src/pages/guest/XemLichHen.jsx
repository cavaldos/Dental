import React, { useState, useEffect } from "react";
import { Card, Pagination, Modal, Button } from "antd";
import moment from "moment";
import lichhen from "../../fakedata/lichhen";
import "../../assets/styles/guest.css";


const isDaKham = (gioKetThuc) => {
  const gioHienTai = new Date();
  const gioKetThucDate = new Date(gioKetThuc);
  return gioKetThucDate > gioHienTai;
};

function isoDateToLocalDate(ISOTimeString, offsetInMinutes) {
  var newTime = new Date(ISOTimeString);
  return new Date(newTime.getTime() - offsetInMinutes * 60000);
}

function formatTime(localIsoDate) {
  function z(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var hh = localIsoDate.getUTCHours();
  var mm = localIsoDate.getUTCMinutes();
  var ss = localIsoDate.getUTCSeconds();
  return z(hh) + ":" + z(mm) + ":" + z(ss);
}

const XemLichHen = () => {
  const [fetchedAppointment, setFetchedAppointment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelingAppointment, setCancelingAppointment] = useState(null);
  const appointmentsPerPage = 6;

  useEffect(() => {
    setFetchedAppointment(lichhen);
  }, []);

  // Sắp xếp lịch hẹn chưa khám lên trước
  const sortedAppointments = fetchedAppointment.sort((a, b) => {
    const isDaKhamA = isDaKham(a.NGAY);
    const isDaKhamB = isDaKham(b.NGAY);

    // Sắp xếp theo trạng thái "đã khám" và ngày
    return isDaKhamA === isDaKhamB
      ? new Date(a.NGAY) - new Date(b.NGAY)
      : isDaKhamA - isDaKhamB;
  });

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = sortedAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const showCancelModal = (appointment) => {
    setCancelingAppointment(appointment);
    setCancelModalVisible(true);
  };

  const handleCancel = async () => {
    try {
      // Lấy thông tin MANS và SOTT từ lịch đang hủy
      const { MANS, SOTT } = cancelingAppointment;

      // Gọi API hủy lịch với thông tin MANS và SOTT
      // await apiCallToCancelAppointment(MANS, SOTT);

      // Sau khi thành công, cập nhật lại danh sách lịch hẹn
      // const updatedList = await fetchUpdatedAppointmentList(); // Gọi lại API hoặc cập nhật danh sách từ state nếu cần
      // setFetchedAppointment(updatedList);

      // Đóng modal
      setCancelModalVisible(false);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-5 md:grid-cols-2 grid-cols-1">
        {currentAppointments.map((lich, index) => (
          <Card
            key={index}
            style={{
              borderRadius: "30px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
              overflow: "hidden",
              padding: "0.8em",
              height: "100%"
            }}
          >
            <p className="leading-7 font-montserrat font-semibold text-base text-#4B4B4B mb-3 break-words">
              <span className="text-grey">Ngày, giờ: </span>
              {moment(lich.NGAY).format("DD/MM/yyyy")} -{" "}
              {formatTime(isoDateToLocalDate(lich.GIOBATDAU, 0))}
            </p>
            <p className="leading-7 font-montserrat font-semibold text-base text-#4B4B4B mb-3 break-words">
              <span className="text-grey">Nha sĩ: </span>
              {lich.TENNS}
            </p>
            <p className="leading-7 font-montserrat font-semibold text-base text-#4B4B4B mb-3 break-words">
              <span className="text-grey">Họ tên khách: </span>
              Lấy từ header
            </p>
            <p className="leading-7 font-montserrat font-semibold text-base text-#4B4B4B mb-14 break-words">
              <span className="text-grey">
                Lý do khám: <br />
              </span>
              {lich.LYDOKHAM}
            </p>
            <div className="absolute bottom-7 right-10">
              {isDaKham(lich.NGAY) ? (
                <p className="rounded-md text-grin font-montserrat p-2 underline decoration-auto cursor-default">
                  ĐÃ KHÁM
                </p>
              ) : (
                <button className="rounded-md text-rose-500 font-montserrat p-2 underline decoration-auto border-2 border-rose-500 hover:bg-rose-500 hover:text-white"
                onClick={() => showCancelModal(lich)}>
                  HỦY LỊCH HẸN
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center py-3">
        {sortedAppointments.length > 0 && (
          <Pagination
            simple
            defaultCurrent={1}
            total={sortedAppointments.length}
            pageSize={appointmentsPerPage}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      <Modal
      title="Xác nhận hủy lịch hẹn"
      open={cancelModalVisible}
      onOk={handleCancel}
      onCancel={() => setCancelModalVisible(false)}
      footer={[
        <Button
          key="back"
          onClick={() => setCancelModalVisible(false)}
          className="bg-gray-300 custom-button-cancel font-montserrat"
        >
          Quay lại
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleCancel}
          className="bg-rose-500 hover:bg-rose-600 custom-button-accept font-montserrat"
        >
          Xác nhận hủy lịch
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn hủy lịch hẹn?</p>
    </Modal>
    </div>
  );
};
export default XemLichHen;
