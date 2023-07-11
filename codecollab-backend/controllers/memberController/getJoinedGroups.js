const GroupMember = require("../../model/groupMemeberSchema")

const getJoinedGroups = async (req, res) => {
    try{
        const {userId} = req.params;

        const result = await GroupMember.find({$and: [{user_id: userId}, {added_by: {$ne: userId}}]}).populate(["user_id", "group_id", "added_by"])
        res.json({data: result})

    }catch(err){
        console.log(err)
        res.json({error: err})
    }
    
}

module.exports = getJoinedGroups