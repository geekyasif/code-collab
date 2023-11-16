const mongoose = require("mongoose");

const questionAssignmentSchema = new mongoose.Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    group_members: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          default: "unsolved",
        },
      },
    ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("QuestionAssignment", questionAssignmentSchema);
