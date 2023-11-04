use PKNHAKHOA 
GO
-- WARNING: CHỈ CHẠY SCRIPT NÀY 1 LẦN SAU KHI TẠO DB ------------------------------------------------

-- Tạo ca, mỗi ca 2 tiếng từ 9g đến 21g
DECLARE @StartTime TIME = '09:00';
DECLARE @EndTime TIME = '21:00';
DECLARE @ShiftCount INT = 1;
WHILE @StartTime < @EndTime
BEGIN
    DECLARE @MACA VARCHAR(10) = 'CA' + RIGHT('00' + CAST(@ShiftCount AS VARCHAR), 3);
    
    INSERT INTO CA (MACA, GIOBATDAU, GIOKETTHUC)
    VALUES (@MACA, @StartTime, DATEADD(HOUR, 2, @StartTime));
    SET @StartTime = DATEADD(HOUR, 2, @StartTime);
    SET @ShiftCount = @ShiftCount + 1;
END;
GO



-- Thêm NHASI
INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0001', N'Lê Văn Hòa', N'Nam', N'Chuyên gia: Điều trị nha chu, chữa răng nội nha, tiểu phẫu răng miệng: nhổ răng khôn, nhổ răng mọc ngầm,… phục hình răng giả tháo lắp, phục hình răng sứ thẩm mỹ, cầu răng sứ.\nNgôn ngữ: Tiếng Việt, Tiếng Anh.\nHọc vấn: Tốt nghiệp Bác sỹ Trường Đại học Y Khoa Quảng Tây năm 2012. Tốt nghiệp thạc sỹ Trường Đại học Y khoa Quảng Tây năm 2016.\nKinh nghiệm: Bác sĩ Răng Hàm Mặt – Đại học Y Dược (2019).', 'S4f3&H@ppy*Day');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0002', N'Phạm Xuân Thanh', N'Nam', N'Chuyên gia: Tiểu phẫu răng miệng; phục hình răng giả; cầu răng sứ; nha khoa tổng quát.\nNgôn ngữ: Tiếng Việt, Tiếng Anh.\nHọc vấn: Tốt nghiệp Bác sĩ Trường Đại học Y Dược Hà Nội năm 2014.\nKinh nghiệm: Bác sĩ tại Bệnh Viện Răng Hàm Mặt Hà Nội từ năm 2014.', 'J@zzY@rd&Rhythm');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0003', N'Trần Thị Mai Loan', N'Nữ', N'Chuyên gia: chuyên phục hình răng sứ thẩm mỹ; nha khoa tổng quát.\nNgôn ngữ: Tiếng Việt, Tiếng Anh.\nHọc vấn: Tốt nghiệp Trường Đại học Y Dược TP. Hồ Chí Minh năm 1995.\nKinh nghiệm: Bác sĩ tại Bệnh Viện Răng Hàm Mặt TP. Hồ Chí Minh từ năm 1995. Bác sĩ Phó trưởng Khoa Phẫu thuật trong miệng từ năm 2015.', 'M00nL!ght&St@rs');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0004', N'Trần Minh Tuấn', N'Nam', N'Chuyên gia: Khám, tư vấn và lên phác đồ điều trị nha khoa tổng quát; Cấy ghép Implant nha khoa; Phẫu thuật trong miệng & hàm mặt; Phục hình răng sứ; Cầu răng sứ; Nha khoa thẩm mỹ.\nNgôn ngữ: Tiếng Việt, Tiếng Anh\nHọc vấn: Tốt nghiệp Trường Đại học Y Dược TP. Hồ Chí Minh năm 2011\nKinh nghiệm: Bác sĩ tại Bệnh Viện Răng Hàm Mặt TP. Hồ Chí Minh từ năm 2011.', '7H1s1sP@ssw0rd');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0005', N'Nguyễn Văn Đông', N'Nam', N'Chuyên gia: Cấy ghép Implant nha khoa; phẫu thuật trong miệng & hàm mặt; phục hình; chỉnh nha; nha khoa thẩm mỹ.\nNgôn ngữ: Tiếng Việt, Tiếng Anh\nHọc vấn: Tốt nghiệp Bác sỹ Trường Đại học Y Dược TP. Hồ Chí Minh năm 2008 Tốt nghiệp chuyên khoa I Trường Đại Học Huế năm 2015.\nKinh nghiệm: Bác sỹ tại Bệnh Viện Răng Hàm Mặt TP. Hồ Chí Minh từ năm 2008.', 'B1cycl3&4FUn#');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0006', N'Hoàng Thị Ngọc Anh', N'Nữ', N'Chuyên gia: Phục hình răng sứ thẩm mỹ; điều trị nha chu; chỉnh nha; cấy ghép Implant nha khoa.\nNgôn ngữ: Tiếng Việt, Tiếng Anh.\nHọc vấn: Tốt nghiệp Bác sĩ Trường Đại học Y Dược TP. Hồ Chí Minh năm 2010 Thạc sĩ chuyên ngành Nha khoa thẩm mỹ năm 2015.\nKinh nghiệm: Bác sĩ tại Phòng Khám Nha Khoa Ánh Sáng từ năm 2010.', 'H3@rt&S0ul*H@ppy');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0007', N'Phạm Thị Minh Trang', N'Nữ', N'Chuyên gia: Nha khoa thẩm mỹ; điều trị nha chu; cấy ghép Implant nha khoa; phục hình răng sứ.\nNgôn ngữ: Tiếng Việt, Tiếng Anh.\nHọc vấn: Tốt nghiệp Bác sĩ Trường Đại học Y Khoa Sài Gòn năm 2009 Thạc sĩ chuyên ngành Nha khoa thẩm mỹ năm 2013.\nKinh nghiệm: Bác sĩ tại Phòng Khám Nha Khoa Tươi Đẹp từ năm 2009.', '8L1ghts&Cam3r@#');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0008', N'Nguyễn Thị Kim Liên', N'Nữ', N'Chuyên gia: Chữa răng nội nha; tiểu phẫu răng miệng; phục hình răng giả tháo lắp; cầu răng sứ.\nNgôn ngữ: Tiếng Việt, Tiếng Anh.\nHọc vấn: Tốt nghiệp Bác sĩ Trường Đại học Y Dược Đà Nẵng năm 2007.\nKinh nghiệm: Bác sĩ tại Bệnh Viện Răng Hàm Mặt Đà Nẵng từ năm 2007.', 'W0nd3rful*W0rld');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0009', N'Đinh Quang Huy', N'Nam', N'Chuyên gia: Cấy ghép Implant nha khoa; phẫu thuật trong miệng & hàm mặt; phục hình; điều trị nha chu.\nNgôn ngữ: Tiếng Việt, Tiếng Anh.\nHọc vấn: Tốt nghiệp Bác sĩ Trường Đại học Y Dược Hà Nội năm 2012 Chuyên ngành Phẫu thuật nha khoa năm 2017.\nKinh nghiệm: Bác sĩ tại Phòng Khám Nha Khoa Thành Đa từ năm 2012.', 'M@gn1f!c3nt@V!3w');

