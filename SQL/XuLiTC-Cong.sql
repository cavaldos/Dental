USE [PKNHAKHOA]
GO
/****** Object:  StoredProcedure [dbo].[SP_CAPNHATTHONGTIN_KH]    Script Date: 12/30/2023 1:31:40 PM ******/

CREATE OR ALTER PROC [dbo].[SP_CAPNHATTHONGTIN_KH]
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
        IF EXISTS(SELECT 1 FROM KHACHHANG WITH (UPDLOCK) WHERE SODT = @SODT)
        BEGIN
            -- Kiểm tra mật khẩu cũ
            IF EXISTS(SELECT 1 FROM KHACHHANG WITH (UPDLOCK) WHERE SODT = @SODT AND MATKHAU = @MAT_KHAU_CU )
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
GO

USE [PKNHAKHOA]
GO
/****** Object:  StoredProcedure [dbo].[SP_THEMCTTHUOC_NS]    Script Date: 1/1/2024 6:25:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- NS09/ THÊM CTTHUOC VÀO BỆNH ÁN
ALTER PROCEDURE [dbo].[SP_THEMCTTHUOC_NS]
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

	IF(NOT EXISTS(SELECT * FROM LOAITHUOC WITH (UPDLOCK) WHERE MATHUOC = @MATHUOC))
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
                  FROM LOAITHUOC LT WITH (UPDLOCK)
                  WHERE LT.MATHUOC = @MATHUOC AND @SOLUONG <= @SLTON AND LT.NGAYHETHAN > GETDATE()))
        BEGIN
			WAITFOR DELAY '00:00:10'
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

USE [PKNHAKHOA]
GO
/****** Object:  StoredProcedure [dbo].[SP_DANGNHAP_ALL]    Script Date: 1/1/2024 11:36:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROC [dbo].[SP_DANGNHAP_ALL]
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
		IF EXISTS (SELECT * FROM KHACHHANG WITH (UPDLOCK) WHERE SODT = @MATK AND MATKHAU = @MATKHAU)
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

USE [PKNHAKHOA]
GO
/****** Object:  StoredProcedure [dbo].[SP_GETLICHRANHNS_NV]    Script Date: 1/1/2024 11:43:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[SP_GETLICHRANHNS_NV]
AS
BEGIN TRAN
	BEGIN TRY
		-- LICH CO HEN CUA NHA SI
		SELECT NGAY, CA.MACA, GIOBATDAU, GIOKETTHUC, LH.SOTT SOTTLH, LH.MANS, NS.HOTEN HOTENNS, KH.SODT SODTKH, KH.HOTEN HOTENKH, LH.LYDOKHAM LYDOKHAM
		FROM LICHHEN LH WITH (UPDLOCK)
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
GO

