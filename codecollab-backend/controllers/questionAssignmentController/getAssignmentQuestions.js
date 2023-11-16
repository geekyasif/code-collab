const QuestionAssignment = require("../../model/questionAssignmentSchema");
const mongoose = require("mongoose");

const getAssignmentQuestions = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const questions = await QuestionAssignment.find({ group_id: groupId })
      .populate("group_members.user_id")
      .populate("question_id")
      .populate("created_by");

    return res.json({ data: questions });
  } catch (err) {
    return res.json({ data: err });
  }
};

module.exports = getAssignmentQuestions;
