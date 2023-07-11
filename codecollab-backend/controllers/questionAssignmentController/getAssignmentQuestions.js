const QuestionAssignment = require("../../model/questionAssignmentSchema");
const mongoose = require("mongoose");

const getAssignmentQuestions = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const questions = await QuestionAssignment.find({ group_id: groupId })
      .populate({
        path: "group_members.user_id",
        select: "status",
      })
      .populate("question_id")
      .populate("created_by");

    console.log(questions[0].group_members);
    return res.json({ data: questions });
  } catch (err) {
    return res.json({ data: err });
  }
};

module.exports = getAssignmentQuestions;
