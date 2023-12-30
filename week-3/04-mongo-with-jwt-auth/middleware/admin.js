const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../config");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  try {
    const token = req.headers.authorization;

    // Bearer token => ["Bearer", "token"]
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWTSecret);
    if (decodedValue.email) {
      next();
    } else {
      res.status(403).json({
        msg: "You are unauthorized admin.",
      });
    }
  } catch (e) {
    res.json({
      msg: "Incorrect inputs.",
    });
  }
}

module.exports = adminMiddleware;
