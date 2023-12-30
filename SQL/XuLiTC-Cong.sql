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
        IF EXISTS(SELECT 1 FROM KHACHHANG WHERE SODT = @SODT)
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
