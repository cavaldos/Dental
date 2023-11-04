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

