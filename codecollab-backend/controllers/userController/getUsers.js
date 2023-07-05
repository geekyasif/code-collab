const User = require("../../model/userSchema");

const getUsers = async (req, res) => {
    const users = await User.find()
    res.json({data: users})
}

module.exports = getUsers