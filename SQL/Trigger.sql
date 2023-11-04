use PKNHAKHOA
GO

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

-- Mỗi lịch hẹn luôn đi kèm với duy nhất một lịch rảnh của nha sĩ.
CREATE TRIGGER TRIGGER_LICHHEN_INSERT_UPDATE_1
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
        RAISERROR ('Mỗi lịch hẹn phải có duy nhất một lịch rảnh của nha sĩ.', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
END;
GO

-- Các lịch hẹn của một khách hàng không được trùng ca nhau.
CREATE TRIGGER TRIGGER_LICHHEN_INSERT_UPDATE_2
ON LICHHEN
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM inserted i
        WHERE EXISTS (
            SELECT 1
            FROM LICHHEN n1
            WHERE n1.MANS = i.MANS AND n1.SOTT = i.SOTT
            GROUP BY n1.MANS, n1.SOTT
            HAVING COUNT(*) > 1
        )
    )
    BEGIN
        RAISERROR(N'Các lịch hẹn không được trùng ca nhau.', 16, 1)
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


-----------------------------------------


--LICHHEN
--1 Mỗi lịch hẹn luôn đi kèm với duy nhất một lịch rảnh của nha sĩ.
--2 Các lịch hẹn của một khách hàng không được trùng ca nhau.
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'Trigger_Insert_LichHen')
    DROP TRIGGER Trigger_Insert_LichHen
GO

CREATE TRIGGER Trigger_Insert_LichHen
ON LICHHEN
FOR insert
AS
BEGIN
	IF (not exists (SELECT * FROM KHACHHANG KH JOIN inserted i 
				ON (KH.SODT = i.SODT)))
	BEGIN
		RAISERROR(N'Lỗi: Số điện thoại chưa tồn tại trong hệ thống.',16,1)
		ROLLBACK TRAN
		RETURN
	END

	IF (not exists (SELECT * FROM LICHRANH LR JOIN inserted i 
				ON (LR.MANS = i.MANS AND LR.SOTT = i.SOTT)))
	BEGIN
		RAISERROR(N'Lỗi: Lịch hẹn không khớp với lịch rảnh của nha sĩ.',16,1)
		ROLLBACK TRAN
		RETURN
	END

	IF (exists (SELECT * FROM 
			(
				SELECT LR1.MANS AS MANS1, SODT AS SODT1, NGAY AS NGAY1, MACA AS MACA1
				FROM LICHRANH LR1 JOIN inserted i ON (LR1.MANS = i.MANS AND LR1.SOTT = i.SOTT)
			)   AS T1,
			(
				SELECT LR2.MANS AS MANS2, SODT AS SODT2, NGAY AS NGAY2, MACA AS MACA2
				FROM LICHRANH LR2 JOIN LICHHEN LH ON (LR2.MANS = LH.MANS AND LR2.SOTT = LH.SOTT)
			)   AS T2
			WHERE SODT1 = SODT2 AND NGAY1 = NGAY2 AND MACA1 = MACA2))
	BEGIN
		RAISERROR(N'Lỗi: Các lịch hẹn của một khách hàng không được trùng ca nhau.',16,1)
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
FOR insert
AS
BEGIN
	IF (not exists (SELECT * FROM HOSOBENH HSB JOIN inserted i 
				ON (HSB.SODT = i.SODT AND HSB.SOTT = i.SOTT)))
	BEGIN
		RAISERROR(N'Lỗi: Không tồn tại hồ sơ bệnh tương ứng.',16,1)
		ROLLBACK TRAN
		RETURN
	END

    DECLARE @NgayXuatHD DATE, @NgayKham DATE;
    SELECT @NgayXuatHD = i.NGAYXUAT
    FROM inserted i;
    SELECT @NgayKham = H.NGAYKHAM
    FROM HOSOBENH H JOIN inserted i ON H.SODT = i.SODT AND H.SOTT = i.SOTT;

    IF @NgayXuatHD >= @NgayKham
	BEGIN
		RAISERROR(N'Lỗi: Ngày xuất hóa đơn không hợp lệ.',16,1)
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

	ELSE
    BEGIN
        INSERT INTO HOADON (SODT, SOTT, NGAYXUAT, MANV)
        SELECT SODT, SOTT, NGAYXUAT, MANV
        FROM inserted;

		DECLARE @slDV INT 
		SET @slDV = ISNULL((SELECT SOLUONG 
							FROM CHITIETDV CTDV JOIN inserted i
							ON (CTDV.SODT = i.SODT AND CTDV.SOTT = i.SOTT)), 0)
		DECLARE @giaDV FLOAT 
		SET @giaDV = ISNULL((SELECT LDV.DONGIA 
							FROM CHITIETDV CTDV JOIN inserted i
							ON (CTDV.SODT = i.SODT AND CTDV.SOTT = i.SOTT)
							JOIN LOAIDICHVU LDV ON (CTDV.MADV = LDV.MADV)), 0)
		DECLARE @slT INT 
		SET @slT = ISNULL((SELECT SOLUONG 
							FROM CHITIETTHUOC CTT JOIN inserted i
							ON (CTT.SODT = i.SODT AND CTT.SOTT = i.SOTT)), 0)
		DECLARE @giaT FLOAT 
		SET @giaT = ISNULL((SELECT LT.DONGIA 
							FROM CHITIETTHUOC CTT JOIN inserted i
							ON (CTT.SODT = i.SODT AND CTT.SOTT = i.SOTT)
							JOIN LOAITHUOC LT ON (CTT.MATHUOC = LT.MATHUOC)), 0)

		UPDATE HOADON
        SET TONGCHIPHI = @slDV * @giaDV + @slT * @giaT
        FROM HOADON HD JOIN inserted i ON (HD.SODT = i.SODT AND HD.SOTT = i.SOTT)
    END
