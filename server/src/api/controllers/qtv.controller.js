const qtvController = {
  getqtv: async (req, res) => {
    try {
      res.json("getqtv");
    } catch (error) {
      res.json(error);
    }
  },
};
export default qtvController;
