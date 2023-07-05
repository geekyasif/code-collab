const jwt = require("jsonwebtoken");
const verifyAccessToken = require("../utils/verifyJwtAccessToken");

const authenticateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"].split(" ")[1];

  if (accessToken ===  null) {
    return res.sendStatus(401);
  }

  verifyAccessToken(accessToken, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
