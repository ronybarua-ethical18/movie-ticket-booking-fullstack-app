const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config.js')
const tokenGenerator = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = { tokenGenerator }
