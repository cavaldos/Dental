
-------------------------------------------------------------------------------------------------------
-- 3. Trigger------------------------------------------------------------------------------------------

-- Với mọi ca, giờ bắt đầu phải nhỏ hơn giờ kết thúc.
CREATE TRIGGER TRIGGER_CA_INSERT_UPDATE_1
ON CA
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT *
    FROM inserted
    WHERE GIOBATDAU >= GIOKETTHUC)
    BEGIN
        RAISERROR (N'Giờ bắt đầu phải nhỏ hơn giờ kết thúc.', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END;
GO

-- Với mọi ca, giờ kết thúc - giờ bắt đầu = 2 tiếng
CREATE TRIGGER TRIGGER_CA_INSERT_UPDATE_2
ON CA
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1
    FROM inserted
    WHERE DATEDIFF(HOUR, inserted.GIOBATDAU, inserted.GIOKETTHUC) <> 2)
    BEGIN
        RAISERROR ('Độ dài ca phải là 2 tiếng.', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END;
GO


-- Các lịch rảnh của một nha sĩ không được trùng nhau (trùng ca và trùng ngày).
CREATE TRIGGER TRIGGER_LICHRANH_INSERT_UPDATE_2
ON LICHRANH
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT MANS, NGAY, MACA
        FROM (SELECT MANS, NGAY, MACA FROM inserted) AS I
        GROUP BY MANS, NGAY, MACA
        HAVING COUNT(*) > 1
    )
    BEGIN
        RAISERROR(N'Không thể cập nhật dòng thành một giá trị đã tồn tại.', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END;
GO

-- Mỗi ca trong ngày chỉ được tối đa 2 nha sĩ được đăng ký. 
CREATE TRIGGER TRIGGER_LICHRANH_INSERT_UPDATE_3
ON LICHRANH
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT MACA, NGAY, COUNT(*) AS SLNS
        FROM LICHRANH
        GROUP BY MACA, NGAY
        HAVING COUNT(*) > 2
    )
    BEGIN
        RAISERROR(N'Không thể đăng ký nhiều hơn 2 Nha sĩ cho mỗi ca trong một ngày.', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END;
GO

-- Mỗi lịch rảnh, ca và ngày cần not null.
CREATE TRIGGER TRIGGER_LICHRANH_INSERT_UPDATE_4
ON LICHRANH
AFTER INSERT, UPDATE
AS
BEGIN
    
    IF EXISTS (
        SELECT 1
        FROM inserted AS i
        LEFT JOIN CA AS c ON i.MACA = c.MACA
        WHERE c.MACA IS NULL OR i.NGAY IS NULL
    )
    BEGIN
        RAISERROR(N'Mỗi lịch rảnh cần được liên kết với một thông tin ca và ngày không được NULL.', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END;
GO



-------------------------------------------------------------------------------------------
-- USE PKNHAKHOA
-- GO
-- I/ Tạo trigger cho bảng CHITIETTHUOC
-- 1. Trigger bán thuốc, cập nhật số lượng thuốc tồn kho
-- Tạo trigger nếu chưa tồn tại hoặc cập nhật nếu trigger đã tồn tại
IF EXISTS (SELECT *
FROM sys.triggers
WHERE name = 'Trigger_Insert_CTT')
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
END
GO

-- 2. Trigger bán thuốc, khi sửa số lượng thuốc trong chi tiết thuốc
-- Tạo trigger nếu chưa tồn tại hoặc cập nhật nếu trigger đã tồn tại
IF EXISTS (SELECT *
FROM sys.triggers
WHERE name = 'Trigger_Update_CTT_SL')
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
IF EXISTS (SELECT *
FROM sys.triggers
WHERE name = 'Trigger_Insert_Update_CTDV')
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
GO

-----------------------------------------

--LICHHEN
--1 Mỗi lịch hẹn luôn đi kèm với duy nhất một lịch rảnh của nha sĩ.
--2 Các lịch hẹn của một khách hàng không được trùng ca nhau.
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_LichHen')
    DROP TRIGGER Trigger_Insert_LichHen
GO

CREATE TRIGGER Trigger_Insert_LichHen
ON LICHHEN
INSTEAD OF INSERT
AS
BEGIN

	IF (not exists (SELECT * FROM LICHRANH LR JOIN inserted i 
				ON (LR.MANS = i.MANS AND LR.SOTT = i.SOTT)))
	BEGIN
		RAISERROR(N'Lỗi: Lịch hẹn không khớp với lịch rảnh của nha sĩ.',16,1)
		ROLLBACK TRAN
		RETURN
	END

	IF (exists (SELECT * FROM LICHHEN LH JOIN inserted i
				ON (LH.MANS = i.MANS AND LH.SOTT = i.SOTT)))
	BEGIN
		SELECT * FROM LICHHEN LH 
		RAISERROR(N'Lỗi: Lịch hẹn đã có người đặt.',16,1)
		ROLLBACK TRAN
		RETURN
	END
	
	IF (exists (SELECT * FROM 
			(
				SELECT SODT AS SODT1, NGAY AS NGAY1, MACA AS MACA1
				FROM LICHRANH LR1 JOIN inserted i ON (LR1.MANS = i.MANS AND LR1.SOTT = i.SOTT)
			)   AS T1 INNER JOIN
			(
				SELECT SODT AS SODT2, NGAY AS NGAY2, MACA AS MACA2
				FROM LICHRANH LR2 JOIN LICHHEN LH ON (LR2.MANS = LH.MANS AND LR2.SOTT = LH.SOTT)
			)   AS T2
			ON (SODT1 = SODT2 AND NGAY1 = NGAY2 AND MACA1 = MACA2)))
	BEGIN
		RAISERROR(N'Lỗi: Các lịch hẹn của cùng một khách hàng không được trùng ca nhau.',16,1)
		ROLLBACK TRAN
		RETURN
	END

	ELSE
    BEGIN
        INSERT INTO LICHHEN (MANS, SOTT, LYDOKHAM, SODT)
        SELECT MANS, SOTT, LYDOKHAM, SODT
        FROM inserted;
    END
END
GO

--HOADON
--1 Mỗi hóa đơn cần đi theo một hồ sơ bệnh.
--2 Tổng chi phí của hóa đơn = (SoLuong*DonGia(của Dịch vụ) + SoLuong*DonGia(của Thuốc))
--3 Mỗi hóa đơn phải được phụ trách bởi một nhân viên hợp lệ

IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_HoaDon')
    DROP TRIGGER Trigger_Insert_HoaDon
GO

CREATE TRIGGER Trigger_Insert_HoaDon
ON HOADON
INSTEAD OF insert
AS
BEGIN
	IF (not exists (SELECT * FROM HOSOBENH HSB JOIN inserted i 
				ON (HSB.SODT = i.SODT AND HSB.SOTT = i.SOTT)))
	BEGIN
		RAISERROR(N'Lỗi: Không tồn tại hồ sơ bệnh tương ứng.',16,1)
		ROLLBACK TRAN
		RETURN
	END

	IF (not exists (SELECT * FROM NHANVIEN NV JOIN inserted i 
				ON (NV.MANV = i.MANV)))
	BEGIN
		RAISERROR(N'Lỗi: Mã nhân viên phụ trách không hợp lệ.',16,1)
		ROLLBACK TRAN
		RETURN
	END

    DECLARE @NgayXuatHD DATE, @NgayKham DATE;
    SELECT @NgayXuatHD = i.NGAYXUAT
    FROM inserted i;
    SELECT @NgayKham = H.NGAYKHAM
    FROM HOSOBENH H JOIN inserted i ON H.SODT = i.SODT AND H.SOTT = i.SOTT;

    IF @NgayXuatHD < @NgayKham
	BEGIN
		RAISERROR(N'Lỗi: Ngày xuất hóa đơn không hợp lệ.',16,1)
		ROLLBACK TRAN
		RETURN
	END

	ELSE
    BEGIN
        INSERT INTO HOADON (SODT, SOTT, NGAYXUAT, MANV)
        SELECT SODT, SOTT, NGAYXUAT, MANV
        FROM inserted;
    END
END
GO

-----------------------------------------

-- TRIGGER LOAI THUOC
-- 1. Trigger cập nhật số lượng tồn khi thêm sửa/xóa loại thuốc:
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
    
END
GO

----
CREATE TRIGGER Trigger_Insert_Update_LT_Hethan 
ON LOAITHUOC
INSTEAD OF INSERT
AS
BEGIN

  -- R8: Ngày hết hạn của mỗi loại thuốc phải xa hơn ngày hiện tại.
  IF EXISTS (
    SELECT * 
    FROM LOAITHUOC LT JOIN inserted  I ON LT.MATHUOC = I.MATHUOC 
    WHERE LT.NGAYHETHAN < GETDATE()
  )
  BEGIN
     RAISERROR(N'Ngày hết hạn không được nhỏ hơn ngày hiện tại', 16, 1)
     ROLLBACK TRAN
     RETURN
  END

  -- Cho phép insert 
  INSERT INTO LOAITHUOC (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, 
                          SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA)
  SELECT MATHUOC, TENTHUOC, DONVITINH, CHIDINH,
         SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA
  FROM inserted

END

GO

--TRIGGER LOAI DICH VU
--1.Trigger gia dich vu lon hon 0:
CREATE TRIGGER Trigger_Insert_Update_LDV on LOAIDICHVU for INSERT, UPDATE
AS
BEGIN
    -- don gia thuoc phau thuat phai lon hon 0
    IF EXISTS (SELECT * FROM LOAIDICHVU LDV JOIN inserted I ON LDV.MADV = I.MADV WHERE LDV.DONGIA < 0)
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
    IF EXISTS (SELECT * FROM LOAIDICHVU LDV JOIN inserted I ON LDV.MADV = I.MADV WHERE LDV.DONGIA < 0)
    BEGIN
        RAISERROR(N'Giá dịch vụ không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END
GO
