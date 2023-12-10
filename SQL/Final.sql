USE master;
GO

-- 21126090 - 21126054 - 21126072 - 21126088

-- MỤC LỤC

-- 1. TẠO CƠ SỞ DỮ LIỆU
-- 2. PHÂN QUYỀN
-- 3. TRIGGER
-- 4. NHẬP LIỆU


-- 1. TẠO CƠ SỞ DỮ LIỆU----------------------------------------------------------------------------------------------------
--USE MASTER 
--GO
--DROP DATABASE PKNHAKHOA
IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = 'PKNHAKHOA')
BEGIN
    CREATE DATABASE PKNHAKHOA;
END
GO

USE PKNHAKHOA;
GO


IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'KHACHHANG')
BEGIN
    CREATE TABLE KHACHHANG 
    (
        SODT VARCHAR(10) PRIMARY KEY CHECK (LEN(SODT) = 10),
        HOTEN NVARCHAR(50),
        PHAI NVARCHAR(5) CHECK(PHAI IN (N'Nam', N'Nữ')),
        NGAYSINH DATE,
        DIACHI NVARCHAR(250),
        MATKHAU VARCHAR(20),
        _DAKHOA BIT DEFAULT 0
    );
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NHASI')
BEGIN
	CREATE TABLE NHASI 
	(
		MANS VARCHAR(10) PRIMARY KEY,
		HOTEN NVARCHAR(50),
		PHAI NVARCHAR(5) CHECK(PHAI IN (N'Nam', N'Nữ')),
		GIOITHIEU NVARCHAR(500),
		MATKHAU VARCHAR(20),
		_DAKHOA BIT DEFAULT 0
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NHANVIEN')
BEGIN
	CREATE TABLE NHANVIEN 
	(
		MANV VARCHAR(10) PRIMARY KEY,
		HOTEN NVARCHAR(50),
		PHAI NVARCHAR(5) CHECK(PHAI IN (N'Nam', N'Nữ')),
		VITRICV NVARCHAR(50),
		MATKHAU VARCHAR(20),
		_DAKHOA BIT DEFAULT 0
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'QTV')
BEGIN
	CREATE TABLE QTV 
	(
		MAQTV VARCHAR(10) PRIMARY KEY,
		HOTEN NVARCHAR(50),
		PHAI NVARCHAR(5) CHECK(PHAI IN (N'Nam', N'Nữ')),
		MATKHAU VARCHAR(20),
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'LOAITHUOC')
BEGIN
	CREATE TABLE LOAITHUOC
	(
		MATHUOC VARCHAR(10) PRIMARY KEY,
		TENTHUOC NVARCHAR(50),
		DONVITINH NVARCHAR(20),
		CHIDINH NVARCHAR(200),
		SLTON INT CHECK (SLTON >= 0),
		SLNHAP INT CHECK (SLNHAP > 0),
		SLDAHUY INT CHECK (SLDAHUY >= 0),
		NGAYHETHAN DATE,
		DONGIA FLOAT CHECK (DONGIA > 0)
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'LOAIDICHVU')
BEGIN
	CREATE TABLE LOAIDICHVU
	(
		MADV VARCHAR(10) PRIMARY KEY,
		TENDV NVARCHAR(50),
		MOTA NVARCHAR(500),
		DONGIA FLOAT CHECK (DONGIA > 0)
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CA')
BEGIN
	CREATE TABLE CA
	(
		MACA VARCHAR(10) PRIMARY KEY,
		GIOBATDAU TIME,
		GIOKETTHUC TIME
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CHITIETDV')
BEGIN
	CREATE TABLE CHITIETDV
	(
		MADV VARCHAR(10),
		SOTT INT,
		SODT VARCHAR(10),
		SOLUONG INT CHECK(SOLUONG > 0),
		DONGIALUCTHEM FLOAT CHECK(DONGIALUCTHEM > 0),
		PRIMARY KEY(SODT, SOTT, MADV)
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CHITIETTHUOC')
BEGIN
	CREATE TABLE CHITIETTHUOC
	(
		MATHUOC VARCHAR(10),
		SOTT INT,
		SODT VARCHAR(10),
		SOLUONG INT CHECK (SOLUONG > 0),
		THOIDIEMDUNG NVARCHAR(200),
		DONGIALUCTHEM FLOAT CHECK(DONGIALUCTHEM > 0),
		PRIMARY KEY(SODT, SOTT, MATHUOC)
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'LICHRANH')
BEGIN
	CREATE TABLE LICHRANH
	(
		MANS VARCHAR(10),
		SOTT INT,
		MACA VARCHAR(10),
		NGAY DATE,
		PRIMARY KEY(MANS, SOTT)
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'LICHHEN')
BEGIN
	CREATE TABLE LICHHEN
	(
		MANS VARCHAR(10),
		SOTT INT,
		LYDOKHAM NVARCHAR(200),
		SODT VARCHAR(10)
		PRIMARY KEY(MANS, SOTT, SODT)
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'HOSOBENH')
BEGIN
	CREATE TABLE HOSOBENH
	(
		SODT VARCHAR(10),
		SOTT INT,
		NGAYKHAM DATE,
		DANDO NVARCHAR(500),
		MANS VARCHAR(10),
		_DAXUATHOADON BIT DEFAULT 0
		PRIMARY KEY(SODT, SOTT)
	);
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'HOADON')
BEGIN
	CREATE TABLE HOADON
	(
		SODT VARCHAR(10),
		SOTT INT,
		NGAYXUAT DATE,
		TONGCHIPHI FLOAT CHECK (TONGCHIPHI > 0),
		_DATHANHTOAN BIT DEFAULT 0,
		MANV VARCHAR(10)
		PRIMARY KEY(SODT, SOTT)
	);
END

--PK1 LICHRANH(MANS) --> NHASI(MANS)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_LR_NS')
BEGIN
    ALTER TABLE LICHRANH
    ADD CONSTRAINT FK_LR_NS
    FOREIGN KEY(MANS)
    REFERENCES NHASI(MANS);
END

--PK2 LICHRANH(MACA) --> CA(MACA)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_LR_CA')
BEGIN
    ALTER TABLE LICHRANH
    ADD CONSTRAINT FK_LR_CA
    FOREIGN KEY(MACA)
    REFERENCES CA(MACA);
END

--PK3 LICHHEN(MANS, SOTT) --> LICHRANH(MANS, SOTT)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_LH_LR')
BEGIN
    ALTER TABLE LICHHEN
    ADD CONSTRAINT FK_LH_LR
    FOREIGN KEY(MANS, SOTT)
    REFERENCES LICHRANH(MANS, SOTT);
END

--PK4 LICHHEN(SODT) --> KHACHHANG(SODT)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_LH_KH')
BEGIN
	ALTER TABLE LICHHEN
	ADD CONSTRAINT FK_LH_KH
	FOREIGN KEY(SODT)
	REFERENCES KHACHHANG(SODT);
END

-- PK5 HOSOBENH(MANS) --> NHASI(MANS)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_HSB_NS')
BEGIN
    ALTER TABLE HOSOBENH
    ADD CONSTRAINT FK_HSB_NS
    FOREIGN KEY(MANS)
    REFERENCES NHASI(MANS);
END

-- PK6 HOSOBENH(SODT) --> KHACHHANG(SODT)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_HSB_KH')
BEGIN
    ALTER TABLE HOSOBENH
    ADD CONSTRAINT FK_HSB_KH
    FOREIGN KEY(SODT)
    REFERENCES KHACHHANG(SODT);
END

-- PK7 HOADON(SODT, SOTT) --> HOSOBENH(SODT, SOTT)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_HD_HSB')
BEGIN
    ALTER TABLE HOADON
    ADD CONSTRAINT FK_HD_HSB
    FOREIGN KEY(SODT, SOTT)
    REFERENCES HOSOBENH(SODT, SOTT);
END

-- PK8 HOADON(MANV) --> NHANVIEN(MANV)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_HD_NV')
BEGIN
    ALTER TABLE HOADON
    ADD CONSTRAINT FK_HD_NV
    FOREIGN KEY(MANV)
    REFERENCES NHANVIEN(MANV);
END

-- PK9 CHITIETDV(MADV) --> LOAIDICHVU(MADV)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_CTDV_LDV')
BEGIN
    ALTER TABLE CHITIETDV
    ADD CONSTRAINT FK_CTDV_LDV
    FOREIGN KEY(MADV)
    REFERENCES LOAIDICHVU(MADV);
END

-- PK10 CHITIETDV(SODT, SOTT) --> HOSOBENH(SODT, SOTT)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_CTDV_HSB')
BEGIN
    ALTER TABLE CHITIETDV
    ADD CONSTRAINT FK_CTDV_HSB
    FOREIGN KEY(SODT, SOTT)
    REFERENCES HOSOBENH(SODT, SOTT);
END

-- PK11 CHITIETTHUOC(MATHUOC) --> LOAITHUOC(MATHUOC)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_CTT_LT')
BEGIN
    ALTER TABLE CHITIETTHUOC
    ADD CONSTRAINT FK_CTT_LT
    FOREIGN KEY(MATHUOC)
    REFERENCES LOAITHUOC(MATHUOC);
END

-- PK12 CHITIETTHUOC(SODT, SOTT) --> HOSOBENH(SODT, SOTT)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_CTT_HSB')
BEGIN
    ALTER TABLE CHITIETTHUOC
    ADD CONSTRAINT FK_CTT_HSB
    FOREIGN KEY(SODT, SOTT)
    REFERENCES HOSOBENH(SODT, SOTT);
END

-------------------------------------------------------------------------------------------------------
-- 4. NHẬP LIỆU----------------------------------------------------------------------------------------



-- Thêm NHASI
USE PKNHAKHOA 
GO
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

-- Thêm LICHRANH
-- Ngày 2024-01-01
DECLARE @TODAY DATE;
SET @TODAY = GETDATE();
PRINT @TODAY
INSERT INTO LICHRANH (MANS, SOTT, MACA, NGAY)
VALUES
    ('NS0003', 1, 'CA001', @TODAY),
    ('NS0004', 1, 'CA001', @TODAY),
    ('NS0001', 1, 'CA002', @TODAY),
    ('NS0010', 1, 'CA002', @TODAY),
    ('NS0007', 1, 'CA003', @TODAY),
    ('NS0001', 2, 'CA003', @TODAY),
    ('NS0003', 2, 'CA004', @TODAY),
    ('NS0004', 2, 'CA004', @TODAY),
    ('NS0002', 1, 'CA005', @TODAY),
    ('NS0006', 1, 'CA005', @TODAY),
    ('NS0006', 2, 'CA006', @TODAY),
    ('NS0003', 3, 'CA006', @TODAY);

-- Ngày 2024-01-02
INSERT INTO LICHRANH (MANS, SOTT, MACA, NGAY)
VALUES
    ('NS0006', 3, 'CA002', DATEADD(DAY, 1, @TODAY)),
    ('NS0009', 1, 'CA002', DATEADD(DAY, 1, @TODAY)),
    ('NS0001', 3, 'CA004', DATEADD(DAY, 1, @TODAY)),
    ('NS0002', 2, 'CA004', DATEADD(DAY, 1, @TODAY));

-- Ngày 2024-01-03
INSERT INTO LICHRANH (MANS, SOTT, MACA, NGAY)
VALUES
    ('NS0001', 4, 'CA001', DATEADD(DAY, 2, @TODAY)),
    ('NS0010', 2, 'CA001', DATEADD(DAY, 2, @TODAY)),
    ('NS0007', 2, 'CA005', DATEADD(DAY, 2, @TODAY)),
    ('NS0004', 3, 'CA005', DATEADD(DAY, 2, @TODAY));

-- Ngày 2024-01-04
INSERT INTO LICHRANH (MANS, SOTT, MACA, NGAY)
VALUES
    ('NS0005', 1, 'CA004', DATEADD(DAY, 3, @TODAY)),
    ('NS0009', 2, 'CA004', DATEADD(DAY, 3, @TODAY)),
    ('NS0009', 3, 'CA006', DATEADD(DAY, 3, @TODAY)),
    ('NS0008', 1, 'CA006', DATEADD(DAY, 3, @TODAY));

-- Ngày 2024-01-05
INSERT INTO LICHRANH (MANS, SOTT, MACA, NGAY)
VALUES
    ('NS0005', 2, 'CA002', DATEADD(DAY, 4, @TODAY)),
    ('NS0004', 4, 'CA002', DATEADD(DAY, 4, @TODAY));

-- Ngày 2024-01-06
INSERT INTO LICHRANH (MANS, SOTT, MACA, NGAY)
VALUES
    ('NS0005', 5, 'CA005', DATEADD(DAY, 5, @TODAY)),
    ('NS0003', 5, 'CA005', DATEADD(DAY, 5, @TODAY)),
    ('NS0007', 6, 'CA006', DATEADD(DAY, 5, @TODAY)),
    ('NS0010', 6, 'CA006', DATEADD(DAY, 5, @TODAY));


--Nhap lieu bang KHACHHANG
INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0371234567', N'Nguyễn Huyền Trang', N'Nữ', '1978-05-15', N'15/3 Hoàng Hoa Thám, Phường 6, Quận 3, TP.HCM', 'P@ssw0rd!');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0712345333', N'Võ Minh Tuấn', N'Nam', '1992-09-23', N'28/6 Phan Chu Trinh, Phường Bến Thành, Quận 1, TP.HCM', 'Qwerty123#');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0945678765', N'Hoàng Thị Mai Phương', N'Nữ', '1982-08-18', N'291 Đường Đại Lộ Bình Dương, TP.Thủ Dầu Một, Bình Dương', '9M!xA$4e');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0934567890', N'Vũ Thị Hằng', N'Nữ', '1985-11-10', N'42/9 Ngô Quyền, Phường 5, Quận 10, TP.HCM', 'Ch0c0l@t3&');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0309876543', N'Quách Văn Phúc', N'Nam', '1996-03-08', N'50 Võ Thị Sáu, Phường Thái Bình, TP.Biên Hòa, Đồng Nai', 'TrungThu@2022');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0798712432', N'Bùi Thị Mai Anh', N'Nữ', '1980-07-20', N'567 Nguyễn Đình Chính, Quận Phú Nhuận, TP.HCM', 'M0tP@$$w0rd');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU, _DAKHOA)
VALUES ('0945678901', N'Đoàn Văn Đức', N'Nam', '2003-12-05', N'18/7 Bà Huyện Thanh Quan, Phường Tân Định, Quận 1, TP.HCM', 'B3st@nsw3r!', 1);

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0323456789', N'Lê Thị Thu Hà', N'Nữ', '1971-04-14', N'63/5 Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, TP.HCM', 'Secur1ty*');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0712345678', N'Ngô Đình Quân', N'Nam', '1998-08-02', N'201 Lê Thị Riêng, Phường Bến Thành, Quận 1, TP.HCM', 'H@ppyD@ys7');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0987654321', N'Dương Thị Thảo', N'Nữ', '1989-06-19', N'72/3 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP.HCM', 'L0ngP@ssw0rd#');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0301234567', N'Hoàng Văn Tùng', N'Nam', '2002-01-30', N'52/14 Lý Thường Kiệt, Phường 10, Quận 11, TP.HCM', 'P!n3@pple$2');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0743216549', N'Nguyễn Thị Bích Ngọc', N'Nữ', '1975-10-03', N'90/2 Đinh Công Tráng, Phường Tân Đông Hiệp, TP.Dĩ An, Bình Dương', '5tr0ngP@ss!');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0912345678', N'Võ Văn Thắng', N'Nam', '1990-09-17', N'33 Lê Hồng Phong, Phường Phước Tân, TP.Biên Hòa, Đồng Nai', 'H3ll0W0r1d$');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0378236541', N'Vũ Thị Hồng Loan', N'Nữ', '1983-07-27', N'22/10 Võ Văn Tần, Phường Long Bình, TP.Biên Hòa, Đồng Nai', 'G00dM0rn!ng9');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU, _DAKHOA)
VALUES ('0798765432', N'Quách Minh Tâm', N'Nam', '2000-02-12', N'31/5 Đinh Bộ Lĩnh, Phường Lái Thiêu, TP.Thuận An, Bình Dương', 'W@t3rM3l0n#', 1);

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0723456789', N'Bùi Văn Thành', N'Nam', '1972-11-09', N'295 Lê Lai, Phường Bến Thành, Quận 1, TP.HCM', 'Sunsh!ne@21');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0923456780', N'Đoàn Thị Kim Ngân', N'Nữ', '1994-06-25', N'17/3 Phan Kế Bính, Phường Đa Kao, Quận 1, TP.HCM', '2F@st2Fur!ous');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0345678901', N'Lê Minh Hoàng', N'Nam', '1987-12-21', N'237 Phạm Ngọc Thạch, Phường 6, Quận 3, TP.HCM', 'F0r3v3rY0ung*');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0765432109', N'Ngô Thị Lan Anh', N'Nữ', '1999-04-07', N'55/8 Ngô Thời Nhiệm, Phường Tân Quý, Quận Tân Phú, TP.HCM', 'C@t&DogL0v3r');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0387654321', N'Dương Văn Quyền', N'Nam', '1977-03-28', N'172 Đường Lê Đại Hành, Phường 9, Quận 11, TP.HCM', 'B3@chP@rad1$3');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0356123456', N'Nguyễn Huyền Thu', N'Nữ', '1979-08-15', N'34/7B Lê Hồng Phong, Phường 4, Quận 5, TP.HCM', 'B3st@nsw3r!');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0789654321', N'Lê Đức Anh', N'Nam', '1993-05-02', N'14A Đinh Công Tráng, Phường Tân Đông Hiệp, TP.Dĩ An, Bình Dương', 'Secur1ty*');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0967123456', N'Trần Thị Mai Phương', N'Nữ', '1995-06-14', N'72 Phan Kế Bính, Phường Đa Kao, Quận 1, TP.HCM', 'H@ppyD@ys7');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0334123456', N'Nguyễn Minh Tuấn', N'Nam', '1970-01-25', N'27/2 Hoàng Hoa Thám, Phường 7, Quận Bình Thạnh, TP.HCM', 'L0ngP@ssw0rd#');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0823654321', N'Vũ Thị Thu Hằng', N'Nữ', '1984-12-03', N'8 Đường Đại Lộ Bình Dương, TP.Thủ Dầu Một, Bình Dương', 'P!n3@pple$2');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0978564321', N'Trần Văn Minh', N'Nam', '1996-11-09', N'56/10 Ngô Thời Nhiệm, Phường Tân Quý, Quận Tân Phú, TP.HCM', '5tr0ngP@ss!');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0967123664', N'Lý Thị Thảo', N'Nữ', '1973-07-28', N'42 Lê Lai, Phường Bến Thành, Quận 1, TP.HCM', 'H3ll0W0r1d$');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0967123877', N'Phạm Thị Thu Hà', N'Nữ', '1987-09-21', N'49B Phạm Ngọc Thạch, Phường 6, Quận 3, TP.HCM', 'G00dM0rn!ng9');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0321654321', N'Hoàng Văn Thành', N'Nam', '1998-02-10', N'2B Phan Chu Trinh, Phường Bến Thành, Quận 1, TP.HCM', 'P@ssw0rd!');

