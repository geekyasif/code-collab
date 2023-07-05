const GroupMember = require("../../model/groupMemeberSchema")

const addMember = async (req, res) => {

    const {member_id, group_id, user_id: admin} = req.body;

    const present = await GroupMember.findOne({user_id: member_id, added_by: admin, group_id: group_id})

    if(present){
        return res.json({data: "already present"})
    }

    const addNewMember = await new GroupMember({
        user_id: member_id,
        group_id: group_id,
        added_by: admin
    })

    const result = await addNewMember.save()


    res.json({data: result})

}


module.exports = addMember