INSERT INTO NHASI (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU)
VALUES ('NS0010', N'Vũ Hoàng Anh', N'Nam', N'Chuyên gia: Điều trị nha chu; nha khoa tổng quát; nha khoa thẩm mỹ; chỉnh nha.\nNgôn ngữ: Tiếng Việt, Tiếng Anh.\nHọc vấn: Tốt nghiệp Bác sĩ Trường Đại học Y Dược TP. Hồ Chí Minh năm 2015.\nKinh nghiệm: Bác sĩ tại Bệnh Viện Răng Hàm Mặt TP. Hồ Chí Minh từ năm 2015.', 'H1lls&Gr33n$');
GO
-- Thêm LICHRANH

DECLARE @StartDate DATE = '2024-01-01';
DECLARE @EndDate DATE = '2024-01-07';
DECLARE @ShiftCount INT = 1;
DECLARE @CurrentDate DATE = @StartDate;


WHILE @CurrentDate <= @EndDate
BEGIN
    DECLARE @ShiftsPerDay INT = 6; 
    
    WHILE @ShiftCount <= @ShiftsPerDay
    BEGIN
        INSERT INTO LICHRANH (MANS, SOTT, MACA, NGAY)
        SELECT TOP 2 MANS, @ShiftCount, 'CA' + RIGHT('00' + CAST(@ShiftCount AS VARCHAR), 3), @CurrentDate
        FROM NHASI
        WHERE MANS NOT IN (
            SELECT MANS
            FROM LICHRANH
            WHERE NGAY = @CurrentDate AND MACA = 'CA' + RIGHT('00' + CAST(@ShiftCount AS VARCHAR), 3)
        )
        ORDER BY NEWID();
        SET @ShiftCount = @ShiftCount + 1;
    END
    
    SET @ShiftCount = 1;
    SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate);
END;
GO



-------Them loại thuốc và dịch vụ






INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES 
('MT01', N'Paracetamol', N'Viên', 'Giảm đau nhẹ', 100, 200, 5, '2024-12-31', 5000),
('MT02', N'Amoxicillin', N'Hộp ', N'Kháng sinh phổ rộng', 50, 100, 0, '2023-03-31', 20000),
('MT03', N'Vitamin C', N'Chai ', N'Bổ sung vitamin C', 80, 100, 3, '2024-08-31', 10000),
('MT04', N'Vitamin B', N'Chai ', N'Bổ sung vitamin B', 80, 100, 3, '2024-08-31', 10000),
('MT05', N'Vitamin D', N'Chai ', N'Bổ sung vitamin D', 80, 100, 3, '2024-08-31', 10000),
('MT06', N'Vitamin E', N'Chai ', N'Bổ sung vitamin E', 80, 100, 3, '2024-08-31', 10000),
('MT07', N'Vitamin K', N'Chai ', N'Bổ sung vitamin K', 80, 100, 3, '2024-08-31', 10000),
('MT08', N'Vitamin A', N'Chai ', N'Bổ sung vitamin A', 80, 100, 3, '2024-08-31', 10000),
('MT09', N'Vitamin B1', N'Chai ', N'Bổ sung vitamin B1', 80, 100, 3, '2024-08-31', 10000),
('MT10', N'Vitamin B2', N'Chai ', N'Bổ sung vitamin B2', 80, 100, 3, '2024-08-31', 10000),
('MT11', N'Vitamin B3', N'Chai ', N'Bổ sung vitamin B3', 80, 100, 3, '2024-08-31', 10000),
('MT12', N'Vitamin B5', N'Chai ', N'Bổ sung vitamin B5', 80, 100, 3, '2024-08-31', 10000),
('MT13', N'Vitamin B6', N'Chai ', N'Bổ sung vitamin B6', 80, 100, 3, '2024-08-31', 10000),
('MT14', N'Vitamin B7', N'Chai ', N'Bổ sung vitamin B7', 80, 100, 3, '2024-08-31', 10000),


 
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES
('DV01', N'Khám răng', N'Dịch vụ này bao gồm việc khám và tư vấn về tình trạng răng miệng của bệnh nhân', 200000),
('DV02', N'Chụp X-quang', N'Dịch vụ này cung cấp việc chụp X-quang để đánh giá và chuẩn đoán tình trạng răng miệng', 150000),
('DV03', N'Đắp răng khiểng', N'Dịch vụ này đảm nhiệm việc đắp răng khiểng để điều chỉnh vị trí của răng', 500000),
('DV04', N'Tẩy trắng răng', N'Dịch vụ này cung cấp việc tẩy trắng răng để làm sáng và làm trắng răng', 500000),
('DV05', N'Bọc răng sứ' , N'Dịch vụ này bao gồm việc bọc răng bằng vật liệu sứ để cải thiện ngoại hình và chức năng của răng', 1000000),
('DV06', N'Cấy ghép Implant', N'Dịch vụ này liên quan đến việc cấy ghép Implant nha khoa để thay thế răng hoặc hỗ trợ các công việc nha khoa khác', 2000000),
('DV07', N'Chỉnh nha', N'Dịch vụ này đảm nhiệm việc chỉnh nha để điều chỉnh vị trí của răng và cải thiện hàm răng', 5000000),
('DV08', N'Phục hình răng sứ', N'Dịch vụ này liên quan đến việc phục hình răng bằng vật liệu sứ để khôi phục ngoại hình và chức năng của răng', 1000000),
('DV09', N'Cạo vôi răng', N'Dịch vụ này bao gồm việc cạo vôi trên bề mặt răng nhằm loại bỏ mảng bám và tái tạo vệ sinh răng miệng', 500000),
('DV10', N'Nhổ răng', N'Dịch vụ này đảm nhiệm việc nhổ răng khi cần thiết, bao gồm cả nhổ răng khôn', 250000),
('DV11', N'Chữa nha chu', N'Dịch vụ này cung cấp việc chữa trị các bệnh nha chu như viêm nướu, chảy máu nướu, và hôi miệng', 300000),
('DV12', N'Phẫu thuật trong miệng', N'Dịch vụ này liên quan đến việc phẫu thuật trong miệng như tạo hình lợi, tạo hình mô mềm, hoặc phẫu thuật tuyến nước bọt', 5000000),
('DV13', N'Chữa tủy răng trẻ em', N'Dịch vụ này cung cấp việc chữa trị tủy răng trẻ em, bao gồm cả việc cấp cứu trong trường hợp cần thiết', 1000000),
('DV14', N'Trám răng sữa trẻ em', N'Dịch vụ này liên quan đến việc chữa trị các vấn đề răng nội nha như viêm tủy, nhiễm trùng, hoặc đau răng ADD', 500000),
('DV15', N'Chữa răng nội nha', N'Dịch vụ này bao gồm việc phục hình răng giả để thay thế răng mất, cung cấp chức năng hàm răng', 500000),
('DV16', N'Phục hình răng giả', N'Dịch vụ này đảm nhiệm việc làm cầu răng bằng vật liệu sứ để thay thế nhiều răng mất liên tiếp', 500000),
('DV17', N'Cầu răng sứ', N'Dịch vụ này cung cấp các dịch vụ nha khoa tổng quát như khám răng', 1100000),
('DV18', N'Nha khoa tổng quát', N'Dịch vụ này cung cấp các dịch vụ nha khoa tổng quát như khám răng, tẩy trắng, trám răng, và chữa trị các vấn đề thông thường', 350000),
('DV19', N'Nha khoa thẩm mỹ', N'Dịch vụ này liên quan đến việc cải thiện ngoại hình và thẩm mỹ răng miệng bằng các phương pháp như tẩy trắng, bọc răng sứ, chỉnh nha thẩm mỹ', 500000),
('DV20', N'Đính đá răng' , N'Dịch vụ này bao gồm việc đính đá ngọc trên răng để tạo điểm nhấn và thẩm mỹ cho những người muốn trang trí cho nụ cười của mình', 100000),
('DV21', N'Chỉnh nha thẩm mỹ', N'Dịch vụ này đảm nhiệm việc chỉnh nha nhằm cải thiện vị trí và hình dáng của răng một cách thẩm mỹ', 1000000);






