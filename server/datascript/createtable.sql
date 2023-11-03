-- Tạo login
CREATE LOGIN loginA WITH PASSWORD = 'password123';
CREATE LOGIN loginB WITH PASSWORD = 'password123';  
CREATE LOGIN loginC WITH PASSWORD = 'password123';
CREATE LOGIN loginD WITH PASSWORD = 'password123';
CREATE LOGIN loginE WITH PASSWORD = 'password123';

-- Tạo user cho mỗi login
CREATE USER userA FOR LOGIN loginA;
CREATE USER userB FOR LOGIN loginB;
CREATE USER userC FOR LOGIN loginC;  
CREATE USER userD FOR LOGIN loginD;
CREATE USER userE FOR LOGIN loginE;

-- Tạo các nhóm quyền
CREATE ROLE Developers;
CREATE ROLE Leaders;
CREATE ROLE Users;

-- Gán quyền cho các nhóm



-- Gán user vào các nhóm  
EXEC sp_addrolemember 'Developers', 'userA';
EXEC sp_addrolemember 'Developers', 'userB';
EXEC sp_addrolemember 'Leaders', 'userC';
EXEC sp_addrolemember 'Users', 'userD';

-- Cấp quyền thêm cho user
GRANT CREATE PROCEDURE, ALTER PROCEDURE TO userA;

GRANT SELECT ON dbo.Table TO userD WITH GRANT OPTION;


------------------------------------------------------------------------------------------------------------------------

--Bước 1: tạo các login
exec sp_addLogin 'LoginA','LoginA'
exec sp_addLogin 'LoginB','LoginB'

exec sp_addLogin 'LoginC','LoginC'
--Bước 2: Tạo các user tương ứng
Create User userA For Login LoginA
Create User userB For Login LoginB
Create User userC For Login LoginC

--Tạo role
 --Roles are database-level securables
exec sp_addrole 'Dev'
exec sp_addrolemember 'Dev','userB'
--grant select, insert to dev
grant select, insert on Human.NhanVien to Dev
grant create procedure, create function on Human.NhanVien to userC

--logout và login với acc LoginB
select * from Human.Nhanvien
--lỗi không có quyền showplan
GRANT SHOWPLAN TO userB
GO
--select * from Human.NhanVien thực hiện thành công.

--add userA vào role db_owner, cho phép tạo csdl
exec sp_addrolemember 'db_owner','userA'