INSERT INTO KHACHHANG (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
VALUES ('0789652221', N'Nguyễn Thị Thuý Nga', N'Nữ', '1981-03-07', N'121 Lê Thị Riêng, Phường Bến Thành, Quận 1, TP.HCM', 'Qwerty123#');

--Nhap lieu bang NHANVIEN
INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0001', N'Trần Thị Bảo Trâm', N'Nữ', N'Hành chính phòng khám', 'B@n4n@&Sm1l3*');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0002', N'Lê Thị Ngọc Hà', N'Nữ', N'Y tá', 'P@rk#J0g$L0v3');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0003', N'Lý Thị Minh Tuyết', N'Nữ', N'Y tá', 'W1nt3rT!m3@Out');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0004', N'Nguyễn Thị Thanh Tâm', N'Nữ', N'Y tá', 'S4f3&H@ppy*Day');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0005', N'Phạm Thị Thu Hiền', N'Nữ', N'Hành chính phòng khám', 'M00nL!ght&St@rs');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0006', N'Nguyễn Thị Thảo Vy', N'Nữ', N'Y tá', '7H1s1sP@ssw0rd');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0007', N'Nguyễn Thị Mai An', N'Nữ', N'Y tá', 'B1cycl3&4FUn#');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0008', N'Trương Thị Kim Oanh', N'Nữ', N'Quản lý trưởng', 'H3@rt&S0ul*H@ppy');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0009', N'Bùi Đình Tùng', N'Nam', N'Hành chính phòng khám', 'J@zzY@rd&Rhythm');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0010', N'Hoàng Thị Diệu Linh', N'Nữ', N'Y tá', '8L1ghts&Cam3r@#');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0011', N'Đặng Thị Phương Loan', N'Nữ', N'Hành chính phòng khám', 'W0nd3rful*W0rld');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0012', N'Trần Thị Kim Anh', N'Nữ', N'Y tá', 'M@gn1f!c3nt@V!3w');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0013', N'Bùi Văn Đạt', N'Nam', N'Y tá', 'P@r4d!s3*3sc@p3');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0014', N'Võ Thị Quỳnh Nga', N'Nữ', N'Hành chính phòng khám', 'Ch3ck3r3d&Fl@g');

INSERT INTO NHANVIEN (MANV, HOTEN, PHAI, VITRICV, MATKHAU)
VALUES ('NV0015', N'Võ Thanh Long', N'Nam', N'Quản lý phó', 'H1lls&Gr33n$');

--Nhap lieu bang Lich hen
INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0001', 1, N'Đau rát răng và nướu: Tôi đã cảm thấy đau rát và sưng nướu ở chiếc răng ở phía dưới bên trái trong vài ngày qua. Đau đớn khi chải răng và ăn.', '0323456789');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0002', 1, N'Tôi nhận thấy có một vết đen trên chiếc răng cửa sau bên trái và nghi ngờ răng bị hỏng. Tôi muốn làm sạch và lấy mảng cặn.', '0712345678');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0003', 1, N'Lợi của tôi thường bị sưng và chảy máu khi chải răng. Tôi lo lắng về tình trạng viêm nướu này và muốn tư vấn và điều trị.', '0987654321');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0004', 1, N'Chiếc răng trước cửa đã bị nứt và tôi cảm thấy đau.', '0301234567');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0008', 1, N'Mặt nướu ở phía dưới răng cửa sau bên phải đã sưng lên và tôi cảm thấy đau hàm mặt khi nhai.', '0743216549');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0009', 1, N'Nghi ngờ có vết thương trong miệng. Tôi thấy có một vết thương nhỏ trên bên trong má lúp và lo lắng về tính trạng này.', '0912345678');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0010', 1, N'Răng của tôi lệch và tôi muốn tư vấn về cách chỉnh nha.', '0378236541');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0003', 2, N'Răng xấu, cần được khám và tư vấn niềng răng.', '0723456789');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0009', 2, N'Mất một chiếc răng mọc ở phía trên và lo lắng về việc điều này có thể ảnh hưởng đến cách nhai và nụ cười của tôi.', '0923456780');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0001', 2, N'Nhổ răng khôn', '0345678901');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0005', 1, N'Thay răng giả. Tôi muốn thay chiếc răng giả cũ bằng một chiếc mới để đảm bảo chúng vẫn hoạt động tốt.', '0765432109');

INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
VALUES ('NS0006', 1, N'Người thân tôi nói rằng tôi kêu răng khi ngủ, và tôi muốn kiểm tra xem có vấn đề gì về nha khoa gây ra điều này.', '0387654321');

-- NHAP LOAI THUOC
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT01', N'Paracetamol', N'Viên', N'Giảm đau nhẹ', 100, 200, 5, '2024-12-31', 5000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT02', N'Amoxicillin', N'Hộp ', N'Kháng sinh phổ rộng', 50, 100, 1, '2024-08-31', 20000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT03', N'Vitamin C', N'Chai ', N'Bổ sung vitamin C', 80, 100, 3, '2024-08-31', 12000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT04', N'Vitamin B', N'Chai ', N'Bổ sung vitamin B', 80, 100, 3, '2024-08-31', 13000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT05', N'Vitamin D', N'Chai ', N'Bổ sung vitamin D', 80, 100, 3, '2024-08-31', 14000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT06', N'Vitamin E', N'Chai ', N'Bổ sung vitamin E', 80, 100, 3, '2024-08-31', 15000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT07', N'Vitamin K', N'Chai ', N'Bổ sung vitamin K', 80, 100, 3, '2024-08-31', 16000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT08', N'Vitamin A', N'Chai ', N'Bổ sung vitamin A', 80, 100, 3, '2024-08-31', 17000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT09', N'Vitamin B1', N'Chai ', N'Bổ sung vitamin B1', 80, 100, 3, '2024-08-31', 17000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT10', N'Vitamin B2', N'Chai ', N'Bổ sung vitamin B2', 80, 100, 3, '2024-08-31', 15000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT11', N'Vitamin B3', N'Chai ', N'Bổ sung vitamin B3', 80, 100, 3, '2024-08-31', 20000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT12', N'Vitamin B5', N'Chai ', N'Bổ sung vitamin B5', 80, 100, 3, '2024-08-31', 40000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT13', N'Vitamin B6', N'Chai ', N'Bổ sung vitamin B6', 80, 100, 3, '2024-08-31', 60000);
INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA) 
VALUES ('MT14', N'Vitamin B7', N'Chai ', N'Bổ sung vitamin B7', 80, 100, 3, '2024-08-31', 70000);

