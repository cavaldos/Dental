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
GO
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
GO
CREATE OR ALTER PROC SP_CAPNHATTHONGTIN_KH
@SODT VARCHAR(10),  
@HOTEN NVARCHAR(50),
@PHAI NVARCHAR(5),
@NGAYSINH DATE,
@DIACHI NVARCHAR(250), 
@MAT_KHAU_MOI VARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON;

  BEGIN TRAN
    BEGIN TRY
      -- Kiểm tra tồn tại tài khoản
      IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT)
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

        -- In ra thông báo thành công
        PRINT N'Cập nhật thông tin thành công';
      END
      ELSE
      BEGIN
        -- Nếu tài khoản không tồn tại, in ra thông báo lỗi
        RAISERROR(N'Tài khoản không tồn tại trong hệ thống', 16, 1);
        ROLLBACK TRAN;
        RETURN;  
      END

      COMMIT TRAN;
    END TRY
    BEGIN CATCH
      ROLLBACK TRAN;
      DECLARE @errorMessage NVARCHAR(200) = ERROR_MESSAGE(); 
      THROW 51000, @errorMessage, 1;
      RETURN; 
    END CATCH
END

--4. xem lich ranh cua tat ca cac nha si tu hien tai dn 30 ngay sau
GO
CREATE OR ALTER PROC SP_LRCHUADATTATCANS_KH
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


--5. truy van loai thuoc
GO
CREATE OR ALTER PROC SP_TRUYVANLOAITHUOC_KH
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


-- 6. truy van loai dich vu
GO
CREATE OR ALTER PROC SP_TRUYDICHVU_KH
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


-- 7. Truy van lich hen
GO
CREATE OR ALTER PROC SP_TRUYVANLICHHEN_KH
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
