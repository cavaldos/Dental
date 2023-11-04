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


-- THEM LOAI DICH VU
-- LOAI THUOC 
-- THEM QTV
-- Insert data into LOAITHUOC table
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES 
('MT01', 'Paracetamol', 'Viên', 'Giảm đau nhẹ', 100, 200, 5, '2024-12-31', 5000),
('MT02', 'Amoxicillin', 'Hộp 10 vỉ x 10 viên', 'Kháng sinh phổ rộng', 50, 100, 0, '2023-03-31', 20000),
('MT03', 'Vitamin C', 'Chai 30 viên', 'Bổ sung vitamin C', 80, 100, 3, '2024-08-31', 10000);
('MT04', 'Vitamin B', 'Chai 30 viên', 'Bổ sung vitamin B', 80, 100, 3, '2024-08-31', 10000);
('MT05', 'Vitamin D', 'Chai 30 viên', 'Bổ sung vitamin D', 80, 100, 3, '2024-08-31', 10000);
('MT06', 'Vitamin E', 'Chai 30 viên', 'Bổ sung vitamin E', 80, 100, 3, '2024-08-31', 10000);
('MT07', 'Vitamin K', 'Chai 30 viên', 'Bổ sung vitamin K', 80, 100, 3, '2024-08-31', 10000);
('MT08', 'Vitamin A', 'Chai 30 viên', 'Bổ sung vitamin A', 80, 100, 3, '2024-08-31', 10000);
('MT09', 'Vitamin B1', 'Chai 30 viên', 'Bổ sung vitamin B1', 80, 100, 3, '2024-08-31', 10000);
('MT10', 'Vitamin B2', 'Chai 30 viên', 'Bổ sung vitamin B2', 80, 100, 3, '2024-08-31', 10000);
('MT11', 'Vitamin B3', 'Chai 30 viên', 'Bổ sung vitamin B3', 80, 100, 3, '2024-08-31', 10000);
('MT12', 'Vitamin B5', 'Chai 30 viên', 'Bổ sung vitamin B5', 80, 100, 3, '2024-08-31', 10000);
('MT13', 'Vitamin B6', 'Chai 30 viên', 'Bổ sung vitamin B6', 80, 100, 3, '2024-08-31', 10000);
('MT14', 'Vitamin B7', 'Chai 30 viên', 'Bổ sung vitamin B7', 80, 100, 3, '2024-08-31', 10000);


-- Insert data into CHITIETTHUOC table
INSERT INTO CHITIETTHUOC (MATHUOC, SOTT, SODT, SOLUONG, THOIDIEMDUNG)
VALUES
('MT01', 1, 'DT01', 10, 'Sáng'),
('MT01', 2, 'DT01', 10, 'Trưa'),
('MT01', 3, 'DT01', 10 ,'Tối'),
('MT02', 1, 'DT02', 1, 'Ngày 1 viên'),
('MT03', 1, 'DT03', 1, 'Ngày 1 viên');


-- Insert data into LOAIDICHVU table  
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES
('DV01', 'Khám răng', 'Khám và tư vấn răng', 200000),
('DV02', 'Chụp X-quang', 'Chụp X-quang phổi hoặc các bộ phận khác', 150000),
('DV03', 'Xét nghiệm máu', 'Xét nghiệm các chỉ số máu', 50000);
('DV04', 'Tẩy trắng răng', 'Tẩy trắng răng', 500000);
('DV05', 'Bọc răng sứ' , 'Bọc răng sứ thẩm mỹ', 1000000);


-- Insert data into CHITIETDV table
INSERT INTO CHITIETDV (MADV, SOTT, SODT, SOLUONG)  
VALUES
('DV01', 1, 'DT04', 1),
('DV02', 1, 'DT04', 1),
('DV03', 1, 'DT05', 1);