-- -THEM LOAI DICH VU
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV01', N'Khám răng', N'Dịch vụ này bao gồm việc khám và tư vấn về tình trạng răng miệng của bệnh nhân', 200000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV02', N'Chụp X-quang', N'Dịch vụ này cung cấp việc chụp X-quang để đánh giá và chuẩn đoán tình trạng răng miệng', 150000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV03', N'Đắp răng khiểng', N'Dịch vụ này đảm nhiệm việc đắp răng khiểng để điều chỉnh vị trí của răng', 500000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV04', N'Tẩy trắng răng', N'Dịch vụ này cung cấp việc tẩy trắng răng để làm sáng và làm trắng răng', 500000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV05', N'Bọc răng sứ' , N'Dịch vụ này bao gồm việc bọc răng bằng vật liệu sứ để cải thiện ngoại hình và chức năng của răng', 1000000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV06', N'Cấy ghép Implant', N'Dịch vụ này liên quan đến việc cấy ghép Implant nha khoa để thay thế răng hoặc hỗ trợ các công việc nha khoa khác', 2000000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV07', N'Chỉnh nha', N'Dịch vụ này đảm nhiệm việc chỉnh nha để điều chỉnh vị trí của răng và cải thiện hàm răng', 5000000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV08', N'Phục hình răng sứ', N'Dịch vụ này liên quan đến việc phục hình răng bằng vật liệu sứ để khôi phục ngoại hình và chức năng của răng', 1000000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV09', N'Cạo vôi răng', N'Dịch vụ này bao gồm việc cạo vôi trên bề mặt răng nhằm loại bỏ mảng bám và tái tạo vệ sinh răng miệng', 500000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV10', N'Nhổ răng', N'Dịch vụ này đảm nhiệm việc nhổ răng khi cần thiết, bao gồm cả nhổ răng khôn', 250000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV11', N'Chữa nha chu', N'Dịch vụ này cung cấp việc chữa trị các bệnh nha chu như viêm nướu, chảy máu nướu, và hôi miệng', 300000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV12', N'Phẫu thuật trong miệng', N'Dịch vụ này liên quan đến việc phẫu thuật trong miệng như tạo hình lợi, tạo hình mô mềm, hoặc phẫu thuật tuyến nước bọt', 5000000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV13', N'Chữa tủy răng trẻ em', N'Dịch vụ này cung cấp việc chữa trị tủy răng trẻ em, bao gồm cả việc cấp cứu trong trường hợp cần thiết', 1000000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV14', N'Trám răng sữa trẻ em', N'Dịch vụ này liên quan đến việc chữa trị các vấn đề răng nội nha như viêm tủy, nhiễm trùng, hoặc đau răng ADD', 500000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV15', N'Chữa răng nội nha', N'Dịch vụ này bao gồm việc phục hình răng giả để thay thế răng mất, cung cấp chức năng hàm răng', 500000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV16', N'Phục hình răng giả', N'Dịch vụ này đảm nhiệm việc làm cầu răng bằng vật liệu sứ để thay thế nhiều răng mất liên tiếp', 500000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV17', N'Cầu răng sứ', N'Dịch vụ này cung cấp các dịch vụ nha khoa tổng quát như khám răng', 1100000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV18', N'Nha khoa tổng quát', N'Dịch vụ này cung cấp các dịch vụ nha khoa tổng quát như khám răng, tẩy trắng, trám răng, và chữa trị các vấn đề thông thường', 350000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV19', N'Nha khoa thẩm mỹ', N'Dịch vụ này liên quan đến việc cải thiện ngoại hình và thẩm mỹ răng miệng bằng các phương pháp như tẩy trắng, bọc răng sứ, chỉnh nha thẩm mỹ', 500000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV20', N'Đính đá răng' , N'Dịch vụ này bao gồm việc đính đá ngọc trên răng để tạo điểm nhấn và thẩm mỹ cho những người muốn trang trí cho nụ cười của mình', 100000);
INSERT INTO LOAIDICHVU (MADV, TENDV, MOTA, DONGIA)
VALUES('DV21', N'Chỉnh nha thẩm mỹ', N'Dịch vụ này đảm nhiệm việc chỉnh nha nhằm cải thiện vị trí và hình dáng của răng một cách thẩm mỹ', 1000000);

--Thêm hồ sơ bệnh án
INSERT INTO HOSOBENH(SODT, SOTT, NGAYKHAM, DANDO, MANS, _DAXUATHOADON)
VALUES
('0323456789', 1, '2024-01-01', N'Chải răng cẩn thận, ít nhất hai lần mỗi ngày. Sử dụng bàn chải mềm và kem đánh răng chứa fluor. Hạn chế thức ăn và đồ uống nóng hoặc lạnh.', 'NS0001', 0),
('0712345678', 1, '2024-01-02', N'Làm sạch răng bằng cách sử dụng chỉ nha khoa và bàn chải mềm mỗi ngày để tránh tái diễn tình trạng này trong tương lai. Không cần tái khám.', 'NS0002', 0),
('0987654321', 1, '2024-01-07', N'Hạn chế thức ăn nóng hoặc cay và hãy duy trì vệ sinh miệng đúng cách. Uống thuốc theo toa đã chỉ định và tái khám sau 2 tuần. Nếu vết viêm không giảm, cần đến khám ngay.', 'NS0003', 0),
('0301234567', 1, '2024-01-02', N'Đề nghị tránh những thức ăn cứng hoặc nhai mạnh, và tránh lâu dài trong nhiệt độ lạnh hoặc nóng. Uống thuốc theo toa đã chỉ định và tái khám sau 2 tuần.', 'NS0004', 0),
('0743216549', 1, '2024-01-02', N'Làm sạch kỹ miệng và nướu hàng ngày. Hạn chế thức ăn và đồ uống có nhiều đường.', 'NS0008', 0),
('0912345678', 1, '2024-01-05', N'Cần tiếp tục chăm sóc và tự theo dõi vết thương tại nhà. Nếu vết thương không lành hoặc tình trạng trở nên nghiêm trọng hơn, hãy quay lại để kiểm tra. Uống thuốc đều đặn theo toa đã kê.', 'NS0009', 0),
('0378236541', 1, '2024-01-03', N'Tuân thủ lịch hẹn kiểm tra định kỳ và duy trì vệ sinh miệng tốt. Tránh thức ăn cứng và cẩn thận với việc sử dụng răng để cắn các vật cứng. Nếu có triệu chứng bất thường, vui lòng đến kiểm tra ngay.', 'NS0010', 0),
('0723456789', 1, '2024-01-03', N'Tuân thủ lịch hẹn kiểm tra định kỳ và duy trì vệ sinh miệng tốt. Tránh thức ăn cứng và cẩn thận với việc sử dụng răng để cắn các vật cứng. Nếu có triệu chứng bất thường, vui lòng đến kiểm tra ngay.', 'NS0003', 0),
('0923456780', 1, '2024-01-05', N'Sau cấy ghép implant, hạn chế ăn thực phẩm cứng, tránh hút thuốc, và thực hiện vệ sinh kỹ lưỡng vùng cấy ghép để đảm bảo quá trình phục hồi suôn sẻ.', 'NS0009', 0),
('0345678901', 1, '2024-01-05', N'Trong vài ngày đầu sau nhổ răng nên ăn đồ mềm và dễ tiêu hóa để xương hàm không phải làm việc nhiều. Không ăn thức ăn quá cứng, quá mặn, đồ ngọt, chua, cay, đồ uống có ga, cồn, quá nóng và các chất kích thích khác trong 2 ngày đầu tiên. Không hút thuốc trong ít nhất 3 ngày.', 'NS0001', 0),
('0765432109', 1, '2024-01-07', N'Hạn chế thức ăn cứng và cẩn thận không dùng răng giả để cắn vật cứng. Đảm bảo vệ sinh miệng đúng cách bằng cách đánh răng và súc miệng thường xuyên. Nếu có vấn đề hoặc triệu chứng lạ, nên liên hệ với nha sĩ ngay lập tức.', 'NS0005', 0),
('0387654321', 1, '2024-01-01', N'Trước khi ngủ, thư giãn bằng việc thực hiện các kỹ thuật thư giãn như thở sâu, tập yoga, hoặc lắng nghe âm nhạc. Sử dụng đồng hồ bảo vệ răng trong lúc ngủ.', 'NS0006', 0);

--Nhap lieu bang QTV
INSERT INTO QTV (MAQTV, HOTEN, PHAI, MATKHAU)
VALUES ('QTV0001', N'Vũ Thành Công', N'Nam', '21126054');

INSERT INTO QTV (MAQTV, HOTEN, PHAI, MATKHAU)
VALUES ('QTV0002', N'Nguyễn Ngọc Hoàng Khánh', N'Nam', '21126072');

INSERT INTO QTV (MAQTV, HOTEN, PHAI, MATKHAU)
VALUES ('QTV0003', N'Võ Diệp Phi Vũ', N'Nam', '21126088');

INSERT INTO QTV (MAQTV, HOTEN, PHAI, MATKHAU)
VALUES ('QTV0004', N'Vũ Nguyễn Xuân Uyên', N'Nữ', '21126090');


USE PKNHAKHOA
GO 

-- 21126090 - 21126088 - 21126054 - 21126072

-- NOTE
-- ALL..: CHỨC NĂNG CHO NHIỀU ROLE
-- KH..: CHỨC NĂNG CHO ROLE KHÁCH HÀNG
-- NV..: CHỨC NĂNG CHO ROLE NHÂN VIÊN
-- NS..: CHỨC NĂNG CHO ROLE NHA SĨ
-- QTV..: CHỨC NĂNG CHO ROLE QUẢN TRỊ VIÊN
----------------------------------


--ALL01/ XEM DANH MỤC THUỐC

CREATE PROC SP_GETALLTHUOC_NV_QTV_NS
AS
BEGIN TRAN
	BEGIN TRY
		SELECT * FROM LOAITHUOC
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
----------------------------------
--ALL02/ XEM DANH SÁCH DỊCH VỤ
GO
CREATE PROC SP_XEMDANHSACHDICHVU_ALL
AS
BEGIN TRAN
	BEGIN TRY
		SELECT * FROM LOAIDICHVU
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
---------------------
--ALL03/ TRUY VẤN HỒ SƠ KHÁM BỆNH
GO
CREATE PROC SP_GETHSB1KH_NV_NS_KH
	@SODT VARCHAR(100)
