const nhanvienController = {
  getnhanvien: async (req, res) => {
    try {
      res.json("getnhanvien");
    } catch (error) {
      res.json(error);
    }
  },
};
export default nhanvienController;
