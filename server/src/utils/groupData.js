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
                DONVITINH: item.DONVITINH,
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

const groupHSB = (data) => {
    const ketQua = {};

    data.forEach(item => {
        const key = `${item.SOTT}_${item.SODT}_${item.HOTEN}_${item.TUOI}_${item.NGAYKHAM}_${item.MANS}_${item.NHASI}_${item.DANDO}`;

        if (!ketQua[key]) {
            ketQua[key] = {
                SOTT: item.SOTT,
                SODT: item.SODT,
                HOTEN: item.HOTEN,
                TUOI: item.TUOI,
                NGAYKHAM: item.NGAYKHAM,
                MANS: item.MANS,
                NHASI: item.NHASI,
                DANDO: item.DANDO,
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
                DONVITINH: item.DONVITINH,
                THOIDIEMDUNG: item.THOIDIEMDUNG
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

const groupLich = (data) => {
    const ketQua = {};

    data.forEach(item => {
        const ngay = item.NGAY;

        if (!ketQua[ngay]) {
            ketQua[ngay] = [];
        }

        // Tìm kiếm nếu đã tồn tại ca với mã ca
        const existingCa = ketQua[ngay].find(ca => ca.MACA === item.MACA);

        // Nếu chưa tồn tại, thêm mới
        if (!existingCa) {
            ketQua[ngay].push({
                MACA: item.MACA,
                GIOBATDAU: item.GIOBATDAU,
                GIOKETTHUC: item.GIOKETTHUC,
                NHASI: [
                    {
                        MANS: item.MANS,
                        HOTENNS: item.HOTENNS,
                        SODTKH: item.SODTKH,
                        HOTENKH: item.HOTENKH,
                        SOTTLH: item.SOTTLH,
                        LYDOKHAM: item.LYDOKHAM,
                        SOTTLR: item.SOTTLR
                    }
                ]
            });
        } else {
            // Nếu đã tồn tại, thêm thông tin nha sĩ vào mã ca đó
            existingCa.NHASI.push({
                MANS: item.MANS,
                HOTENNS: item.HOTENNS,
                SODTKH: item.SODTKH,
                HOTENKH: item.HOTENKH,
                SOTTLH: item.SOTTLH,
                LYDOKHAM: item.LYDOKHAM,
                SOTTLR: item.SOTTLR
            });
        }
    });

    return Object.entries(ketQua).map(([ngay, ca]) => ({ NGAY: ngay, CA: ca }));
}

export { groupHD, groupHSB, groupLich };

