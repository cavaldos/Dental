const onlineController = {
  signin: async (req, res) => {
    try {
      res.json(" online");
    } catch (error) {
      res.json(error);
    }
  },
  signup: async (req, res) => {
    try {
      res.json(" online");
    } catch (error) {
      res.json(error);
    }
  }

};
export default onlineController;
