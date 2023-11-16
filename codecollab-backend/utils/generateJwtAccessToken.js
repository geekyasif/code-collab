const jwt = require("jsonwebtoken")

function generateJwtAccessToken (user) {
    const accessToken = jwt.sign(user.toObject(), process.env.JWT_SECRET_KEY)
    return accessToken
}

module.exports = generateJwtAccessToken