AS
BEGIN TRAN
	BEGIN TRY
		IF (NOT EXISTS(SELECT * FROM KHACHHANG WHERE SODT = @SODT))
		BEGIN
			RAISERROR(N'Khách hàng này không tồn tại', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		
		ELSE
		BEGIN
			SELECT HSB.SOTT, HSB.SODT SODT, KH.HOTEN HOTEN, DATEDIFF(year,KH.NGAYSINH,GETDATE()) TUOI, NGAYKHAM, NS.HOTEN NHASI, DANDO, CTDV.MADV, TENDV, CTDV.SOLUONG SLDV, CTT.MATHUOC, TENTHUOC, CTT.SOLUONG SLTHUOC, DONVITINH, THOIDIEMDUNG
			FROM HOSOBENH HSB 
			JOIN NHASI NS ON HSB.MANS = NS.MANS
			JOIN KHACHHANG KH ON KH.SODT = HSB.SODT
			JOIN CHITIETDV CTDV ON CTDV.SOTT = HSB.SOTT AND CTDV.SODT = HSB.SODT
			JOIN LOAIDICHVU LDV ON LDV.MADV = CTDV.MADV
			LEFT JOIN CHITIETTHUOC CTT ON CTT.SOTT = HSB.SOTT AND CTT.SODT = HSB.SODT
			LEFT JOIN LOAITHUOC LT ON LT.MATHUOC = CTT.MATHUOC
			WHERE HSB.SODT = @SODT
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN

----------------------------------
--ALL04/ ĐĂNG NHẬP
GO
CREATE OR ALTER PROC SP_DANGNHAP_ALL
	@MATK VARCHAR(100),
	@MATKHAU VARCHAR(20)
AS
BEGIN TRAN
	BEGIN TRY
		IF LEN(@MATK) > 10
		BEGIN
			RAISERROR(N'Tài khoản đăng nhập không hợp lệ.', 16, 1);
			ROLLBACK TRAN
			RETURN
		END 

		DECLARE @ROLE VARCHAR(10);
		DECLARE @_ISLOCK BIT;
		SET @ROLE = NULL;
		SET @_ISLOCK = NULL;

		--Kiểm tra tài khoản đăng nhập có hợp lệ (tk mà mk đều đúng)
		IF EXISTS (SELECT * FROM KHACHHANG WHERE SODT = @MATK AND MATKHAU = @MATKHAU)
		BEGIN
			
			SELECT @ROLE = 'KH', @_ISLOCK = _DAKHOA
			FROM KHACHHANG 
			WHERE SODT = @MATK AND MATKHAU = @MATKHAU;
		END
		ELSE IF EXISTS (SELECT * FROM NHASI WHERE MANS = @MATK AND MATKHAU = @MATKHAU)
		BEGIN
			SELECT @ROLE = 'NS', @_ISLOCK = _DAKHOA
			FROM NHASI 
			WHERE MANS = @MATK AND MATKHAU = @MATKHAU;
		END
		ELSE IF EXISTS (SELECT * FROM NHANVIEN WHERE MANV = @MATK AND MATKHAU = @MATKHAU)
		BEGIN
			SELECT @ROLE = 'NV', @_ISLOCK = _DAKHOA
			FROM NHANVIEN 
			WHERE MANV = @MATK AND MATKHAU = @MATKHAU;
		END
		ELSE IF EXISTS (SELECT * FROM QTV WHERE MAQTV = @MATK AND MATKHAU = @MATKHAU)
		BEGIN
			SET @ROLE = 'QTV';
			SET @_ISLOCK = 0;
		END
		ELSE
		BEGIN
			RAISERROR(N'Tài khoản hoặc mật khẩu không đúng.', 16, 1);
			ROLLBACK TRAN
			RETURN
		END

		IF (@_ISLOCK = 1)
		BEGIN
			RAISERROR(N'Tài khoản đã bị khóa.', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		
		IF @ROLE = 'KH'
		BEGIN
			SELECT 'KH' AS ROLE, SODT, HOTEN, PHAI, NGAYSINH, DIACHI
			FROM KHACHHANG
			WHERE SODT = @MATK;
		END
		ELSE IF @ROLE = 'NS'
		BEGIN
			SELECT 'NS' AS ROLE, MANS, HOTEN, PHAI, GIOITHIEU
			FROM NHASI
			WHERE MANS = @MATK;
		END
		ELSE IF @ROLE = 'NV'
		BEGIN
			SELECT 'NV' AS ROLE, MANV, HOTEN, PHAI, VITRICV
			FROM NHANVIEN
			WHERE MANV = @MATK;
		END
		ELSE IF @ROLE = 'QTV'
		BEGIN
			SELECT 'QTV' AS ROLE, MAQTV, HOTEN, PHAI
			FROM QTV
			WHERE MAQTV = @MATK;
		END

	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN

-------------------------------------------------------
--ALL05/ TẠO LỊCH HẸN
GO
CREATE PROC SP_DATLICHHEN_NV_KH
	@SODT VARCHAR(100),
	@MANS VARCHAR(100),
	@SOTT INT,
	@LYDOKHAM NVARCHAR(200)
AS
BEGIN TRAN
	BEGIN TRY
		IF (EXISTS(SELECT * 
				   FROM LICHHEN
				   WHERE MANS = @MANS AND SOTT = @SOTT))
		BEGIN
			RAISERROR(N'Lỗi: Đã có khách hàng đặt lịch hẹn này.',16,1)
			ROLLBACK TRAN
			RETURN
		END

		IF (EXISTS(SELECT LH.*
				  FROM LICHHEN LH JOIN LICHRANH LR
 				  ON LH.MANS = LR.MANS AND LH.SOTT = LR.SOTT
				  WHERE EXISTS(SELECT *
			 	  			   FROM LICHRANH LR2
			 				   WHERE LR2.MANS != LH.MANS AND LR.NGAY = LR2.NGAY AND LR.MACA = LR2.MACA
			 				   AND LH.SODT = @SODT
			 				   AND LR2.SOTT = @SOTT
			 				   AND LR2.MANS = @MANS)))
		BEGIN
			RAISERROR(N'Lỗi: Các lịch hẹn của cùng một khách hàng không được trùng ca nhau.',16,1)
			ROLLBACK TRAN
			RETURN
		END

		ELSE
		BEGIN
			INSERT INTO LICHHEN(MANS, SODT, LYDOKHAM, SOTT) 
			VALUES(@MANS, @SODT, @LYDOKHAM, @SOTT)
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
----------------------------------
--ALL06/ HỦY LỊCH HẸN
GO
CREATE PROC SP_DELETELICHHEN_NV_KH
	@MANS VARCHAR(100),
	@SODT VARCHAR(100),
	@SOTT INT
AS
BEGIN TRAN
	BEGIN TRY
		IF (NOT EXISTS(SELECT * FROM LICHHEN WHERE SODT = @SODT AND MANS = @MANS AND SOTT = @SOTT))
		BEGIN
			RAISERROR(N'Lịch hẹn này không tồn tại', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		IF (EXISTS(SELECT * 
		FROM LICHHEN LH
		JOIN LICHRANH LR ON LH.MANS = LR.MANS AND LH.SOTT = LR.SOTT
		WHERE SODT = @SODT AND LH.MANS = @MANS AND LH.SOTT = @SOTT AND DATEDIFF(DAY,GETDATE(),NGAY) <= 1))
		BEGIN
			RAISERROR(N'Không thể hủy lịch hẹn trước 1 ngày', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		ELSE
		BEGIN
			DELETE 
			FROM LICHHEN
			WHERE MANS = @MANS AND SOTT = @SOTT
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
----------------------------------
--ALL07/ XEM DANH SÁCH TẤT CẢ NHA SĨ CHƯA BỊ KHÓA TK
GO
CREATE PROC SP_XEMDANHSACHNHASI_ALL
AS
BEGIN TRAN
	BEGIN TRY
		SELECT NS.MANS, NS.HOTEN, NS.PHAI, NS.GIOITHIEU
		FROM NHASI NS
		WHERE NS._DAKHOA = 0
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN

----------------------------------
--ALL02/ XEM THÔNG TIN TOÀN BỘ BẢNG CA
GO
CREATE PROC SP_XEMCA_ALL
AS
BEGIN TRAN
	BEGIN TRY
		SELECT * FROM CA
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
GO
--------------
--KH01/ Tạo tài khoản Khách Hàng (KH)
CREATE PROC SP_TAOTKKH_KH
	@SODT VARCHAR(100),
	@HOTEN NVARCHAR(50),
	@PHAI NVARCHAR(5),
	@NGAYSINH DATE,
	@DIACHI NVARCHAR(250),
	@MATKHAU VARCHAR(20)
AS
BEGIN TRAN
	BEGIN TRY
		IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT)
			OR EXISTS(SELECT 1 FROM QTV WHERE MAQTV = @SODT)
			OR EXISTS(SELECT 1 FROM NHANVIEN WHERE MANV = @SODT)
			OR EXISTS(SELECT 1 FROM NHASI WHERE MANS = @SODT)
		BEGIN
			RAISERROR(N'Tài khoản đã tồn tại trong hệ thống', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		ELSE
		BEGIN
			INSERT INTO KHACHHANG(SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU) 
			VALUES(@SODT, @HOTEN, @PHAI, @NGAYSINH, @DIACHI, @MATKHAU)
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN

--------------
--KH02/ Xem thông tin cá nhân khách hàng
GO
CREATE PROC SP_XEMTHONGTIN_KH
    @SODT VARCHAR(100)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT)
        BEGIN
            SELECT * FROM KHACHHANG WHERE SODT = @SODT
        END
        ELSE
        BEGIN
            RAISERROR(N'Tài khoản không tồn tại trong hệ thống', 16, 1);
            ROLLBACK TRAN
            RETURN
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
        THROW 51000, @errorMessage, 1;
        RETURN
    END CATCH
COMMIT TRAN

------------------------
-- KH03. Cập nhật thông tin cá nhân KH
GO
CREATE PROC SP_CAPNHATTHONGTIN_KH
@SODT VARCHAR(10),  
@HOTEN NVARCHAR(50),
@PHAI NVARCHAR(5),
@NGAYSINH DATE,
@DIACHI NVARCHAR(250), 
@MAT_KHAU_CU VARCHAR(20),
@MAT_KHAU_MOI VARCHAR(20)
AS
BEGIN TRAN
    BEGIN TRY
         SET NOCOUNT ON;
        -- Kiểm tra tồn tại tài khoản
        IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT)
        BEGIN
            -- Kiểm tra mật khẩu cũ
            IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT AND MATKHAU = @MAT_KHAU_CU)
            BEGIN
                -- Cập nhật thông tin khách hàng
                UPDATE KHACHHANG
                SET
                HOTEN = CASE WHEN @HOTEN IS NOT NULL THEN @HOTEN ELSE HOTEN END,
                PHAI = CASE WHEN @PHAI IS NOT NULL THEN @PHAI ELSE PHAI END,
                NGAYSINH = CASE WHEN @NGAYSINH IS NOT NULL THEN @NGAYSINH ELSE NGAYSINH END,  
                DIACHI = CASE WHEN @DIACHI IS NOT NULL THEN @DIACHI ELSE DIACHI END,
                MATKHAU = CASE WHEN @MAT_KHAU_MOI IS NOT NULL THEN @MAT_KHAU_MOI ELSE MATKHAU END
                WHERE SODT = @SODT;
            END
            ELSE
            BEGIN
                -- Nếu mật khẩu cũ không đúng, in ra thông báo lỗi
                RAISERROR(N'Sai mật khẩu cũ', 16, 1);
                ROLLBACK TRAN;
                RETURN;
            END
        END
        ELSE
        BEGIN
            -- Nếu tài khoản không tồn tại, in ra thông báo lỗi
            RAISERROR(N'Tài khoản không tồn tại trong hệ thống', 16, 1);
            ROLLBACK TRAN;
            RETURN;  
        END
    END TRY
    BEGIN CATCH
      DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE(); 
      THROW 51000, @errorMessage, 1;
      ROLLBACK TRAN;
      RETURN; 
    END CATCH
COMMIT TRAN

--KH04. Xem lịch rảnh của nha sĩ từ hiện tại đến hết 30 ngày sau
GO
CREATE PROC SP_LRCHUADATTATCANS_KH
AS
BEGIN TRAN
	BEGIN TRY
		SELECT LR.*
		FROM LICHRANH LR LEFT JOIN LICHHEN LH 
		ON (LR.MANS = LH.MANS AND LR.SOTT = LH.SOTT)
		WHERE LH.MANS IS NULL AND LH.SOTT IS NULL
		AND DATEDIFF(DAY, GETDATE(), LR.NGAY) <= 30
		ORDER BY NGAY 
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN


--KH05. Truy vấn loại thuốc
GO
CREATE PROC SP_TRUYVANLOAITHUOC_KH
    @MA_THUOC VARCHAR(10)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM CHITIETTHUOC WHERE MATHUOC = @MA_THUOC)
        BEGIN
            SELECT LT.TENTHUOC,LT.DONVITINH,LT.CHIDINH,LT.DONGIA
            FROM LOAITHUOC LT
            WHERE LT.MATHUOC = @MA_THUOC
        END
        ELSE
        BEGIN
            RAISERROR('Khong tim thay thong tin thuoc',16,1)
            ROLLBACK TRAN
            RETURN
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
        THROW 51000, @errorMessage, 1;
        RETURN
    END CATCH
COMMIT TRAN


-- KH06. Truy vấn loại dịch vụ
GO
CREATE PROC SP_TRUYDICHVU_KH
    @MA_MADV VARCHAR(10)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM LOAIDICHVU WHERE MADV = @MA_MADV)
        BEGIN
            SELECT LDV.MADV, LDV.TENDV,LDV.MOTA,LDV.DONGIA
            FROM LOAIDICHVU LDV
            WHERE   LDV.MADV = @MA_MADV
        END
        ELSE
        BEGIN
            RAISERROR(N'Không tồn tại mã dịch vụ này.', 16, 1);
            ROLLBACK TRAN
            RETURN
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
        THROW 51000, @errorMessage, 1;
        RETURN
    END CATCH
COMMIT TRAN


-- KH07. Truy vấn lịch hẹn
GO
CREATE PROC SP_TRUYVANLICHHEN_KH
    @SDT VARCHAR(10)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SDT)
        BEGIN
            SELECT LH.MANS MANS, HOTEN TENNS, LH.SOTT SOTT, NGAY, GIOBATDAU, GIOKETTHUC, CA.MACA MACA, LYDOKHAM
			FROM LICHHEN LH 
			JOIN LICHRANH LR ON LH.MANS = LR.MANS AND LH.SOTT = LR.SOTT
			JOIN NHASI NS ON NS.MANS = LH.MANS
			JOIN CA ON CA.MACA = LR.MACA 
			WHERE SODT = @SDT
        END
        ELSE
        BEGIN
            RAISERROR(N'Không tồn tại mã khách hàng này.', 16, 1);
            ROLLBACK TRAN
            RETURN
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
        THROW 51000, @errorMessage, 1;
        RETURN
    END CATCH
COMMIT TRAN
GO

--------------------------
--NV01/ XEM LỊCH TRỰC TỪ NGÀY HIỆN TẠI ĐẾN 7 NGÀY KẾ CỦA NHA SĨ
GO
CREATE PROC SP_GETLICHRANHNS_NV
AS
BEGIN TRAN
	BEGIN TRY
		-- LICH CO HEN CUA NHA SI
		SELECT NGAY, CA.MACA, GIOBATDAU, GIOKETTHUC, LH.SOTT SOTTLH, LH.MANS, NS.HOTEN HOTENNS, KH.SODT SODTKH, KH.HOTEN HOTENKH, LH.LYDOKHAM LYDOKHAM
		FROM LICHHEN LH
		JOIN NHASI NS ON NS.MANS = LH.MANS
		JOIN LICHRANH LR2 ON LR2.MANS = LH.MANS AND LH.SOTT = LR2.SOTT
		JOIN CA ON CA.MACA = LR2.MACA
		JOIN KHACHHANG KH ON KH.SODT = LH.SODT
		WHERE DATEDIFF(DAY,GETDATE(), NGAY) <= 7
		ORDER BY NGAY 

		-- LICH CHUA CO HEN CUA NHA SI
		SELECT NGAY, CA.MACA, GIOBATDAU, GIOKETTHUC, LR.SOTT SOTTLR, LR.MANS, HOTEN HOTENNS
		FROM LICHRANH LR
		JOIN CA ON CA.MACA = LR.MACA
		JOIN NHASI NS ON NS.MANS = LR.MANS
		WHERE NOT EXISTS 
		(
			SELECT 1
			FROM LICHHEN LH
			WHERE LH.MANS = LR.MANS AND LH.SOTT = LR.SOTT
		)
		AND DATEDIFF(DAY,GETDATE(), NGAY) <= 7
		ORDER BY NGAY 
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
------------------------
--NV02/ TẠO TÀI KHOẢN KHÁCH HÀNG()
GO
CREATE PROC SP_TAOTKKH_NV
	@SODT VARCHAR(100),
	@HOTEN NVARCHAR(50),
	@PHAI NVARCHAR(5),
	@NGAYSINH DATE,
	@DIACHI NVARCHAR(250)
