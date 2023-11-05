use PKNHAKHOA
GO

CREATE TRIGGER trig_KiemTraGioBDVaGioKT
ON CA
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE GIOBATDAU < GIOKETTHUC)
    BEGIN
        RAISERROR (N'Giờ bắt đầu phải nhỏ hơn giờ kết thúc.', 16, 1);
    END
END;
GO

CREATE TRIGGER trig_KiemTraThoiLuongCa
ON CA
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted WHERE DATEDIFF(HOUR, inserted.GIOBATDAU, inserted.GIOKETTHUC) <> 2)
    BEGIN
        RAISERROR ('Độ dài ca phải là 2 tiếng.', 16, 1);
    END
END;
GO


CREATE TRIGGER trig_KiemTraLichHen
ON LICHHEN
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT n.SOTT
        FROM inserted AS n
        JOIN LICHRANH AS x ON n.SOTT = x.SOTT
        WHERE x.SOTT IS NULL
        GROUP BY n.SOTT
        HAVING COUNT(*) > 1
    )
    BEGIN
        RAISERROR ('Mỗi lịch hẹn phải có duy nhất một lịch rảnh của nha sĩ.', 16, 1);
    END
END;
GO

CREATE TRIGGER trig_KiemTraLichRanh
ON LICHRANH
AFTER DELETE, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM LICHHEN
        WHERE SOTT IN (SELECT SOTT FROM deleted)
    )
    BEGIN
        RAISERROR ('Không thể xóa hoặc sửa lịch rảnh liên quan đến lịch hẹn đã tồn tại!', 16, 1);
    END
END;
GO

USE PKNHAKHOA
GO
-- I/ Tạo trigger cho bảng CHITIETTHUOC
-- 1. Trigger bán thuốc, cập nhật số lượng thuốc tồn kho
-- Tạo trigger nếu chưa tồn tại hoặc cập nhật nếu trigger đã tồn tại
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_CTT')
    DROP TRIGGER Trigger_Insert_CTT
GO

CREATE TRIGGER Trigger_Insert_CTT
ON CHITIETTHUOC
FOR INSERT
AS
BEGIN
    IF(NOT EXISTS(SELECT *
        FROM LOAITHUOC LT JOIN inserted I
        ON LT.MATHUOC = I.MATHUOC))
    BEGIN
        RAISERROR(N'Thuốc này không tồn tại trong kho',16,1)
        ROLLBACK TRAN
        RETURN
    END

    IF(EXISTS(SELECT *
        FROM HOSOBENH HSB JOIN inserted I 
        ON HSB.SODT = I.SODT AND HSB.SOTT = I.SOTT
        WHERE _DAXUATHOADON = 1))
    BEGIN
        RAISERROR(N'Lỗi đã xuất hóa đơn, không thể thêm đơn thuốc được',16,1)
        ROLLBACK TRAN
        RETURN
    END

    IF(EXISTS(SELECT * 
        FROM LOAITHUOC LT, inserted I 
        WHERE I.MATHUOC = LT.MATHUOC AND I.SOLUONG > LT.SLTON AND LT.NGAYHETHAN >= GETDATE()))
    BEGIN 
        RAISERROR(N'Lỗi không đủ số lượng thuốc tồn kho để bán',16,1)
        ROLLBACK TRAN
        RETURN
    END

    ELSE
    BEGIN
        UPDATE LOAITHUOC
        SET SLTON = SLTON - (
            SELECT SOLUONG
            FROM inserted
            WHERE MATHUOC = LOAITHUOC.MATHUOC
        )
        FROM LOAITHUOC
        JOIN inserted ON LOAITHUOC.MATHUOC = inserted.MATHUOC
    END
END
GO

-- 2. Trigger bán thuốc, khi sửa số lượng thuốc trong chi tiết thuốc
-- Tạo trigger nếu chưa tồn tại hoặc cập nhật nếu trigger đã tồn tại
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Update_CTT_SL')
    DROP TRIGGER Trigger_Update_CTT_SL
GO

