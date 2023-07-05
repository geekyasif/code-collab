const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    question_link: {
        type: String
    },
    tutorial_link: {
        type: String
    },
    mentor_name: {
        type: String
    },
    tags:{
       name: [string]
    },
    platform:{
        type: String
    },
    isPersonal: {
        type: Boolean
    },
    isGroup:{
        type: Boolean
    },
    group_id:{
        type: String,
    },
    is_solved: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})


module.exports = mongoose.model("Question", questionSchema)