AS
BEGIN TRAN
	BEGIN TRY
		IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT)
			OR EXISTS(SELECT 1 FROM QTV WHERE MAQTV = @SODT)
			OR EXISTS(SELECT 1 FROM NHANVIEN WHERE MANV = @SODT)
			OR EXISTS(SELECT 1 FROM NHASI WHERE MANS = @SODT)
		BEGIN
			RAISERROR(N'Tài khoản đã tồn tại trong hệ thống', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		ELSE
		BEGIN
			DECLARE @MATKHAU VARCHAR(100);
			SET @MATKHAU = FORMAT(@NGAYSINH, 'ddMMyyyy');
			INSERT INTO KHACHHANG(SODT, HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU) 
			VALUES(@SODT, @HOTEN, @PHAI, @NGAYSINH, @DIACHI, @MATKHAU)
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
---------------------------
--NV03/ TẠO HÓA ĐƠN
GO
CREATE PROC SP_TAOHOADON_NV
	@SODT VARCHAR(100),
	@SOTT INT,
	@MANV VARCHAR(100)
AS
BEGIN TRAN
	BEGIN TRY
		IF EXISTS(SELECT 1 FROM HOSOBENH WHERE SODT = @SODT AND SOTT = @SODT)
		BEGIN
			RAISERROR(N'Hồ sơ bệnh không tồn tại', 16, 1);
			ROLLBACK TRAN
			RETURN
		END

		IF EXISTS(SELECT 1 FROM HOSOBENH WHERE SODT = @SODT AND SOTT = @SODT AND _DAXUATHOADON = 1)
		BEGIN
			RAISERROR(N'Hồ sơ bệnh đã được xuất hóa đơn', 16, 1);
			ROLLBACK TRAN
			RETURN
		END

		IF NOT EXISTS(SELECT 1 FROM CHITIETDV WHERE SODT = @SODT AND SOTT = @SOTT)
		BEGIN
			RAISERROR(N'Hồ sơ bệnh chưa được thêm dịch vụ vào', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		ELSE

		BEGIN
			DECLARE @TONGCHIPHI FLOAT;
			DECLARE @TIENDV FLOAT
			DECLARE @TIENTHUOC FLOAT;

			SELECT @TIENTHUOC = ISNULL(SUM(DONGIALUCTHEM * SOLUONG), 0)
			FROM CHITIETTHUOC CTT
			WHERE CTT.SODT = @SODT AND CTT.SOTT = @SOTT;

			SELECT @TIENDV = ISNULL(SUM(DONGIALUCTHEM * SOLUONG), 0)
			FROM CHITIETDV CTDV
			WHERE CTDV.SODT = @SODT AND CTDV.SOTT = @SOTT;
			
			SET @TONGCHIPHI = @TIENTHUOC + @TIENDV

			INSERT INTO HOADON(SODT, SOTT, NGAYXUAT, TONGCHIPHI, _DATHANHTOAN, MANV)
			VALUES(@SODT, @SOTT, GETDATE(), @TONGCHIPHI, 0, @MANV)

			UPDATE HOSOBENH 
			SET _DAXUATHOADON = 1
			WHERE SOTT = @SOTT AND SODT = @SODT

			SELECT KH.HOTEN HOTENKH, HD.SODT SODT, HD.SOTT SOTTHD, NGAYXUAT, TONGCHIPHI, NV.MANV MANV, NV.HOTEN HOTENNV, _DATHANHTOAN DATHANHTOAN, CTDV.MADV, TENDV, CTDV.SOLUONG SLDV, CTDV.DONGIALUCTHEM DONGIADV, CTT.MATHUOC, TENTHUOC, CTT.SOLUONG SLTHUOC, DONVITINH, CTT.DONGIALUCTHEM DONGIATHUOC
			FROM HOADON HD
			JOIN KHACHHANG KH ON HD.SODT = KH.SODT
			JOIN NHANVIEN NV ON NV.MANV = HD.MANV
			JOIN CHITIETDV CTDV ON CTDV.SODT = HD.SODT AND CTDV.SOTT = HD.SOTT
			JOIN LOAIDICHVU LDV ON LDV.MADV = CTDV.MADV
			LEFT JOIN CHITIETTHUOC CTT ON CTT.SODT = HD.SODT AND CTT.SOTT = HD.SOTT
			LEFT JOIN LOAITHUOC	LT ON LT.MATHUOC = CTT.MATHUOC
			WHERE HD.SOTT = @SOTT AND HD.SODT = @SODT
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
---------------
--NV04/ XÁC NHẬN THANH TOÁN HÓA ĐƠN
GO
CREATE PROC SP_THANHTOANHOADON_NV
	@SODT VARCHAR(100),
	@SOTT INT
AS
BEGIN TRAN
	BEGIN TRY
		IF (NOT EXISTS(SELECT * FROM HOADON WHERE SODT = @SODT AND SOTT = @SOTT))
		BEGIN
			RAISERROR(N'Hoá đơn này không tồn tại', 16, 1);
			ROLLBACK TRAN
			RETURN
		END

		IF (EXISTS(SELECT * FROM HOADON WHERE SODT = @SODT AND SOTT = @SOTT AND _DATHANHTOAN = 1))
		BEGIN
			RAISERROR(N'Hoá đơn này đã được thanh toán', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		
		ELSE
		BEGIN
			UPDATE HOADON
			SET	_DATHANHTOAN = 1
			WHERE SODT = @SODT AND SOTT = @SOTT
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN

-------------------------------------------
--NV05/ TRUY VẤN HÓA ĐƠN
GO
CREATE PROC SP_GETHOADON1KH_NV
	@SODT VARCHAR(100)
AS
BEGIN TRAN
	BEGIN TRY
		IF (NOT EXISTS(SELECT * FROM KHACHHANG WHERE SODT = @SODT))
		BEGIN
			RAISERROR(N'Tài khoản này không tồn tại', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		
		IF (NOT EXISTS(SELECT * FROM HOADON WHERE SODT = @SODT))
		BEGIN
			RAISERROR(N'Tài khoản không có hóa đơn nào', 16, 1);
			ROLLBACK TRAN
			RETURN
		END

		ELSE
		BEGIN
			SELECT KH.HOTEN HOTENKH, HD.SODT SODT, HD.SOTT SOTTHD, NGAYXUAT, _DATHANHTOAN DATHANHTOAN, TONGCHIPHI, NV.HOTEN HOTENNV, LDV.MADV MADV,TENDV, CTDV.SOLUONG SLDV, CTDV.DONGIALUCTHEM DONGIADV, CTT.MATHUOC,TENTHUOC, CTT.SOLUONG SLTHUOC, DONVITINH, CTT.DONGIALUCTHEM DONGIATHUOC
			FROM HOADON HD
			JOIN KHACHHANG KH ON HD.SODT = KH.SODT
			JOIN NHANVIEN NV ON NV.MANV = HD.MANV
			JOIN CHITIETDV CTDV ON CTDV.SODT = HD.SODT AND CTDV.SOTT = HD.SOTT
			JOIN LOAIDICHVU LDV ON LDV.MADV = CTDV.MADV
			LEFT JOIN CHITIETTHUOC CTT ON CTT.SODT = HD.SODT AND CTT.SOTT = HD.SOTT
			LEFT JOIN LOAITHUOC	LT ON LT.MATHUOC = CTT.MATHUOC
			WHERE HD.SODT = @SODT
			ORDER BY HD.SOTT
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
---------------------------------
---NV06/ Đổi mật khẩu tài khoản nhân viên
GO
CREATE PROC SP_DOIMK_NV
	@MANV VARCHAR(100),
	@MATKHAUCU VARCHAR(100),
	@MATKHAUMOI VARCHAR(100)
AS
BEGIN TRAN
	BEGIN TRY
		-- Kiểm tra tồn tại tài khoản
		IF (NOT EXISTS(SELECT * FROM NHANVIEN WHERE MANV = @MANV))
		BEGIN
			RAISERROR(N'Không tồn tại nhân viên này', 16, 1);
			ROLLBACK TRAN
			RETURN
		END

		IF NOT EXISTS(SELECT 1 FROM NHANVIEN WHERE MANV = @MANV AND MATKHAU = @MATKHAUCU)
		BEGIN 
			RAISERROR(N'Xác nhận mật khẩu sai', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		ELSE
		BEGIN
			UPDATE NHANVIEN
			SET	MATKHAU = @MATKHAUMOI
			WHERE MANV = @MANV
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
GO

--QTV01/ THÊM LOẠI THUỐC MỚI
CREATE PROCEDURE SP_THEMLOAITHUOC_QTV
    @TENTHUOC NVARCHAR(100),
    @DONVITINH NVARCHAR(50),
    @CHIDINH NVARCHAR(500),
    @SLNHAP INT,
    @NGAYHETHAN DATE,
    @DONGIA FLOAT
AS
BEGIN TRAN
BEGIN TRY 
BEGIN
    IF @SLNHAP < 1 OR @DONGIA < 1
    BEGIN
        RAISERROR(N'Số lượng nhập và đơn giá không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    DECLARE @NewMATHUOC VARCHAR(10);

    SELECT @NewMATHUOC = COALESCE(MAX(MATHUOC), 'MT01')
    FROM LOAITHUOC;
    SET @NewMATHUOC = 'MT' + RIGHT('00' + CAST(CAST(RIGHT(@NewMATHUOC, 2) AS INT) + 1 AS VARCHAR(2)), 2);
    INSERT INTO LOAITHUOC
        (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA)
    VALUES
        (@NewMATHUOC, @TENTHUOC, @DONVITINH, @CHIDINH, @SLNHAP, @SLNHAP, 0, @NGAYHETHAN, @DONGIA);
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO

-- QTV02/ HỦY LOẠI THUỐC
CREATE PROCEDURE SP_HUYTHUOC_QTV
    @MATHUOC VARCHAR(10)
AS
BEGIN TRAN
BEGIN TRY 
BEGIN
    DECLARE @NGAYHETHAN DATE;

    SELECT @NGAYHETHAN = NGAYHETHAN
    FROM LOAITHUOC
    WHERE MATHUOC = @MATHUOC;

    IF @NGAYHETHAN < GETDATE()
    BEGIN

        UPDATE LOAITHUOC
        SET SLDAHUY = SLDAHUY + SLTON, SLTON = 0
        WHERE MATHUOC = @MATHUOC;
    END
    ELSE
    BEGIN
        RAISERROR(N'Không thể hủy thuốc vì chưa hết hạn.',16,1);
        ROLLBACK TRAN
        RETURN
    END
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO
-- QTV03/ CẬP NHẬT THUỐC
CREATE PROCEDURE SP_CAPNHATLOAITHUOC_QTV
    @MATHUOC VARCHAR(10),
    @TENTHUOC NVARCHAR(50) = NULL,
    @CHIDINH NVARCHAR(500) = NULL,
    @DONGIA FLOAT = NULL
AS
BEGIN TRAN
BEGIN TRY 
BEGIN
    IF  @DONGIA <= 0
    BEGIN
        RAISERROR(N'Đơn giá không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    IF @TENTHUOC IS NOT NULL OR @CHIDINH IS NOT NULL OR @DONGIA IS NOT NULL
    BEGIN
        UPDATE LOAITHUOC
        SET 
            TENTHUOC = ISNULL(@TENTHUOC,TENTHUOC),
            CHIDINH = ISNULL(@CHIDINH, CHIDINH),
            DONGIA = ISNULL(@DONGIA, DONGIA)
        WHERE MATHUOC = @MATHUOC;
    END
    ELSE
    BEGIN
        RAISERROR(N'Không có thông tin mới để cập nhật.',16,1);
    END
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO

-- QTV04/ NHẬP THUỐC
CREATE PROCEDURE SP_NHAPTHEMTHUOC_QTV
    @MATHUOC VARCHAR(10),
    @SOLUONGNHAP INT,
    @NGAYHETHAN DATE
AS
BEGIN TRAN
BEGIN TRY 
BEGIN
    SET NOCOUNT ON;
    IF @SOLUONGNHAP < 1
    BEGIN
        RAISERROR(N'Số lượng nhập không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END


    DECLARE @SLTON_OLD INT, @SLTON_NEW INT, @SLNHAP_OLD INT, @SLNHAP_NEW INT, @NGAYHETHAN_OLD DATE;

    SELECT @SLTON_OLD = ISNULL(SLTON, 0), @NGAYHETHAN_OLD = NGAYHETHAN, @SLNHAP_OLD = SLNHAP
    FROM LOAITHUOC
    WHERE MATHUOC = @MATHUOC;


    IF @SLTON_OLD = 0
    BEGIN
        SET @SLTON_NEW = @SOLUONGNHAP;
        SET @SLNHAP_NEW = @SLNHAP_OLD + @SOLUONGNHAP;

        UPDATE LOAITHUOC
        SET SLTON = @SLTON_NEW, SLNHAP = @SLNHAP_NEW, NGAYHETHAN = @NGAYHETHAN
        WHERE MATHUOC = @MATHUOC;

    END
    ELSE IF @NGAYHETHAN_OLD <= GETDATE() 
    BEGIN
        SET @SLTON_NEW = @SOLUONGNHAP;
        SET @SLNHAP_NEW = @SLNHAP_OLD + @SOLUONGNHAP;

        UPDATE LOAITHUOC
        SET SLTON = @SLTON_NEW, SLNHAP = @SLNHAP_NEW, NGAYHETHAN = @NGAYHETHAN, SLDAHUY = SLDAHUY + @SLTON_OLD
        WHERE MATHUOC = @MATHUOC;
    END
    ELSE
    BEGIN
        RAISERROR(N'Ngày hết hạn không hợp lệ hoặc thuốc đã hết hạn.',16,1);
        ROLLBACK TRAN
        RETURN
    END
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO

-- QTV05/ THÊM DV
CREATE PROCEDURE SP_THEMDICHVU_QTV
    @TENDV NVARCHAR(100),
    @CHITIET NVARCHAR(500),
    @DONGIA FLOAT
AS
BEGIN TRAN
BEGIN TRY
BEGIN
    SET NOCOUNT ON;
    IF @DONGIA <= 0
    BEGIN
        RAISERROR(N'đơn giá không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    DECLARE @NewMADV VARCHAR(10);

    SELECT @NewMADV = COALESCE(MAX(MADV), 'DV01')
    FROM LOAIDICHVU;
    SET @NewMADV = 'DV' + RIGHT('00' + CAST(CAST(RIGHT(@NewMADV, 2) AS INT) + 1 AS VARCHAR(2)), 2);

    INSERT INTO LOAIDICHVU
        (MADV, TENDV, MOTA, DONGIA)
    VALUES
        (@NewMADV, @TENDV, @CHITIET, @DONGIA);
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO

-- QTV06/ CẬP NHẬT DV
CREATE PROCEDURE SP_CAPNHATDICHVU_QTV
    @MADV VARCHAR(10),
    @TENDV NVARCHAR(100) = NULL,
    @CHITIET NVARCHAR(500) = NULL,
    @DONGIA INT = NULL
AS
BEGIN TRAN
BEGIN TRY
BEGIN
    IF @DONGIA <= 0
    BEGIN
        RAISERROR(N'đơn giá không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
    IF @TENDV IS NOT NULL OR @CHITIET IS NOT NULL OR @DONGIA IS NOT NULL
    BEGIN
        UPDATE LOAIDICHVU
        SET TENDV = ISNULL(@TENDV, TENDV),
            MOTA = ISNULL(@CHITIET, MOTA),
            DONGIA = ISNULL(@DONGIA, DONGIA)
        WHERE MADV = @MADV;
    END
    ELSE
    BEGIN
        RAISERROR(N'Không có thông tin nào được cập nhật.',16,1);
    END
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO
-- QTV07/ XEM DS NHÂN VIÊN
CREATE PROCEDURE SP_XEMDANHSACHNHANVIEN
AS
BEGIN TRAN
BEGIN TRY
BEGIN
    SET NOCOUNT ON;

    SELECT MANV, HOTEN, PHAI, VITRICV, _DAKHOA
    FROM NHANVIEN;
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO


-------------------------
--QTV08/ TẠO NHÂN VIÊN MỚI
GO
CREATE PROC SP_CREATENV_QTV
    @HOTEN NVARCHAR(50),
    @PHAI NVARCHAR(100),
    @VITRICV NVARCHAR(200)
AS
BEGIN TRAN
    BEGIN TRY
        DECLARE @MANV NVARCHAR(10);
        -- Lấy giá trị MANV lớn nhất hiện tại
		SELECT @MANV = COALESCE(MAX(MANV), 'NV0001') 
		FROM NHANVIEN
        SET @MANV = 'NV' + RIGHT('0000' + CAST(CAST(RIGHT(@MANV, 4) AS INT) + 1 AS VARCHAR(4)), 4);

        INSERT INTO NHANVIEN
            (MANV, HOTEN, PHAI, VITRICV, MATKHAU, _DAKHOA)
        VALUES(@MANV, @HOTEN, @PHAI, @VITRICV, @MANV, 0)

    END TRY
    BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN

--------------------------
--QTV09/ CẬP NHÂT THÔNG TIN NHÂN VIÊN
GO
CREATE PROC SP_UPDATENV_QTV
    @MANV VARCHAR(100),
    @VITRICV NVARCHAR(200)
AS
BEGIN TRAN
    BEGIN TRY
		IF (NOT EXISTS(SELECT *
            FROM NHANVIEN
            WHERE MANV = @MANV))
		BEGIN
            RAISERROR(N'Không tồn tại nhân viên trên', 16, 1);
            ROLLBACK TRAN
            RETURN
        END
		ELSE
		BEGIN
            UPDATE NHANVIEN
			SET VITRICV = @VITRICV
			WHERE MANV = @MANV
        END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
-------------
--QTV10/ KHÓA TÀI KHOẢN NHÂN VIÊN
GO
CREATE PROC SP_BLOCKNV_QTV
    @MANV VARCHAR(100)
AS
BEGIN TRAN
    BEGIN TRY
		IF (NOT EXISTS(SELECT *
            FROM NHANVIEN
            WHERE MANV = @MANV))
		BEGIN
            RAISERROR(N'Không tồn tại nhân viên trên', 16, 1);
            ROLLBACK TRAN
            RETURN
        END
		ELSE
		BEGIN
            UPDATE NHANVIEN
			SET _DAKHOA = 1
			WHERE MANV = @MANV
        END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
--------------------------
--QTV11/ MỞ KHÓA TK NHÂN VIÊN
GO
CREATE PROC SP_UNBLOCKNV_QTV
    @MANV VARCHAR(100)
AS
BEGIN TRAN
BEGIN TRY
		IF (NOT EXISTS(SELECT *
            FROM NHANVIEN
            WHERE MANV = @MANV))
		BEGIN
            RAISERROR(N'Không tồn tại nhân viên trên', 16, 1);
            ROLLBACK TRAN
            RETURN
        END
		ELSE
		BEGIN
            UPDATE NHANVIEN
			SET _DAKHOA = 0
			WHERE MANV = @MANV
        END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
-----------
--QTV12/ XEM DANH SÁCH NHA SĨ
GO
CREATE PROC SP_GETALLNS_QTV
AS
BEGIN TRAN
    BEGIN TRY
		SELECT MANS, HOTEN, PHAI, GIOITHIEU, _DAKHOA
        FROM NHASI
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
--------------
-----------
--QTV13/ TẠO NHA SĨ MỚI
GO
CREATE PROC SP_CREATENS_QTV
    @HOTEN NVARCHAR(50),
    @PHAI NVARCHAR(100),
    @GIOITHIEU NVARCHAR(500)
AS
BEGIN TRAN
    BEGIN TRY
        DECLARE @MANS NVARCHAR(10);
        -- Lấy giá trị MANS lớn nhất hiện tại
		SELECT @MANS = COALESCE(MAX(MANS), 'NS0001') 
		FROM NHASI
        SET @MANS = 'NS' + RIGHT('0000' + CAST(CAST(RIGHT(@MANS, 4) AS INT) + 1 AS VARCHAR(4)), 4);

        INSERT INTO NHASI
            (MANS, HOTEN, PHAI, GIOITHIEU, MATKHAU, _DAKHOA)
        VALUES(@MANS, @HOTEN, @PHAI, @GIOITHIEU, @MANS, 0)

	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN


--QTV14/ CẬP NHẬT THÔNG TIN NHA SĨ
GO
CREATE PROC SP_UPDATENS_QTV
    @MANS VARCHAR(100),
    @GIOITHIEU NVARCHAR(200)
AS
BEGIN TRAN
    BEGIN TRY
		IF (NOT EXISTS(SELECT *
            FROM NHASI
            WHERE MANS = @MANS))
		BEGIN
            RAISERROR(N'Không tồn tại nha sĩ trên', 16, 1);
            ROLLBACK TRAN
            RETURN
        END
		ELSE
		BEGIN
            UPDATE NHASI
			SET GIOITHIEU = @GIOITHIEU
			WHERE MANS = @MANS
        END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN


--QTV15/ Khóa tài khoản nha sĩ
GO
CREATE PROC SP_KHOA_TAI_KHOAN_NHA_SI
    @MA_NS VARCHAR(10)
AS

BEGIN TRAN
BEGIN TRY
        IF EXISTS (SELECT 1
                    FROM NHASI
                    WHERE MANS = @MA_NS)
        BEGIN
            UPDATE NHASI
            SET _DAKHOA = 1
            WHERE MANS = @MA_NS
        END
        ELSE
        BEGIN
            RAISERROR(N'Không tồn tại mã nha sĩ này', 16, 1)
            ROLLBACK TRAN
            RETURN
        END
    END TRY

    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
    END CATCH
COMMIT TRAN





--QTV16. Mở tài khoản nha sĩ
GO
CREATE PROC SP_MO_TAI_KHOAN_NHA_SI
    @MA_NS VARCHAR(10)
AS

BEGIN TRAN
    BEGIN TRY
        IF EXISTS (SELECT 1
                    FROM NHASI
                    WHERE MANS = @MA_NS)
        BEGIN
            UPDATE NHASI
            SET _DAKHOA = 0
            WHERE MANS = @MA_NS
        END
        ELSE
        BEGIN
            RAISERROR(N'Không tồn tại mã nha sĩ này', 16, 1)
            ROLLBACK TRAN
            RETURN
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
    END CATCH
COMMIT TRAN

--QTV17/ Xem danh sách QTV
-- XEM HET TAT CA CAC THUOC TINH CUA QTV TRU MAT KHAU

GO
CREATE PROC SP_XEM_DANH_SACH_QTV
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS (SELECT 1
                    FROM QTV)
        BEGIN
            SELECT QTV.MAQTV, QTV.HOTEN, QTV.PHAI
            FROM QTV
        END
        ELSE
        BEGIN
            RAISERROR(N'Không tồn tại quản trị viên nào', 16, 1)
            ROLLBACK TRAN
            RETURN
        END
    END TRY

    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
    END CATCH
COMMIT TRAN


--QTV18/ Tạo Quản trị viên mới
GO
CREATE PROC SP_TAO_QTV_MOI
    @HOTEN VARCHAR(50),
    @PHAI NVARCHAR(5)
AS
BEGIN TRAN
    BEGIN TRY
        DECLARE @MAQTV NVARCHAR(10);
        -- Lấy giá trị MAQTV lớn nhất hiện tại
		SELECT @MAQTV = COALESCE(MAX(MAQTV), 'QTV0001') 
		FROM QTV
        SET @MAQTV = 'QTV' + RIGHT('0000' + CAST(CAST(RIGHT(@MAQTV, 4) AS INT) + 1 AS VARCHAR(4)), 4);

        INSERT INTO QTV (MAQTV, HOTEN, PHAI, MATKHAU)
        VALUES(@MAQTV, @HOTEN, @PHAI, @MAQTV)
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
    END CATCH
COMMIT TRAN


--QTV19. Xem danh sách khách hàng 
GO
CREATE PROC SP_XEM_DANH_SACH_KHACH_HANG

AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS (SELECT 1
                    FROM KHACHHANG)
        BEGIN
            SELECT KH.SODT, KH.HOTEN, KH.PHAI, KH.NGAYSINH, KH.DIACHI, KH._DAKHOA
            FROM KHACHHANG KH
        END
        ELSE
        BEGIN
            RAISERROR(N'Không tìm thấy danh sách khách hàng nào', 16, 1)
            ROLLBACK TRAN
            RETURN
        END
    END TRY

    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
    END CATCH
COMMIT TRAN

--QTV20. Khóa Tài khoản khách hàng
GO
CREATE PROC SP_KHOA_TAI_KHOAN_KHACH_HANG
    @SODT VARCHAR(20)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS (SELECT 1
                    FROM KHACHHANG
                    WHERE SODT = @SODT)
        BEGIN
            UPDATE KHACHHANG
            SET _DAKHOA = 1
            WHERE SODT = @SODT
        END
        ELSE
        BEGIN
            RAISERROR(N'Không tìm thấy khách hàng nào', 16, 1)
            ROLLBACK TRAN
            RETURN
        END
    END TRY

    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
    END CATCH
COMMIT TRAN


--QTV21. Mở tài khoản khách hàng
GO
CREATE PROC SP_MO_TAI_KHOAN_KHACH_HANG
    @SODT VARCHAR(20)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS (SELECT 1
                    FROM KHACHHANG
                    WHERE SODT = @SODT)
        BEGIN
            UPDATE KHACHHANG
            SET _DAKHOA = 0
            WHERE SODT = @SODT
        END
        ELSE
        BEGIN
            RAISERROR(N'Không thể mở tài khoản khách hàng này', 16, 1)
            ROLLBACK TRAN
            RETURN
        END
    END TRY

    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
    END CATCH
COMMIT TRAN
---------------------------------
--QTV22/Đổi mật khẩu tài khoản QTV
GO
CREATE PROC SP_DOIMK_QTV
	@MAQTV VARCHAR(100),
	@MATKHAUCU VARCHAR(100),
	@MATKHAUMOI VARCHAR(100)
AS
BEGIN TRAN
	BEGIN TRY
		-- Kiểm tra tồn tại tài khoản
		IF (NOT EXISTS(SELECT * FROM QTV WHERE MAQTV = @MAQTV))
		BEGIN
			RAISERROR(N'Không tồn tại quản trị viên này', 16, 1);
			ROLLBACK TRAN
			RETURN
		END

		IF NOT EXISTS(SELECT 1 FROM QTV WHERE MAQTV = @MAQTV AND MATKHAU = @MATKHAUCU)
		BEGIN 
			RAISERROR(N'Xác nhận mật khẩu sai', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		ELSE
		BEGIN
			UPDATE QTV
			SET	MATKHAU = @MATKHAUMOI
			WHERE MAQTV = @MAQTV
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
GO
-- NS01/ XEM CÁC CA ĐỦ 2 NG TRỰC TRỪ CA MÌNH ĐÃ ĐẶT (TỪ NGÀY HIỆN TẠI ĐẾN 30 NGÀY SAU)
CREATE PROCEDURE SP_XEMCADU2NGTRUC_NS
    @MANS VARCHAR(10)
AS
BEGIN TRAN
BEGIN TRY
BEGIN
    SET NOCOUNT ON;

    SELECT LR.MACA MACA, LR.NGAY NGAY, GIOBATDAU, GIOKETTHUC
	FROM LICHRANH LR
	JOIN CA ON CA.MACA = LR.MACA
	WHERE  LR.MANS != @MANS AND LR.NGAY BETWEEN GETDATE() AND DATEADD(DAY, 30, GETDATE()) 
	GROUP BY LR.NGAY, LR.MACA, CA.GIOBATDAU, CA.GIOKETTHUC 
	HAVING COUNT(DISTINCT LR.MANS) = 2
END
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO
-- NS02/ TRUY VẤN CÁC LỊCH HẸN CỦA MÌNH (TỪ NGÀY HIỆN TẠI ĐẾN 30 NGÀY SAU)
CREATE PROCEDURE SP_XEMLICHHENNS_NS
    @MANS VARCHAR(10)
AS
BEGIN TRAN
BEGIN TRY
BEGIN
    SET NOCOUNT ON;

    SELECT
        LH.SOTT,
        LR.MACA,
        LR.NGAY,
        C.GIOBATDAU,
        C.GIOKETTHUC,
        KH.SODT AS SDT_KHACH,
        KH.HOTEN AS TEN_KHACH,
        LH.LYDOKHAM
    FROM
        LICHHEN LH
        JOIN
        LICHRANH LR ON LH.MANS = LR.MANS AND LH.SOTT = LR.SOTT
        JOIN
        CA C ON LR.MACA = C.MACA
        JOIN
        KHACHHANG KH ON LH.SODT = KH.SODT
    WHERE 
        LH.MANS = @MANS
        AND LR.NGAY BETWEEN GETDATE() AND DATEADD(DAY, 30, GETDATE());
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO
-- NS03/ TRUY VẤN CÁC LỊCH RẢNH CỦA MÌNH MÀ CHƯA ĐƯỢC ĐẶT LỊCH (TỪ NGÀY HIỆN TẠI ĐẾN 30 NGÀY SAU)
CREATE PROCEDURE SP_LICHRANHCHUADUOCDAT_NS
    @MANS VARCHAR(10)
AS
BEGIN TRAN 
BEGIN TRY 
BEGIN
    SET NOCOUNT ON;

    SELECT
        LR.MANS,
        LR.SOTT,
        LR.MACA,
        LR.NGAY,
        C.GIOBATDAU,
        C.GIOKETTHUC
    FROM
        LICHRANH LR
        JOIN
        CA C ON LR.MACA = C.MACA
    WHERE 
        LR.MANS = @MANS
        AND NOT EXISTS (
            SELECT 1
        FROM LICHHEN LHEN
        WHERE LHEN.MANS = LR.MANS AND LHEN.SOTT = LR.SOTT
        )
        AND LR.NGAY BETWEEN GETDATE() AND DATEADD(DAY, 30, GETDATE());
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO
GO
-- NS04/ ĐĂNG KÝ LỊCH RẢNH
CREATE PROCEDURE SP_DANGKYLR_NS
    @MANS VARCHAR(10),
    @MACA VARCHAR(10),
    @NGAY DATE
AS
BEGIN TRAN
BEGIN TRY 
    SET NOCOUNT ON;
    IF @NGAY IS NULL
    BEGIN
        ROLLBACK TRAN
        RAISERROR(N'Ngày đăng ký không thể null.',16,1);
        RETURN
    END
	IF (@NGAY < GETDATE())
	BEGIN
		ROLLBACK TRAN
        RAISERROR(N'Ngày đăng ký không thể nhỏ hơn ngày hiện tại.',16,1);
        RETURN
	END
	-- Mỗi ca trong ngày chỉ được tối đa 2 nha sĩ được đăng ký. 
	IF(EXISTS(SELECT MACA, NGAY
			  FROM LICHRANH
		      WHERE NGAY = @NGAY AND MACA = @MACA
			  GROUP BY MACA, NGAY
			  HAVING COUNT(MANS) > 1))
	BEGIN
        ROLLBACK TRAN
        RAISERROR(N'Lỗi: ca đã đủ 2 người đăng ký.',16,1);
        RETURN
    END

	ELSE
	BEGIN
		DECLARE @NextSOTT INT;
		SELECT @NextSOTT = ISNULL(MAX(SOTT), 0) + 1
		FROM LICHRANH
		WHERE MANS = @MANS;

		INSERT INTO LICHRANH(MANS, MACA, NGAY, SOTT)
		VALUES(@MANS, @MACA, @NGAY, @NextSOTT);
	END
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO

-- NS05/ HỦY LỊCH RẢNH
CREATE PROCEDURE SP_HUYLR_NS
    @MANS VARCHAR(10),
    @SOTT INT
AS
BEGIN TRAN
BEGIN TRY
BEGIN
    SET NOCOUNT ON;
    IF NOT EXISTS (
        SELECT MANS, SOTT
        FROM LICHHEN
        WHERE MANS = @MANS AND SOTT = @SOTT
    )
    BEGIN
        DELETE FROM LICHRANH
        WHERE MANS = @MANS
            AND SOTT = @SOTT;
    END
    ELSE
    BEGIN
        ROLLBACK TRAN
        RAISERROR('Lịch rảnh đã được hẹn, không thể hủy.',16,1);
        RETURN
    END
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO

-- NS07/ TẠO BỆNH ÁN MỚI
CREATE PROCEDURE SP_TAOBENHAN_NS
    @SoDienThoai VARCHAR(10),
    @NgayKham DATE,
    @MaNS VARCHAR(10),
    @DanDo NVARCHAR(500)
AS
BEGIN TRAN      
BEGIN TRY
BEGIN
    IF @NgayKham IS NULL
    BEGIN
        ROLLBACK TRAN
        RAISERROR(N'Ngày không thể null.',16,1);
        RETURN
    END
    DECLARE @Sott INT;
    SELECT @Sott = ISNULL(MAX(SOTT), 0) + 1
    FROM HOSOBENH
    WHERE SODT = @SoDienThoai;
    INSERT INTO HOSOBENH
        (SODT, SOTT, NGAYKHAM, MANS, DANDO)
    VALUES
        (@SoDienThoai, @Sott, @NgayKham, @MaNS, @DanDo);

END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO
-- NS08/ THÊM CTDV VÀO BỆNH ÁN
CREATE PROCEDURE SP_THEMCTDV_NS
    @MaDV VARCHAR(10),
    @SOTT INT,
    @SoDienThoai VARCHAR(10),
    @SoLuongDV INT

AS
BEGIN TRAN 
BEGIN TRY
BEGIN
     IF @SoLuongDV IS NULL
    BEGIN
        ROLLBACK TRAN
        RAISERROR(N'Số lượng dịch vụ không thể null.',16,1);
        RETURN
    END

	IF (NOT EXISTS(SELECT * 
				   FROM HOSOBENH 
				   WHERE SOTT = @SOTT AND SODT = @SoDienThoai))
	BEGIN
        ROLLBACK TRAN
        RAISERROR(N'Không tồn tại hồ sơ bệnh.',16,1);
        RETURN
    END

	IF(NOT EXISTS(SELECT * FROM LOAIDICHVU WHERE MADV = @MaDV))
    BEGIN
        RAISERROR(N'Dịch vụ này không tồn tại',16,1)
        ROLLBACK TRAN
        RETURN
    END

	IF(EXISTS(SELECT SODT, SOTT, _DAXUATHOADON FROM HOSOBENH WHERE SODT = @SoDienThoai AND SOTT = @SOTT AND _DAXUATHOADON = 1))
    BEGIN
        RAISERROR(N'Lỗi: đã xuất hóa đơn, không thể thêm đơn thuốc được',16,1)
        ROLLBACK TRAN
        RETURN
    END

    DECLARE @DONGIALUCTHEM FLOAT
    SELECT @DONGIALUCTHEM = DONGIA FROM LOAIDICHVU WHERE MADV = @MaDV

    INSERT INTO CHITIETDV
        (MADV, SOTT, SODT, SOLUONG, DONGIALUCTHEM)
    VALUES
        (@MaDV, @SOTT, @SoDienThoai, @SoLuongDV, @DONGIALUCTHEM);

END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO
-- NS09/ THÊM CTTHUOC VÀO BỆNH ÁN
CREATE PROCEDURE SP_THEMCTTHUOC_NS
    @MATHUOC VARCHAR(10),
    @SOTT INT,
    @SODT VARCHAR(10),
    @SOLUONG INT,
    @THOIDIEMDUNG NVARCHAR(200)
AS
BEGIN TRAN
BEGIN TRY
BEGIN
    IF @SOLUONG IS NULL OR @THOIDIEMDUNG IS NULL
    BEGIN
        ROLLBACK TRAN
        RAISERROR(N'Số lượng và thời điểm dùng không thể null.',16,1);
        RETURN
    END

	IF (NOT EXISTS(SELECT * 
				   FROM HOSOBENH 
				   WHERE SOTT = @SOTT AND SODT = @SODT))
	BEGIN
        ROLLBACK TRAN
        RAISERROR(N'Không tồn tại hồ sơ bệnh.',16,1);
        RETURN
    END

	IF(NOT EXISTS(SELECT * FROM LOAITHUOC WHERE MATHUOC = @MATHUOC))
    BEGIN
        RAISERROR(N'Thuốc này không tồn tại trong kho',16,1)
        ROLLBACK TRAN
        RETURN
    END

	IF(EXISTS(SELECT SODT, SOTT, _DAXUATHOADON FROM HOSOBENH WHERE SODT = @SODT AND SOTT = @SOTT AND _DAXUATHOADON = 1))
    BEGIN
        RAISERROR(N'Lỗi: đã xuất hóa đơn, không thể thêm đơn thuốc được',16,1)
        ROLLBACK TRAN
        RETURN
    END

    ELSE 
        DECLARE @SLTON INT
        SELECT @SLTON = SLTON FROM LOAITHUOC WHERE MATHUOC = @MATHUOC
        
        DECLARE @DONGIALUCTHEM FLOAT
        SELECT @DONGIALUCTHEM = DONGIA FROM LOAITHUOC WHERE MATHUOC = @MATHUOC
		
        IF(EXISTS(SELECT *
                  FROM LOAITHUOC LT
                  WHERE LT.MATHUOC = @MATHUOC AND @SOLUONG <= @SLTON AND LT.NGAYHETHAN > GETDATE()))
        BEGIN
            INSERT INTO CHITIETTHUOC(MATHUOC,SOTT,SODT,SOLUONG,THOIDIEMDUNG, DONGIALUCTHEM)
		    VALUES(@MATHUOC, @SOTT, @SODT, @SOLUONG, @THOIDIEMDUNG, @DONGIALUCTHEM);
		    UPDATE LOAITHUOC SET SLTON = @SLTON - @SOLUONG WHERE MATHUOC = @MATHUOC;
        END
        ELSE
        BEGIN
            RAISERROR(N'Lỗi: không đủ số lượng thuốc tồn kho để bán',16,1)
            ROLLBACK TRAN
            RETURN
        END
END;
END TRY 
BEGIN CATCH 
        ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1
		RETURN
END CATCH
COMMIT TRAN
GO
---------------------------------
--NS11/ Đổi mật khẩu tài khoản nha sĩ
GO
CREATE PROC SP_DOIMK_NS
	@MANS VARCHAR(100),
	@MATKHAUCU VARCHAR(100),
	@MATKHAUMOI VARCHAR(100)
AS
BEGIN TRAN
	BEGIN TRY
		-- Kiểm tra tồn tại tài khoản
		IF (NOT EXISTS(SELECT * FROM NHASI WHERE MANS = @MANS))
		BEGIN
			RAISERROR(N'Không tồn tại nha sĩ này', 16, 1);
			ROLLBACK TRAN
			RETURN
		END

		IF NOT EXISTS(SELECT 1 FROM NHASI WHERE MANS = @MANS AND MATKHAU = @MATKHAUCU)
		BEGIN 
			RAISERROR(N'Xác nhận mật khẩu sai', 16, 1);
			ROLLBACK TRAN
			RETURN
		END
		ELSE
		BEGIN
			UPDATE NHASI
			SET	MATKHAU = @MATKHAUMOI
			WHERE MANS = @MANS
		END
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
		DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
		THROW 51000, @errorMessage, 1;
		RETURN
	END CATCH
COMMIT TRAN
GO

-----------------------------------------------------------------------------------------------------------------

-- 2. PHÂN QUYỀN-------------------------------------------------------------------------------------------------
USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'loginKH')
BEGIN
    CREATE LOGIN loginKH WITH PASSWORD = 'password123@';
END

IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'loginKHOnline')
BEGIN
    CREATE LOGIN loginKHOnline WITH PASSWORD = 'password123@';
END

IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'loginNS')
BEGIN
    CREATE LOGIN loginNS WITH PASSWORD = 'password123@';
END

IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'loginNV')
BEGIN
    CREATE LOGIN loginNV WITH PASSWORD = 'password123@';
END

IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'loginQTV')
BEGIN
    CREATE LOGIN loginQTV WITH PASSWORD = 'password123@';
END

IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'loginServer')
BEGIN
    CREATE LOGIN loginServer WITH PASSWORD = 'password123@';
END


USE PKNHAKHOA;
GO

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'userKH')
BEGIN
    CREATE USER userKH FOR LOGIN loginKH;
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'userKHOnline')
BEGIN
    CREATE USER userKHOnline FOR LOGIN loginKHOnline;
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'userNS')
BEGIN
    CREATE USER userNS FOR LOGIN loginNS;
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'userNV')
BEGIN
    CREATE USER userNV FOR LOGIN loginNV;
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'userQTV')
BEGIN
    CREATE USER userQTV FOR LOGIN loginQTV;
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'userServer')
BEGIN
    CREATE USER userServer FOR LOGIN loginServer;
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'QTV')
BEGIN
    EXEC SP_ADDROLE 'QTV';
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'KHACHHANG')
BEGIN
    EXEC SP_ADDROLE 'KHACHHANG';
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'KHACHHANGONLINE')
BEGIN
    EXEC SP_ADDROLE 'KHACHHANGONLINE';
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'NHANVIEN')
BEGIN
    EXEC SP_ADDROLE 'NHANVIEN';
