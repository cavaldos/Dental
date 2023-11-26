const nhasiController = {
  getNhasi: async (req, res) => {
    try {
      res.json("getnhasi");
    } catch (error) {
      res.json(error);
    }
  },
};
export default nhasiController;
