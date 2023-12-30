const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../config");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  try {
    const token = req.headers.authorization;

    // Bearer token => ["Bearer", "token"]
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWTSecret);
    if (decodedValue.email) {
      req.email = decodedValue.email;
      next();
    } else {
      res.status(403).json({
        msg: "You are unauthorized user.",
      });
    }
  } catch (e) {
    res.json({
      msg: "Incorrect inputs.",
    });
  }
}

module.exports = userMiddleware;
