-- 1 .Xem thông tin cá nhân khách hàng
-- 2. Sửa thông tin cá nhan KH
-- 3. Xem lịch hẹn
-- 4. Xoa lịch hẹn
-- 5. Them lịch hẹn
-- 6. Xem lịch rảnh của nha sĩ (xem trên CA)
-- 7. Xem thông tin nha sĩ
-- 8. Xem hóa đơn
-- 9. Xem hồ sơ bệnh án 
--10. Xem tên nhân viên trong hóa đơn
--11. Xem loại dịch vụ
--12. Xem chi tiết thuốc trong mỗi đơn thuốc
--13. Xem tên các loại thuốc

USE PKNHAKHOA
GO

--------------
--1/ Tạo tài khoản Khách Hàng (KH, NV)
CREATE OR ALTER PROC SP_TAOTKKH_NV_KH
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
-- 1 .Xem thông tin cá nhân khách hàng
CREATE OR ALTER PROC SP_XEMTHONGTIN_KH
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


-- 2. Sửa thông tin cá nhan KH
CREATE OR ALTER PROC SP_SUA_THONGTIN_KH
@SODT VARCHAR(10),  
@HOTEN NVARCHAR(50),
@PHAI NVARCHAR(5),  
@NGAYSINH DATE,
@DIACHI NVARCHAR(250)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT)
        BEGIN
            UPDATE KHACHHANG
            SET HOTEN = @HOTEN, PHAI = @PHAI, NGAYSINH = @NGAYSINH, DIACHI = @DIACHI
            WHERE SODT = @SODT
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




-- 3. Xem lịch hẹn KH
CREATE OR ALTER PROC SP_XEMLICHHEN_KH
@SODT VARCHAR(10)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT)
        BEGIN
            SELECT LH.SODT, LH.MANS, LH.SOTT, LH.LYDOKHAM
            FROM LICHHEN LH
            WHERE LH.SODT = @SODT
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


-- 4. Xoa lịch hẹn
CREATE OR ALTER PROC SP_XOALICHHEN_KH
@SODT VARCHAR(10),
@MANS VARCHAR(10), 
@SOTT INT
AS
BEGIN TRAN 
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM LICHHEN WHERE SODT = @SODT AND MANS = @MANS AND SOTT = @SOTT)
        BEGIN
            DELETE FROM LICHHEN
            WHERE SODT = @SODT AND MANS = @MANS AND SOTT = @SOTT
        END
        ELSE
        BEGIN
            RAISERROR(N'Lịch hẹn không tồn tại trong hệ thống', 16, 1);
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

-- 5. Them lịch hẹn
CREATE OR ALTER PROC SP_THEMLICHHEN_KH
@SODT VARCHAR(10),
@MANS VARCHAR(10),  
@SOTT INT,
@LYDOKHAM NVARCHAR(200)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS (SELECT 1     
               FROM LICHRANH
               WHERE MANS = @MANS AND SOTT = @SOTT)
    BEGIN
      IF EXISTS(SELECT 1 
                FROM LICHHEN 
                WHERE MANS = @MANS AND SOTT = @SOTT)
      BEGIN
        RAISERROR(N'Lịch hẹn đã tồn tại', 16, 1)
        ROLLBACK TRAN
        RETURN  
      END
    END
    ELSE
    BEGIN
      RAISERROR(N'Lịch rảnh không tồn tại', 16, 1)
      ROLLBACK TRAN
      RETURN 
    END
    INSERT INTO LICHHEN(SODT, MANS, SOTT, LYDOKHAM)
    VALUES(@SODT, @MANS, @SOTT, @LYDOKHAM, @NGAY)
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN
    DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
    THROW 51000, @errorMessage, 1
    RETURN 
  END CATCH
COMMIT TRAN

-- 6. Xem lịch rảnh của nha sĩ (xem trên CA)
CREATE OR ALTER PROC SP_XEMLICHRANH_NHASI
@MANS VARCHAR(10)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM NHASI WHERE MANS = @MANS)
        BEGIN
            SELECT LR.MANS, LR.SOTT, LR.NGAY, LR.GIO
            FROM LICHRANH LR
            WHERE LR.MANS = @MANS
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