END

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'NHASI')
BEGIN
    EXEC SP_ADDROLE 'NHASI';
END

EXEC sp_addrolemember 'QTV', 'userQTV'
EXEC sp_addrolemember 'KHACHHANG', 'userKH'
EXEC sp_addrolemember 'KHACHHANGONLINE', 'userKHOnline'
EXEC sp_addrolemember 'NHANVIEN', 'userNV'
EXEC sp_addrolemember 'NHASI', 'userNS'
EXEC sp_addrolemember db_datareader, 'userServer'

USE PKNHAKHOA
GO

--I/ Phân quyền cho role NHANVIEN

--1/ XEM LỊCH TRỰC TỪ NGÀY HIỆN TẠI ĐẾN 7 NGÀY KẾ
GRANT EXECUTE ON SP_GETLICHRANHNS_NV TO NHANVIEN;

--2/ TẠO TÀI KHOẢN KHÁCH HÀNG
GRANT EXECUTE ON SP_TAOTKKH_NV TO NHANVIEN;

--3/ TẠO HÓA ĐƠN
GRANT EXECUTE ON SP_TAOHOADON_NV TO NHANVIEN;

--4/ XÁC NHẬN THANH TOÁN HÓA ĐƠN
GRANT EXECUTE ON SP_THANHTOANHOADON_NV TO NHANVIEN;

