// LIST ALL USER
const list = async (req, res, next) => {
  try {
    new ApiResponse().send(res);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  list
};