CREATE TRIGGER Trigger_Update_CTT_SL
ON CHITIETTHUOC
FOR UPDATE
AS
if UPDATE(SOLUONG)
BEGIN
    IF(EXISTS(SELECT *
        FROM HOSOBENH HSB JOIN inserted I 
        ON HSB.SODT = I.SODT AND HSB.SOTT = I.SOTT
        WHERE _DAXUATHOADON = 1))
    BEGIN
        RAISERROR(N'Lỗi đã xuất hóa đơn, không thể sửa được',16,1)
        ROLLBACK TRAN
        RETURN
    END

    IF(EXISTS(SELECT * 
        FROM LOAITHUOC LT, inserted I, deleted D 
        WHERE I.MATHUOC = LT.MATHUOC AND D.MATHUOC = LT.MATHUOC AND I.SOLUONG > LT.SLTON + D.SOLUONG))
    BEGIN 
        RAISERROR(N'Lỗi không đủ số lượng thuốc tồn kho để bán',16,1)
        ROLLBACK TRAN
        RETURN
    END
    
    ELSE 
    BEGIN
        UPDATE LOAITHUOC
        SET SLTON = SLTON + (
            SELECT SOLUONG
            FROM deleted
            WHERE MATHUOC = LOAITHUOC.MATHUOC
        )
        FROM LOAITHUOC
        JOIN deleted ON LOAITHUOC.MATHUOC = deleted.MATHUOC

        UPDATE LOAITHUOC
        SET SLTON = SLTON - (
            SELECT SOLUONG
            FROM inserted
            WHERE MATHUOC = LOAITHUOC.MATHUOC
        )
        FROM LOAITHUOC
        JOIN inserted ON LOAITHUOC.MATHUOC = inserted.MATHUOC
    END
END
GO

-- 3. Trigger không được thêm, hay sửa chi tiết dịch vụ khi đã xuất hóa đơn
-- Tạo trigger nếu chưa tồn tại hoặc cập nhật nếu trigger đã tồn tại
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_Update_CTDV')
    DROP TRIGGER Trigger_Insert_Update_CTDV
GO

CREATE TRIGGER Trigger_Insert_Update_CTDV
ON  CHITIETDV
FOR UPDATE, INSERT
AS
BEGIN
    IF(EXISTS(SELECT *
        FROM HOSOBENH HSB JOIN inserted I 
        ON HSB.SODT = I.SODT AND HSB.SOTT = I.SOTT
        WHERE _DAXUATHOADON = 1))
    BEGIN
        RAISERROR(N'Lỗi đã xuất hóa đơn, không thể sửa được',16,1)
        ROLLBACK TRAN
        RETURN
    END
END


-- R7: Mỗi một loại thuốc trong chi tiết thuốc phải tồn tại trong kho thuốc.
-- R10: Số lượng thuốc trong chi tiết thuốc phải lớn hơn 0. 
-- R11: MATHUOC, STT, SODT trong chi tiết thuốc phải là độc quyền. 
-- R13: Với mọi chi tiết thuốc,tồn tại số thứ tự và số điện thoại ứng với một hồ sơ bệnh án.
-- R16: Với mọi chi tiết dịch vụ,
-- tồn tại mã dịch vụ ứng vọi loại dịch vụ đó.



-- R3: Số lượng thuốc tồn kho mỗi loại thuốc phải từ 0 trở lên.  
-- R4: Đơn giá mỗi loại thuốc phải từ 0 trở lên. 
-- R5: Số lượng thuốc nhập của mỗi loại thuốc phải lớn hơn 0. 
-- R7: Mỗi một loại thuốc trong chi tiết thuốc phải tồn tại trong kho thuốc.
-- R6: Số lượng đã hủy của mỗi loại thuốc phải từ 0 trở lên. 
-- R8: Ngày hết hạn của mỗi loại thuốc phải xa hơn ngày hiện tại. 
-- R9: Tổng số lượng thuốc đã nhập phải bằng của tổng số lượng thuốc tồn kho và số lượng thuốc đã hủy và tổng số lượng thuốc trong chi tiết thuốc.
-- R14: Mã dịch vụ trong loại dịch vụ phải là độc quyền. 
-- R15: Đơn giá trong mỗi loại dịch vụ phải lớn hơn 0. 
-- R15: Với mọi chi tiết dịch vụ,
-- tồn tại mã dịch vụ ứng vọi loại dịch vụ đó.



-- =====                           TRIGGER LOAI THUOC

