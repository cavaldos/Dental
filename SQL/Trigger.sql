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