-- 7. Xem thông tin nha sĩ
CREATE OR ALTER PROC SP_XEMTHONGTIN_NHASI
@MANS VARCHAR(10)
AS  
BEGIN TRAN 
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM NHASI WHERE MANS = @MANS)
        BEGIN
            SELECT  NS.HOTEN, NS.PHAI, NS.GIOITHIEU
            FROM NHASI NS
            WHERE NS.MANS = @MANS
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

-- 8. Xem hóa đơn
CREATE OR ALTER PROC SP_XEMHOADON
@SODT VARCHAR(10),
@SOTT INT
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM HOADON WHERE SODT = @SODT AND SOTT = @SOTT)
        BEGIN
            SELECT HD.SODT, HD.SOTT, HD.MANV, HD.NGAYLAP, HD.TONGTIEN
            FROM HOADON HD
            WHERE HD.SODT = @SODT AND HD.SOTT = @SOTT
        END
        ELSE
        BEGIN
            RAISERROR(N'Hóa đơn không tồn tại trong hệ thống', 16, 1);
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

-- 9. Xem hồ sơ bệnh án 
CREATE OR ALTER PROC sp_XemHoSoBenhAn
@SODT VARCHAR(10),
@SOTT INT
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM HOSOBENH WHERE SODT = @SODT AND SOTT = @SOTT)
        BEGIN
            SELECT HSB.SODT, HSB.SOTT, HSB.MANS, HSB.NGAYKHAM, HSB.CHANDOAN, HSB._DAXUATHOADON
            FROM HOSOBENH HSB
            WHERE HSB.SODT = @SODT AND HSB.SOTT = @SOTT
        END
        ELSE
        BEGIN
            RAISERROR(N'Hồ sơ bệnh án không tồn tại trong hệ thống', 16, 1);
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
--10. Xem tên nhân viên trong hóa đơn
CREATE OR ALTER PROC sp_XemTenNVTrongHoaDon
@SODT VARCHAR(10),
@SOTT INT
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM HOADON WHERE SODT = @SODT AND SOTT = @SOTT)
        BEGIN
            SELECT HD.MANV, NV.HOTEN
            FROM HOADON HD, NHANVIEN NV
            WHERE HD.MANV = NV.MANV AND HD.SODT = @SODT AND HD.SOTT = @SOTT
        END
        ELSE
        BEGIN
            RAISERROR(N'Hóa đơn không tồn tại trong hệ thống', 16, 1);
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
--11. Xem loại dịch vụ
CREATE OR ALTER PROC sp_XemLoaiDichVu
AS
BEGIN TRAN
    BEGIN TRY
        SELECT LDV.MADV, LDV.TENDV, LDV.GIA
        FROM LOAIDICHVU LDV
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
        THROW 51000, @errorMessage, 1;
        RETURN
    END CATCH
COMMIT TRAN


--12. Xem chi tiết thuốc trong mỗi đơn thuốc
CREATE OR ALTER PROC sp_XemCTThuocTrongDonThuoc
@SODT VARCHAR(10),  
@SOTT INT
AS
BEGIN TRAN 
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM CHITIETTHUOC WHERE SODT = @SODT AND SOTT = @SOTT)
        BEGIN
            SELECT CTT.MATHUOC, LT.TENTHUOC, CTT.SOLUONG, CTT.CACHDUNG
            FROM CHITIETTHUOC CTT, LOAITHUOC LT
            WHERE CTT.MATHUOC = LT.MATHUOC AND CTT.SODT = @SODT AND CTT.SOTT = @SOTT
        END
        ELSE
        BEGIN
            RAISERROR(N'Đơn thuốc không tồn tại trong hệ thống', 16, 1);
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
--13. Xem tên các loại thuốc
CREATE OR ALTER PROC sp_XemTenCacLoaiThuoc
AS
BEGIN TRAN
    BEGIN TRY
        SELECT LT.MATHUOC, LT.TENTHUOC, LT.DONVITINH, LT.DONGIA
        FROM LOAITHUOC LT
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
        THROW 51000, @errorMessage, 1;
        RETURN
    END CATCH
COMMIT TRAN