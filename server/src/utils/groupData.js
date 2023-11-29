
const groupHD = (data) => {
    const ketQua = {};

    data.forEach(item => {
        const key = `${item.HOTENKH}_${item.SODT}_${item.SOTTHD}_${item.NGAYXUAT}_${item.TONGCHIPHI}_${item.MANV}_${item.HOTENNV}_${item.DATHANHTOAN}`;

        if (!ketQua[key]) {
            ketQua[key] = {
                HOTENKH: item.HOTENKH,
                SODT: item.SODT,
                SOTTHD: item.SOTTHD,
                NGAYXUAT: item.NGAYXUAT,
                TONGCHIPHI: item.TONGCHIPHI,
                MANV: item.MANV,
                HOTENNV: item.HOTENNV,
                DATHANHTOAN: item.DATHANHTOAN,
                THUOC: [],
                DICHVU: []
            };
        }

        const existingThuoc = ketQua[key].THUOC.find(thuoc => thuoc.MATHUOC === item.MATHUOC);
        if (!existingThuoc) {
            ketQua[key].THUOC.push({
                MATHUOC: item.MATHUOC,
                TENTHUOC: item.TENTHUOC,
                SLTHUOC: item.SLTHUOC,
                DONGIATHUOC: item.DONGIATHUOC
            });
        } else {
            existingThuoc.SLTHUOC += item.SLTHUOC;
        }

        const existingDichVu = ketQua[key].DICHVU.find(dichvu => dichvu.MADV === item.MADV);
        if (!existingDichVu) {
            ketQua[key].DICHVU.push({
                MADV: item.MADV,
                TENDV: item.TENDV,
                SLDV: item.SLDV,
                DONGIADV: item.DONGIADV
            });
        } else {
            existingDichVu.SLDV += item.SLDV;
        }
    });

    return Object.values(ketQua);
}

export default groupHD;