END
GO

-----------------------------------------





-- =====                           TRIGGER LOAI THUOC

-- 1. Trigger cập nhật số lượng tồn khi thêm/sửa/xóa loại thuốc:
CREATE TRIGGER Trigger_Insert_Update_Delete_LT on LOAITHUOC for INSERT, UPDATE, DELETE
AS
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE SLTON < 0)
    BEGIN
        RAISERROR(N'Số lượng tồn không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    IF EXISTS (SELECT * FROM inserted WHERE SLNHAP < 0)
    BEGIN
        RAISERROR(N'Số lượng nhập không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    IF EXISTS (SELECT * FROM inserted WHERE SLDAHUY < 0)
    BEGIN
        RAISERROR(N'Số lượng đã hủy không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    IF EXISTS (SELECT * FROM inserted WHERE DONGIA < 0)
    BEGIN
        RAISERROR(N'Đơn giá không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    IF EXISTS (SELECT * FROM deleted WHERE SLTON < 0)
    BEGIN
        RAISERROR(N'Số lượng tồn không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    IF EXISTS (SELECT * FROM deleted WHERE SLNHAP < 0)
    BEGIN
        RAISERROR(N'Số lượng nhập không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    IF EXISTS (SELECT * FROM deleted WHERE SLDAHUY < 0)
    BEGIN
        RAISERROR(N'Số lượng đã hủy không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

    IF EXISTS (SELECT * FROM deleted WHERE DONGIA < 0)
    BEGIN
        RAISERROR(N'Đơn giá không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END

END



-- 2. Trigger cập nhật ngày hết hạn khi thêm/sửa loại thuốc:
CREATE TRIGGER Trigger_Insert_Update_LT_Hethan on LOAITHUOC for INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE NGAYHETHAN < GETDATE())
    BEGIN
        RAISERROR(N'Ngày hết hạn không được nhỏ hơn ngày hiện tại', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
    -- don gia phai lon  hon 0
    IF EXISTS (SELECT * FROM inserted WHERE DONGIA < 0)
    BEGIN
        RAISERROR(N'Đơn giá không được nhỏ hơn 0', 16, 1)
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
    IF EXISTS (SELECT * FROM inserted WHERE DONGIA < 0)
    BEGIN
        RAISERROR(N'Giá dịch vụ không được nhỏ hơn 0', 16, 1)
        ROLLBACK TRAN
        RETURN
    END
    -- don gia phai lon  hon 0
END





	--                                       TRIGGER QUẢN  TRI VIEN

--1. Trigger kiểm tra số lượng nhân sĩ trong ca:
CREATE TRIGGER Trigger_Insert_Update_Delete_LR on LICHRANH for INSERT, UPDATE, DELETE 
AS
BEGIN

END

