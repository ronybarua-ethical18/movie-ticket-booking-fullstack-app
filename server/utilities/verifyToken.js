const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const verifyToken = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(`Bearer `)[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token", {
          errors: "Invalid/Expired token",
        });
      }
    }
    throw new AuthenticationError(
      "Authentication token must be 'Bearer [token]",
      { errors: "Authentication token must be 'Bearer [token]" }
    );
  }
  throw new AuthenticationError("Authorization Header must be provided", {
    error: "Authorization Header must be provided",
  });
};

module.exports = { verifyToken };
