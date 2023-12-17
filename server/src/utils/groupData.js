const convertBackToDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11, cộng thêm 1
    const year = dateObject.getFullYear();
  
    // Định dạng ngày tháng
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  
    return formattedDate;
};

const convertToTime = (inputDate) => {
    const dateObject = new Date(inputDate);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
  
    // Định dạng giờ
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return formattedTime;
};

const groupHD = (data) => {
    const ketQua = {};

    data.forEach(item => {
        const key = `${item.HOTENKH}_${item.SODT}_${item.SOTTHD}_${item.NGAYXUAT}_${item.TONGCHIPHI}_${item.MANV}_${item.HOTENNV}_${item.DATHANHTOAN}`;

        if (!ketQua[key]) {
            ketQua[key] = {
                HOTENKH: item.HOTENKH,
                SODT: item.SODT,
                SOTTHD: item.SOTTHD,
                NGAYXUAT: convertBackToDate(item.NGAYXUAT),
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
        const key = `${item.SOTT}_${item.SODT}_${item.HOTEN}_${item.TUOI}_${item.NGAYKHAM}_${item.MANS}_${item.NHASI}_${item.DANDO}_${item.DAXUATHOADON}`;

        if (!ketQua[key]) {
            ketQua[key] = {
                SOTT: item.SOTT,
                SODT: item.SODT,
                HOTEN: item.HOTEN,
                TUOI: item.TUOI,
                NGAYKHAM: convertBackToDate(item.NGAYKHAM),
                MANS: item.MANS,
                NHASI: item.NHASI,
                DANDO: item.DANDO,
                DAXUATHOADON: item.DAXUATHOADON,
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
        const ngay = convertBackToDate(item.NGAY);

        if (!ketQua[ngay]) {
            ketQua[ngay] = [];
        }

        // Tìm kiếm nếu đã tồn tại ca với mã ca
        const existingCa = ketQua[ngay].find(ca => ca.MACA === item.MACA);

        // Nếu chưa tồn tại, thêm mới
        if (!existingCa) {
            ketQua[ngay].push({
                MACA: item.MACA,
                GIOBATDAU: convertToTime(item.GIOBATDAU),
                GIOKETTHUC: convertToTime(item.GIOKETTHUC),
                NHASI: [
                    {
                        MANS: item.MANS,
                        HOTENNS: item.HOTENNS,
                        SODTKH: item.SODTKH || null,
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
                SODTKH: item.SODTKH || null,
                HOTENKH: item.HOTENKH,
                SOTTLH: item.SOTTLH,
                LYDOKHAM: item.LYDOKHAM,
                SOTTLR: item.SOTTLR
            });
        }
    });

    return Object.entries(ketQua).map(([ngay, ca]) => ({ NGAY: ngay, CA: ca }));
}

const groupTableLich = (data) => {
    const ketQua = {};
    const allMaca = ["CA001", "CA002", "CA003", "CA004", "CA005", "CA006"];
    const gioBatDau = ["09:00:00", "11:00:00", "13:00:00", "15:00:00", "17:00:00", "19:00:00"];
    const gioKetThuc = ["11:00:00", "13:00:00", "15:00:00", "17:00:00", "19:00:00", "21:00:00"];

    data.forEach(item => {
        const ngay = convertBackToDate(item.NGAY);

        if (!ketQua[ngay]) {
            ketQua[ngay] = [];
        }

        // Tìm kiếm nếu đã tồn tại ca với mã ca
        const existingCa = ketQua[ngay].find(ca => ca.MACA === item.MACA);

        // Nếu chưa tồn tại, thêm mới
        if (!existingCa) {
            const macaIndex = allMaca.indexOf(item.MACA);

            ketQua[ngay].push({
                MACA: item.MACA,
                GIOBATDAU: gioBatDau[macaIndex],
                GIOKETTHUC: gioKetThuc[macaIndex],
                STATUS: item.STATUS,
                MANS: item.MANS,
                HOTENNS: item.TEN_KHACH,
                SODTKH: item.SDT_KHACH,
                HOTENKH: item.HOTENKH,
                SOTTLH: item.SOTT,
                LYDOKHAM: item.LYDOKHAM,
                SOTTLR: item.SOTTLR
            });
        }
    });

    // Thêm các ca "empty" cho những ca còn thiếu
    Object.keys(ketQua).forEach(ngay => {
        const existingMaca = ketQua[ngay].map(ca => ca.MACA);
        const missingMaca = allMaca.filter(maca => !existingMaca.includes(maca));

        missingMaca.forEach(maca => {
            const macaIndex = allMaca.indexOf(maca);

            ketQua[ngay].push({
                MACA: maca,
                GIOBATDAU: gioBatDau[macaIndex],
                GIOKETTHUC: gioKetThuc[macaIndex],
                STATUS: "empty",
            });
        });

        // Sắp xếp mảng CA theo thứ tự mã ca
        ketQua[ngay].sort((ca1, ca2) => allMaca.indexOf(ca1.MACA) - allMaca.indexOf(ca2.MACA));
    });

    return Object.entries(ketQua).map(([ngay, ca]) => ({ NGAY: ngay, CA: ca }));
}

const mergeLich = (lichChuaDat, lichDaDat) => {
    const mergedLich = [];
  
    // Duyệt qua mảng lịch chưa đặt
    lichChuaDat.forEach(lichNgayChuaDat => {
      // Tìm kiếm ngày tương ứng trong mảng lịch đã đặt
      const lichNgayDaDat = lichDaDat.find(lichNgay => lichNgay.NGAY === lichNgayChuaDat.NGAY);
  
      if (lichNgayDaDat) {
        // Nếu đã có lịch đã đặt trong ngày, gộp lại thành một mảng chung
        const mergedNgay = {
          NGAY: lichNgayChuaDat.NGAY,
          CA: mergeCa(lichNgayChuaDat.CA, lichNgayDaDat.CA)
        };
  
        mergedLich.push(mergedNgay);
      } else {
        // Nếu không có lịch đã đặt trong ngày, giữ nguyên lịch chưa đặt
        mergedLich.push(lichNgayChuaDat);
      }
    });
  
    // Thêm vào mảng lịch đã đặt những ngày chưa có trong mảng lịch chưa đặt
    lichDaDat.forEach(lichNgayDaDat => {
      const ngayChuaDat = mergedLich.find(lichNgay => lichNgay.NGAY === lichNgayDaDat.NGAY);
  
      if (!ngayChuaDat) {
        mergedLich.push(lichNgayDaDat);
      }
    });
  
    return mergedLich;
  };
  
  const mergeCa = (caChuaDat, caDaDat) => {
    const mergedCa = [...caChuaDat];
  
    caDaDat.forEach(caDaDatItem => {
      const existingCa = mergedCa.find(caChuaDatItem => caChuaDatItem.MACA === caDaDatItem.MACA);
  
      if (existingCa) {
        // Nếu đã có ca trong lịch chưa đặt, thêm thông tin nha sĩ vào mã ca đó
        existingCa.NHASI.push(...caDaDatItem.NHASI);
      } else {
        // Nếu chưa có ca trong lịch chưa đặt, thêm mới ca đó vào lịch chưa đặt
        mergedCa.push(caDaDatItem);
      }
    });
  
    return mergedCa;
  };
export { groupHD, groupHSB, groupLich, groupTableLich, mergeLich };

