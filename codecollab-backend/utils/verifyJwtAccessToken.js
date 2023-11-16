const jwt = require("jsonwebtoken")

const verifyAccessToken = (token, cb) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, cb)
}

module.exports = verifyAccessToken