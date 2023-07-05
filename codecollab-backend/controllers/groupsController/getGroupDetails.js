const Group = require("../../model/groupSchema")

const getGroupDetails = async (req, res) => {
    const {groupId, userId} = req.params

    const groupDetail = await Group.findOne({_id: groupId, created_by: userId}).populate(
        "created_by",
        `username`
      );
    res.json({data: groupDetail})
}

module.exports = getGroupDetails