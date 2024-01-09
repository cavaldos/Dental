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
AFTER INSERT
AS
BEGIN
	IF (EXISTS(SELECT * FROM LICHHEN LH, inserted I WHERE I.MANS = LH.MANS AND I.SOTT = LH.SOTT AND I.SODT != LH.SODT))
	BEGIN
		RAISERROR(N'Lỗi: Đã có khách hàng đặt lịch hẹn này.',16,1)
		ROLLBACK TRAN
		RETURN
	END

	IF ((SELECT COUNT(LR.MANS)
		FROM LICHRANH LR JOIN (SELECT LH.* FROM LICHHEN LH, inserted I WHERE I.SODT = LH.SODT) LH1
		ON LR.SOTT = LH1.SOTT AND LR.MANS = LH1.MANS
		GROUP BY MACA) >= 2)
	BEGIN
		RAISERROR(N'Lỗi: Các lịch hẹn của cùng một khách hàng không được trùng ca nhau.',16,1)
		ROLLBACK TRAN
		RETURN
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
AFTER INSERT
AS
BEGIN
    IF EXISTS(SELECT *
			  FROM HOSOBENH HSB JOIN inserted I
			  ON HSB.SODT = I.SODT AND HSB.SOTT = I.SOTT
			  WHERE NGAYXUAT < NGAYKHAM)
	BEGIN
		RAISERROR(N'Lỗi: Ngày xuất hóa đơn không hợp lệ.',16,1)
		ROLLBACK TRAN
		RETURN
	END
END
GO

-----------------------------------------

IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_Update_Delete_LT')
    DROP TRIGGER Trigger_Insert_Update_Delete_LT
GO

IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_Update_LT_Hethan')
    DROP TRIGGER Trigger_Insert_Update_LT_Hethan
GO

IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_Update_LDV')
    DROP TRIGGER Trigger_Insert_Update_LDV
GO

IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_LT')
    DROP TRIGGER Trigger_Insert_LT
GO

IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Update_LT')
    DROP TRIGGER Trigger_Update_LT
GO

-- TRIGGER LOAI THUOC
CREATE TRIGGER Trigger_Insert_LT 
ON LOAITHUOC 
FOR INSERT
AS
BEGIN
	-- R3: Số lượng tồn cần lớn hơn 0
	IF EXISTS (SELECT * 
				FROM LOAITHUOC LT JOIN inserted I ON (LT.MATHUOC = I.MATHUOC) 
				WHERE LT.SLTON < 1)
    BEGIN
        RAISERROR(N'Số lượng tồn không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

	-- R4: Đơn giá mỗi loại thuốc phải lớn hơn 0.
    IF EXISTS (SELECT * 
				FROM LOAITHUOC LT JOIN inserted I ON (LT.MATHUOC = I.MATHUOC) 
				WHERE LT.DONGIA <= 0)
    BEGIN
        RAISERROR(N'Đơn giá không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

	-- R5: Số lượng thuốc nhập của mỗi loại thuốc phải lớn hơn 0. 
    IF EXISTS (SELECT * 
				FROM LOAITHUOC LT JOIN inserted I ON (LT.MATHUOC = I.MATHUOC) 
				WHERE LT.SLNHAP < 1)
    BEGIN
        RAISERROR(N'Số lượng nhập không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

	-- Số lượng đã hủy bằng 0 (khi loại thuốc mới được insert vào). 
    IF EXISTS (SELECT * 
				FROM LOAITHUOC LT JOIN inserted I ON (LT.MATHUOC = I.MATHUOC) 
				WHERE LT.SLDAHUY <> 0)
    BEGIN
        RAISERROR(N'Số lượng đã hủy phải bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

	-- R8: Ngày hết hạn của mỗi loại thuốc phải xa hơn ngày hiện tại
	IF EXISTS (SELECT *
				FROM LOAITHUOC LT JOIN inserted I ON (LT.MATHUOC = I.MATHUOC)
				WHERE DATEDIFF(DAY, GETDATE(), LT.NGAYHETHAN) <= 0)
	BEGIN
		RAISERROR(N'Thuốc đã hết hạn.', 16, 1)
        ROLLBACK TRAN
        RETURN
	END
END
GO

CREATE TRIGGER Trigger_Update_LT 
ON LOAITHUOC 
FOR UPDATE
AS
BEGIN
	-- R4: Đơn giá mỗi loại thuốc phải lớn hơn 0.
    IF EXISTS (SELECT * 
				FROM LOAITHUOC LT JOIN inserted I ON (LT.MATHUOC = I.MATHUOC) 
				WHERE LT.DONGIA <= 0)
    BEGIN
        RAISERROR(N'Đơn giá không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

	-- R5: Số lượng thuốc nhập của mỗi loại thuốc phải lớn hơn 0. 
    IF EXISTS (SELECT * 
				FROM LOAITHUOC LT JOIN inserted I ON (LT.MATHUOC = I.MATHUOC) 
				WHERE LT.SLNHAP < 1)
    BEGIN
        RAISERROR(N'Số lượng nhập không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END
GO

-- TRIGGER LOAI DICH VU
CREATE TRIGGER Trigger_Insert_Update_LDV
ON LOAIDICHVU
FOR INSERT, UPDATE
AS
BEGIN
	-- Đơn giá mỗi loại dịch vụ phải lớn hơn 0.
    IF EXISTS (SELECT * 
				FROM LOAIDICHVU LDV JOIN inserted I ON (LDV.MADV = I.MADV) 
				WHERE LDV.MADV <= 0)
    BEGIN
        RAISERROR(N'Đơn giá không được nhỏ hơn hoặc bằng 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END
GO