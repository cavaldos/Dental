--Tạo 5 login tương ứng với các role và cho server nodejs
EXEC sp_addlogin 'loginKH', 'password123@'
EXEC sp_addlogin 'loginNS', 'password123@'
EXEC sp_addlogin 'loginNV', 'password123@'
EXEC sp_addlogin 'loginQTV', 'password123@'
EXEC sp_addlogin 'loginServer', 'password123@'

USE PKNHAKHOA
GO
CREATE USER userKH FOR LOGIN loginKH
CREATE USER userNV FOR LOGIN loginNV
CREATE USER userQTV FOR LOGIN loginQTV
CREATE USER userNS FOR LOGIN loginNS
CREATE USER userServer FOR LOGIN loginServer

EXEC SP_ADDROLE 'QTV'
EXEC SP_ADDROLE 'KHACHHANG'
EXEC SP_ADDROLE 'NHANVIEN'
EXEC SP_ADDROLE 'NHASI'

EXEC sp_addrolemember 'QTV', 'userQTV'
EXEC sp_addrolemember 'KHACHHANG', 'userKH'
EXEC sp_addrolemember 'NHANVIEN', 'userNV'
EXEC sp_addrolemember 'NHASI', 'userNS'
EXEC sp_addrolemember db_datareader, 'userServer'

USE PKNHAKHOA
GO
--I/ Phân quyền cho role QTV
--1. Quyền quản lý tài khoản KH
GRANT SELECT (SODT, HOTEN, PHAI, NGAYSINH, DIACHI, _DAKHOA), UPDATE (_DAKHOA)
ON KHACHHANG
TO QTV

--2. Quyền quản lý tài khoản NV
GRANT SELECT (MANV, HOTEN, PHAI, VITRICV, _DAKHOA), INSERT, UPDATE (_DAKHOA)
ON NHANVIEN
TO QTV

--3. Quyền quản lý tài khoản NS
GRANT SELECT (MANS, HOTEN, PHAI, GIOITHIEU, _DAKHOA), INSERT, UPDATE (_DAKHOA)
ON NHASI
TO QTV

--4. Quyền quản lý tài khoản QTV
GRANT SELECT, INSERT, UPDATE(HOTEN, PHAI, MATKHAU)
ON QTV
TO QTV

--5. Quyền quản lý dịch vụ 
GRANT SELECT, INSERT, DELETE, UPDATE(TENDV, MOTA, DONGIA)
ON LOAIDICHVU
TO QTV

--6. Quyền quản lý các loại thuốc
GRANT SELECT, INSERT, DELETE, UPDATE (TENTHUOC, DONVITINH, CHIDINH, SLTON, SLNHAP, SLDAHUY, NGAYHETHAN, DONGIA)
ON LOAITHUOC
TO QTV

--7. Quyền quản lý các ca
GRANT SELECT, INSERT, DELETE, UPDATE(GIOBATDAU, GIOKETTHUC)
ON CA
TO QTV

--II/ Phân quyền cho KHACHHANG 
--1. Mọi quyền trên tài khoản KH trừ xóa tài khoản
GRANT SELECT, INSERT, UPDATE(HOTEN, PHAI, NGAYSINH, DIACHI, MATKHAU)
ON KHACHHANG
TO KHACHHANG

--2. Quyền xem,thêm, xóa lịch hẹn
GRANT SELECT, DELETE, INSERT
ON LICHHEN
TO KHACHHANG

--3. Quyền xem trên lịch rảnh của nha sĩ
GRANT SELECT
ON LICHRANH
TO KHACHHANG

--4. Quyền xem trên CA
GRANT SELECT
ON CA
TO KHACHHANG

--5. Quyền xem thông tin nha sĩ
GRANT SELECT (MANS, HOTEN, PHAI, GIOITHIEU)
ON NHASI
TO KHACHHANG

--6. Quyền xem hồ sơ bệnh 
GRANT SELECT (SODT, SOTT, NGAYKHAM, DANDO, MANS)
ON HOSOBENH
TO KHACHHANG

--7. Quyền xem hóa đơn 
GRANT SELECT
ON HOADON
TO KHACHHANG

