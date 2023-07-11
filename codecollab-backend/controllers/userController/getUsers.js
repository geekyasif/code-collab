const User = require("../../model/userSchema");

const getUsers = async (req, res) => {
    try{
        const users = await User.find()
    res.json({data: users})
    }catch(err){
        res.json({data: err})
    }
}

module.exports = getUsers