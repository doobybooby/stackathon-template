const { models: {User} } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.headers)
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};