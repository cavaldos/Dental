const khachhangController = {
    getKhachHang: async (req, res) => {
        try {
            res.json('getKhachHang');
        } catch (error) {
            res.json(error);
        }
    }
    
}
export default khachhangController; 