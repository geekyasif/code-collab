const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    problem_link: {
        type: String
    },
    tutorial_link: {
        type: String
    },
    mentor_name: {
        type: String
    },
    tags:{
       type: String
    },
    platform:{
        type: String
    },
    type: {
        is_personal : String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'type.is_personal'
        }
    },
    is_solved: {
        type: String,
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