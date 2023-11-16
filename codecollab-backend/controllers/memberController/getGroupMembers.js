const GroupMember = require("../../model/groupMemeberSchema")

const getGroupMembers = async (req, res) => {

   try{
    const {groupId, userId} = req.params

    const result = await GroupMember.find({group_id: groupId}).populate("user_id", "username")
    console.log(result)
    res.json({data: result})
   }catch(err){
    res.json({data: err})
   }

}

module.exports = getGroupMembers