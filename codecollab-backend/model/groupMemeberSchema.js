const mongoose = require("mongoose")

const groupMemberSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true})


module.exports = mongoose.model("GroupMember", groupMemberSchema)