--8. Quyền xem tên nhân viên trong hóa đơn 
GRANT SELECT(MANV, HOTEN)
ON NHANVIEN
TO KHACHHANG

--9. Quyền xem chi tiết dịch vụ
GRANT SELECT
ON CHITIETDV
TO KHACHHANG

--10. Quyền xem loại dịch vụ
GRANT SELECT
ON LOAIDICHVU
TO KHACHHANG

--11. Quyền xem chi tiết nhân thuốc trong mỗi đơn thuốc
GRANT SELECT
ON CHITIETTHUOC
TO KHACHHANG

--12. Quyền xem tên các loại thuốc
GRANT SELECT (MATHUOC, TENTHUOC, DONVITINH, CHIDINH, DONGIA, NGAYHETHAN)
ON LOAITHUOC
TO KHACHHANG

--III/ Phân quyền cho role NHASI
--1. Quyền xem, sửa trên bảng nha sĩ.
GRANT SELECT, UPDATE (HOTEN, PHAI, GIOITHIEU, MATKHAU)
ON NHASI
TO NHASI

--2. Quyền quản lý lịch rảnh.
GRANT SELECT, INSERT, DELETE, UPDATE(MACA, NGAY)
ON LICHRANH
TO NHASI

--3. Quyền xem ca
GRANT SELECT
ON CA
TO NHASI

--4. Quyền xem lịch hẹn
GRANT SELECT
ON LICHHEN
TO NHASI

--5. Quyền xem, tạo hồ sơ bệnh án của bệnh nhân
GRANT SELECT, INSERT
ON HOSOBENH
TO NHASI

--6. Quyền xem và tạo chi tiết dịch vụ
GRANT SELECT, INSERT
ON CHITIETDV
TO NHASI

--7. Quyền xem loại dịch vụ
GRANT SELECT
ON LOAIDICHVU
TO NHASI

--8. Quyền xem và tạo chi tiết thuốc
GRANT SELECT, INSERT
ON CHITIETTHUOC
TO NHASI

--9. Quyền xem loại thuốc
GRANT SELECT
ON LOAITHUOC
TO NHASI

--10. Quyền xem thông tin khách hàng
GRANT SELECT(SODT, HOTEN, PHAI, NGAYSINH, DIACHI)
ON KHACHHANG
TO NHASI

--IV/ Phân quyền cho role NHANVIEN
--1. Quyền xem, sửa thông tin nhân viên
GRANT SELECT, UPDATE(HOTEN, PHAI)
ON NHANVIEN
TO NHANVIEN

--2. Quyền xem, tạo hóa đơn
GRANT SELECT, INSERT
ON HOADON
TO NHANVIEN

--3. Quyền xem hồ sơ bệnh án
GRANT SELECT
ON HOSOBENH
TO NHANVIEN

--4. Quyền xem trên chi tiết dịch vụ
GRANT SELECT
ON CHITIETDV
TO NHANVIEN

--5. Quyền xem trên loại dịch vụ
GRANT SELECT
ON LOAIDICHVU
TO NHANVIEN

--6. Quyền xem trên chi tiết thuốc
GRANT SELECT
ON CHITIETTHUOC
TO NHANVIEN

--7. Quyền xem các loại thuốc
GRANT SELECT
ON LOAITHUOC
TO NHANVIEN

--8. Quyền xem và tạo tài khoản khách hàng
GRANT SELECT(SODT, HOTEN, PHAI, NGAYSINH, _DAKHOA), INSERT 
ON KHACHHANG
TO NHANVIEN

--9. Quyền xem thông tin nha sĩ
GRANT SELECT(MANS, HOTEN, PHAI, GIOITHIEU, _DAKHOA) 
ON NHASI
TO NHANVIEN

--10. Quyền xem,thêm, xóa lịch hẹn
GRANT SELECT, DELETE, INSERT
ON LICHHEN
TO NHANVIEN

--11. Quyền xem trên lịch rảnh của nha sĩ
GRANT SELECT
ON LICHRANH
TO NHANVIEN

--12. Quyền xem trên CA
GRANT SELECT
ON CA
TO NHANVIEN
