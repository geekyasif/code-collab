const GroupMember = require("../../model/groupMemeberSchema")

const getGroupMembers = async (req, res) => {

    const {groupId, userId} = req.params

    const result = await GroupMember.find({group_id: groupId, added_by: userId}).populate("user_id", "username")
    console.log(result)
    res.json({data: result})

}

module.exports = getGroupMembers