--5/ TRUY VẤN HÓA ĐƠN
GRANT EXECUTE ON SP_GETHOADON1KH_NV TO NHANVIEN;

--6/ ĐỔI MẬT KHẨU
GRANT EXECUTE ON SP_DOIMK_NV TO NHANVIEN;

--7/ XEM DANH MỤC THUỐC
GRANT EXECUTE ON SP_GETALLTHUOC_NV_QTV_NS TO NHANVIEN;

--8/ XEM DANH MỤC DỊCH VỤ
GRANT EXECUTE ON SP_XEMDANHSACHDICHVU_ALL TO NHANVIEN;

--9/ TRUY VẤN HỒ SƠ KHÁM BỆNH
GRANT EXECUTE ON SP_GETHSB1KH_NV_NS_KH TO NHANVIEN;

--10/ TẠO LỊCH HẸN
GRANT EXECUTE ON SP_DATLICHHEN_NV_KH TO NHANVIEN;

--11/ HỦY LỊCH HẸN
GRANT EXECUTE ON SP_DELETELICHHEN_NV_KH TO NHANVIEN;

--12/ XEM DANH SÁCH TẤT CẢ NHA SĨ CHƯA BỊ KHÓA TÀI KHOẢN
GRANT EXECUTE ON SP_XEMDANHSACHNHASI_ALL TO NHANVIEN;

