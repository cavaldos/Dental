-- 1. Tạo tài khoản KH
-- 2 .Xem thông tin cá nhân khách hàng
-- 3. Cập nhật thông tin cá nhan KH
-- 4. Xem lịch rảnh theo 1 nha sĩ
-- 5. xem lịch rảnh của tất cả nha sĩ từ hiện tại đến hết 30 ngày sau
-- 6. truy vấn loại thuốc
-- 7. truy vấn loại dịch vụ
-- 8. Truy vấn lịch hẹn


USE PKNHAKHOA
GO
--------------
--1/ Tạo tài khoản Khách Hàng (KH)
CREATE OR ALTER PROC SP_TAOTKKH_KH
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


-- 2 .Xem thông tin cá nhân khách hàng
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


-- 3. Cập nhật thông tin cá nhân KH
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




-- 4. Xem lịch rảnh của nha sĩ (xem trên CA)
CREATE OR ALTER PROC SP_XEMLICHRANH_NHASI
@MANS VARCHAR(10)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM NHASI WHERE MANS = @MANS)
        BEGIN
            SELECT LR.MANS, LR.SOTT, LR.NGAY ,C.MACA, C.GIOBATDAU, C.GIOKETTHUC
            FROM LICHRANH LR JOIN CA C ON LR.MACA = C.MACA
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


--5. xem lich ranh cua tat ca cac nha si tu hien tai dn 30 ngay sau
-- khong biet lam


--6. truy van loai thuoc
CREATE OR ALTER PROC SP_TRUYVANLOAITHUOC
@MA_THUOC VARCHAR(10)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM CHITIETTHUOC WHERE MATHUOC = @MA_THUOC)
        BEGIN
            SELECT LT.TENTHUOC,LT.DONVITINH,LT.CHIDINH,LT.DONGIA
            FROM CHITIETTHUOC CTT JOIN LOAITHUOC LT ON CTT.MATHUOC = LT.MATHUOC
            WHERE CTT.MATHUOC = @MA_THUOC
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


-- 7. truy van loai dich vu
CREATE OR ALTER PROC SP_TRUYDICHVU
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
            RAISERROR(' Khong ton tai ma dich vu nay', 16, 1);
            ROLLBACK TRAN
            RETURN
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN
        DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE();
        THROW 51000, @errorMessage, 1;
        RETURN
    END CATC
-- 8. Truy van lich hen
CREATE OR ALTER PROC SP_TRUYVANLICHHEN
    @SDT VARCHAR(10)
AS
BEGIN TRAN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SDT)
        BEGIN
            SELECT NS.MANS , NS.HOTEN, LR.SOTT, C.GIOBATDAU, C.GIOKETTHUC,C.MACA,LH.LYDOKHAM
            FROM KHACHHANG KH JOIN LICHHEN LH ON KH.SODT = LH.SODT 
                            JOIN NHASI NS ON LH.MANS = NS.MANS 
                            JOIN LICHRANH LR ON LH.MANS = LR.MANS 
                            JOIN CA C ON LR.MACA = C.MACA
            WHERE KH.SODT = @SDT
        END
        ELSE
        BEGIN
            RAISERROR(' Khong ton tai khach hang nay', 16, 1);
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



-- 9. Xoa lịch hẹn
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