-- 1. Trigger cập nhật số lượng tồn khi thêm/sửa/xóa loại thuốc:
CREATE TRIGGER Trigger_Insert_Update_Delete_LT on LOAITHUOC for INSERT, UPDATE, DELETE
AS
BEGIN
    -- R3: Số lượng thuốc tồn kho mỗi loại thuốc phải từ 0 trở lên. 
    IF EXISTS (SELECT * FROM LOAITHUOC LT JOIN inserted I ON LT.MATHUOC = I.MATHUOC WHERE LT.SLTON < 0)
    BEGIN
        RAISERROR(N'Số lượng tồn không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
    -- R5: Số lượng thuốc nhập của mỗi loại thuốc phải lớn hơn 0. 
    IF EXISTS (SELECT * FROM LOAITHUOC LT JOIN inserted I ON LT.MATHUOC = I.MATHUOC WHERE LT.SLNHAP < 0)
    BEGIN
        RAISERROR(N'Số lượng nhập không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
    -- R6: Số lượng đã hủy của mỗi loại thuốc phải từ 0 trở lên. 
    IF EXISTS (SELECT * FROM LOAITHUOC LT JOIN inserted I ON LT.MATHUOC = I.MATHUOC WHERE LT.SLDAHUY < 0)
    BEGIN
        RAISERROR(N'Số lượng đã hủy không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    -- R4: Đơn giá mỗi loại thuốc phải từ 0 trở lên.
    IF EXISTS (SELECT * FROM LOAITHUOC LT JOIN inserted I ON LT.MATHUOC = I.MATHUOC WHERE LT.DONGIA < 0)
    BEGIN
        RAISERROR(N'Đơn giá không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
-- R9:Tổng số lượng thuốc đã nhập phải bằng của tổng số lượng thuốc tồn kho và số lượng thuốc đã hủy và tổng số lượng thuốc trong chi tiết thuốc.--
    IF EXISTS (SELECT * FROM LOAITHUOC LT JOIN inserted I ON LT.MATHUOC = I.MATHUOC WHERE LT.SLTON + LT.SLDAHUY + LT.SLNHAP <> LT.SLTON)
    BEGIN
        RAISERROR(N'Tổng số lượng thuốc đã nhập phải bằng của tổng số lượng thuốc tồn kho và số lượng thuốc đã hủy và tổng số lượng thuốc trong chi tiết thuốc', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

END


-- 2. Trigger cập nhật ngày hết hạn khi thêm/sửa loại thuốc:
CREATE TRIGGER Trigger_Insert_Update_LT_Hethan on LOAITHUOC for INSERT, UPDATE
AS
BEGIN
-- R8: Ngày hết hạn của mỗi loại thuốc phải xa hơn ngày hiện tại.--
    IF EXISTS (SELECT * FROM LOAITHUOC LT JOIN inserted I ON LT.MATHUOC = I.MATHUOC WHERE LT.NGAYHETHAN < GETDATE())
    BEGIN
        RAISERROR(N'Ngày hết hạn không được nhỏ hơn ngày hiện tại', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

END
END
	



--                                 TRIGGER LOAI DICH VU
--1.Trigger gia dich vu lon hon 0:
CREATE TRIGGER Trigger_Insert_Update_LDV on LOAIDICHVU for INSERT, UPDATE
AS
BEGIN
    -- don gia thuoc phau thuat phai lon hon 0
    IF EXISTS (SELECT * FROM LOAIDICHVU LDV JOIN inserted I ON LDV.MADV = I.MADV WHERE LDV.GIA < 0)
    BEGIN
        RAISERROR(N'Giá dịch vụ không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
    -- R14: Mã dịch vụ trong loại dịch vụ phải là độc quyền. 
    IF EXISTS (SELECT * FROM LOAIDICHVU LDV JOIN inserted I ON LDV.MADV = I.MADV WHERE LDV.MADV IN (SELECT MADV FROM LOAIDICHVU GROUP BY MADV HAVING COUNT(*) > 1))
    BEGIN
        RAISERROR(N'Mã dịch vụ phải là độc quyền', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
    -- R15: Với mọi chi tiết dịch vụ, tồn tại mã dịch vụ ứng vọi loại dịch vụ đó.
    IF EXISTS (SELECT * FROM LOAIDICHVU LDV JOIN inserted I ON LDV.MADV = I.MADV WHERE LDV.GIA < 0)
    BEGIN
        RAISERROR(N'Giá dịch vụ không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END





	--                                       TRIGGER QUẢN  TRI VIEN