--13/ XEM THÔNG TIN TOÀN BỘ BẢNG CA
GRANT EXECUTE ON SP_XEMCA_ALL TO NHANVIEN;

--II/ Phân quyền cho role NHASI
--1/ XEM CÁC CA ĐỦ 2 NG TRỰC TRỪ CA MÌNH ĐÃ ĐẶT (TỪ NGÀY HIỆN TẠI ĐẾN 30 NGÀY SAU)
GRANT EXECUTE ON SP_XEMCADU2NGTRUC_NS TO NHASI;

--2/ TRUY VẤN CÁC LỊCH HẸN CỦA MÌNH (TỪ NGÀY HIỆN TẠI ĐẾN 30 NGÀY SAU)
GRANT EXECUTE ON SP_XEMLICHHENNS_NS TO NHASI;

--3/ TRUY VẤN CÁC LỊCH RẢNH CỦA MÌNH MÀ CHƯA ĐƯỢC ĐẶT LỊCH (TỪ NGÀY HIỆN TẠI ĐẾN 30 NGÀY SAU)
GRANT EXECUTE ON SP_LICHRANHCHUADUOCDAT_NS TO NHASI;

--4/ ĐĂNG KÝ LỊCH RẢNH
GRANT EXECUTE ON SP_DANGKYLR_NS TO NHASI;

--5/ HỦY LỊCH RẢNH
GRANT EXECUTE ON SP_HUYLR_NS TO NHASI;

--6/ TẠO BỆNH ÁN MỚI
GRANT EXECUTE ON SP_TAOBENHAN_NS TO NHASI;

--7/ THÊM CTDV VÀO BỆNH ÁN
GRANT EXECUTE ON SP_THEMCTDV_NS TO NHASI;

--8/ THÊM CT THUỐC VÀO BỆNH ÁN
GRANT EXECUTE ON SP_THEMCTTHUOC_NS TO NHASI;

--9/ ĐỔI MẬT KHẨU
GRANT EXECUTE ON SP_DOIMK_NS TO NHASI;

--10/ XEM DANH MỤC THUỐC
GRANT EXECUTE ON SP_GETALLTHUOC_NV_QTV_NS TO NHASI;

--11/ XEM DANH MỤC DỊCH VỤ
GRANT EXECUTE ON SP_GETALLTHUOC_NV_QTV_NS TO NHASI;

--12/ TRUY VẤN HỒ SƠ KHÁM BỆNH
GRANT EXECUTE ON SP_GETHSB1KH_NV_NS_KH TO NHASI;

--13/ XEM DANH SÁCH TẤT CẢ NHA SĨ CHƯA BỊ KHÓA TÀI KHOẢN
GRANT EXECUTE ON SP_XEMDANHSACHNHASI_ALL TO NHASI;

--14/ XEM THÔNG TIN TOÀN BỘ BẢNG CA
GRANT EXECUTE ON SP_XEMCA_ALL TO NHASI;

--15/ XEM DANH MỤC DỊCH VỤ
GRANT EXECUTE ON SP_XEMDANHSACHDICHVU_ALL TO NHASI;

--III/ Phân quyền cho role KHACHHANG
--1/ TẠO TÀI KHOẢN
GRANT EXECUTE ON SP_TAOTKKH_KH TO KHACHHANG;

--2/ XEM THÔNG TIN CÁ NHÂN CỦA KH
GRANT EXECUTE ON SP_XEMTHONGTIN_KH TO KHACHHANG;

--3/ CẬP NHẬT THÔNG TIN CÁ NHÂN KH
GRANT EXECUTE ON SP_CAPNHATTHONGTIN_KH TO KHACHHANG;

--4/ XEM LỊCH RẢNH CỦA TẤT CẢ NHA SĨ TỪ HIỆN TẠI ĐẾN 30 NGÀY SAU
GRANT EXECUTE ON SP_LRCHUADATTATCANS_KH TO KHACHHANG;

--5/ TRUY VẤN LOẠI THUỐC
GRANT EXECUTE ON SP_TRUYVANLOAITHUOC_KH TO KHACHHANG;

--6/ TRUY VẤN LOẠI DỊCH VỤ
GRANT EXECUTE ON SP_TRUYDICHVU_KH TO KHACHHANG;

--7/ TRUY VẤN LỊCH HẸN
GRANT EXECUTE ON SP_TRUYVANLICHHEN_KH TO KHACHHANG;

--8/ XEM DANH MỤC DỊCH VỤ
GRANT EXECUTE ON SP_XEMDANHSACHDICHVU_ALL TO KHACHHANG;

--9/ TRUY VẤN HỒ SƠ KHÁM BỆNH
GRANT EXECUTE ON SP_GETHSB1KH_NV_NS_KH TO KHACHHANG;

--10/ TẠO LỊCH HẸN
GRANT EXECUTE ON SP_DATLICHHEN_NV_KH TO KHACHHANG;

--11/ HỦY LỊCH HẸN
GRANT EXECUTE ON SP_DELETELICHHEN_NV_KH TO KHACHHANG;

--12/ XEM DANH SÁCH TẤT CẢ NHA SĨ CHƯA BỊ KHÓA TÀI KHOẢN
GRANT EXECUTE ON SP_XEMDANHSACHNHASI_ALL TO KHACHHANG;

--13/ XEM THÔNG TIN TOÀN BỘ BẢNG CA
GRANT EXECUTE ON SP_XEMCA_ALL TO KHACHHANG;

--IV/ Phân quyền cho role QTV
--1/ THÊM LOẠI THUỐC MỚI
GRANT EXECUTE ON SP_THEMLOAITHUOC_QTV TO QTV;

--1/ THÊM LOẠI THUỐC MỚI
GRANT EXECUTE ON SP_THEMLOAITHUOC_QTV TO QTV;

--2/ HỦY THUỐC
GRANT EXECUTE ON SP_HUYTHUOC_QTV TO QTV;

--3/ CẬP NHẬT BẢNG LOẠI THUỐC
GRANT EXECUTE ON SP_CAPNHATLOAITHUOC_QTV TO QTV;

--4/ NHẬP THÊM THUỐC VÀO THUỐC ĐÃ CÓ SẴN
GRANT EXECUTE ON SP_NHAPTHEMTHUOC_QTV TO QTV;

--5/ THÊM LOẠI DỊCH VỤ MỚI
GRANT EXECUTE ON SP_THEMDICHVU_QTV TO QTV;

--6/ CẬP NHẬT BẢNG LOẠI DỊCH VỤ
GRANT EXECUTE ON SP_CAPNHATDICHVU_QTV TO QTV;

--7/ XEM DANH SÁCH NHÂN VIÊN
GRANT EXECUTE ON SP_XEMDANHSACHNHANVIEN TO QTV;

--8/ TẠO NHÂN VIÊN MỚI
GRANT EXECUTE ON SP_CREATENV_QTV TO QTV;

--9/ CẬP NHÂT THÔNG TIN NHÂN VIÊN
GRANT EXECUTE ON SP_UPDATENV_QTV TO QTV;

--10/ KHÓA TÀI KHOẢN NHÂN VIÊN
GRANT EXECUTE ON SP_BLOCKNV_QTV TO QTV;

--11/ MỞ KHÓA TK NHÂN VIÊN
GRANT EXECUTE ON SP_UNBLOCKNV_QTV TO QTV;

--12/ XEM DANH SÁCH NHA SĨ
GRANT EXECUTE ON SP_GETALLNS_QTV TO QTV;

--13/ TẠO NHA SĨ MỚI
GRANT EXECUTE ON SP_CREATENS_QTV TO QTV;

--14/ CẬP NHẬT THÔNG TIN NHA SĨ
GRANT EXECUTE ON SP_UPDATENS_QTV TO QTV;

--15/ KHÓA TÀI KHOẢN NHA SĨ
GRANT EXECUTE ON SP_KHOA_TAI_KHOAN_NHA_SI TO QTV;

--16/ MỞ KHÓA TK NHA SĨ
GRANT EXECUTE ON SP_MO_TAI_KHOAN_NHA_SI TO QTV;

--17/ XEM DANH SÁCH QTV
GRANT EXECUTE ON SP_XEM_DANH_SACH_QTV TO QTV;

--18/ TẠO QUẢN TRỊ VIÊN MỚI
GRANT EXECUTE ON SP_TAO_QTV_MOI TO QTV;

--19/ XEM DANH SÁCH KHÁCH HÀNG
GRANT EXECUTE ON SP_XEM_DANH_SACH_KHACH_HANG TO QTV;

--20/ KHÓA TÀI KHOẢN KHÁCH HÀNG
GRANT EXECUTE ON SP_KHOA_TAI_KHOAN_KHACH_HANG TO QTV;

--21/ MỞ KHÓA TK KHÁCH HÀNG
GRANT EXECUTE ON SP_MO_TAI_KHOAN_KHACH_HANG TO QTV;

--22/ ĐỔI MẬT KHẨU QTV
GRANT EXECUTE ON SP_DOIMK_NS TO QTV;

--23/ XEM DANH MỤC THUỐC
GRANT EXECUTE ON SP_GETALLTHUOC_NV_QTV_NS TO QTV;

--24/ XEM DANH MỤC DỊCH VỤ
GRANT EXECUTE ON SP_XEMDANHSACHDICHVU_ALL TO QTV;

--25/ XEM DANH SÁCH TẤT CẢ NHA SĨ CHƯA BỊ KHÓA TÀI KHOẢN
GRANT EXECUTE ON SP_XEMDANHSACHNHASI_ALL TO QTV;

--26/ XEM THÔNG TIN TOÀN BỘ BẢNG CA
GRANT EXECUTE ON SP_XEMCA_ALL TO QTV;


--V/ Phân quyền cho role KHACHHANGONLINE

--1/ ĐĂNG NHẬP
GRANT EXECUTE ON SP_DANGNHAP_ALL TO KHACHHANGONLINE;

--2/ XEM DANH SÁCH TẤT CẢ NHA SĨ CHƯA BỊ KHÓA TÀI KHOẢN
GRANT EXECUTE ON SP_XEMDANHSACHNHASI_ALL TO KHACHHANGONLINE;

--3/ XEM DANH MỤC DỊCH VỤ
GRANT EXECUTE ON SP_XEMDANHSACHDICHVU_ALL TO KHACHHANGONLINE;

--4/ TẠO TÀI KHOẢN 
GRANT EXECUTE ON SP_TAOTKKH_KH TO KHACHHANGONLINE;

USE PKNHAKHOA
GO

--Thêm chi tiết thuốc
EXEC SP_THEMCTTHUOC_NS 'MT01', 1, '0323456789', 3, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
EXEC SP_THEMCTTHUOC_NS 'MT02', 1, '0323456789', 6, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
EXEC SP_THEMCTTHUOC_NS 'MT08', 1, '0323456789', 3, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
EXEC SP_THEMCTTHUOC_NS 'MT03', 1, '0712345678', 5, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
EXEC SP_THEMCTTHUOC_NS 'MT02', 1, '0987654321', 3, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
EXEC SP_THEMCTTHUOC_NS 'MT05', 1, '0301234567', 2, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
EXEC SP_THEMCTTHUOC_NS 'MT03', 1, '0923456780', 3, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
EXEC SP_THEMCTTHUOC_NS 'MT09', 1, '0923456780', 4, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
EXEC SP_THEMCTTHUOC_NS 'MT10', 1, '0387654321', 8, N'Buổi sáng: 1 viên thuốc sau bữa sáng.\nBuổi trưa: 1 viên thuốc sau bữa trưa.\nBuổi tối: 1 viên thuốc sau bữa tối.\n'
--Thêm chi tiết dịch vụ

EXEC SP_THEMCTDV_NS 'DV01', 1, '0323456789', 1
EXEC SP_THEMCTDV_NS 'DV05', 1, '0712345678', 2
EXEC SP_THEMCTDV_NS 'DV06', 1, '0987654321', 1
EXEC SP_THEMCTDV_NS 'DV07', 1, '0301234567', 1
EXEC SP_THEMCTDV_NS 'DV09', 1, '0743216549', 1
EXEC SP_THEMCTDV_NS 'DV02', 1, '0912345678', 1
EXEC SP_THEMCTDV_NS 'DV04', 1, '0378236541', 1
EXEC SP_THEMCTDV_NS 'DV02', 1, '0723456789', 1
EXEC SP_THEMCTDV_NS 'DV17', 1, '0923456780', 1
EXEC SP_THEMCTDV_NS 'DV21', 1, '0345678901', 1
EXEC SP_THEMCTDV_NS 'DV13', 1, '0765432109', 1
EXEC SP_THEMCTDV_NS 'DV10', 1, '0387654321', 1
EXEC SP_THEMCTDV_NS 'DV20', 1, '0387654321', 1
EXEC SP_THEMCTDV_NS 'DV06', 1, '0765432109', 1


EXEC SP_TAOHOADON_NV '0301234567', 1 , 'NV0001'
EXEC SP_TAOHOADON_NV '0323456789', 1 , 'NV0002'
EXEC SP_TAOHOADON_NV '0345678901', 1 , 'NV0003'
EXEC SP_TAOHOADON_NV '0378236541', 1 , 'NV0003'
EXEC SP_TAOHOADON_NV '0387654321', 1 , 'NV0002'
