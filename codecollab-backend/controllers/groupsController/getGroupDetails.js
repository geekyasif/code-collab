const Group = require("../../model/groupSchema")

const getGroupDetails = async (req, res) => {
   try{
    const {groupId, userId} = req.params

    const groupDetail = await Group.findOne({_id: groupId}).populate("created_by");
    res.json({data: groupDetail})
   }catch(err){
    res.json({data: err})
   }
}

module.exports = getGroupDetails