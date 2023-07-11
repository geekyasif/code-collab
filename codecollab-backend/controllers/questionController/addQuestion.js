const Question = require("../../model/questionSchema");
const User = require("../../model/userSchema");
const QuestionAssignment = require("../../model/questionAssignmentSchema");
const GroupMember = require("../../model/groupMemeberSchema");

const addQuestion = async (req, res) => {
  try {
    const newQuestion = await new Question({
      title: req.body.title,
      problem_link: req.body.problem_link,
      tutorial_link: req.body.tutorial_link,
      mentor_name: req.body.mentor_name,
      tags: req.body.tags,
      platform: req.body.platform,
      type: {
        is_personal: req.body.type.is_personal,
        id: req.body.type.id,
      },
      is_solved: req.body.is_solved,
      description: req.body.description,
      created_by: req.body.created_by,
    });

    const question = await newQuestion.save();

    if (req.body.type.is_personal === "Group") {
      const groupId = req.body.type.id;

      const group_members = await GroupMember.find(
        { group_id: groupId },
        { user_id: 1, _id: 0 }
      );

      const group_members_ids = group_members.map((member) => member.user_id)

      const questionAssignment = new QuestionAssignment({
        question_id: question._id,
        group_id: groupId,
        group_members: group_members_ids.map((memberId) => ({
          user: memberId,
          status: "unsolved",
        })),
      });
    
      const result = await questionAssignment.save();
    
      return res.json({ data: result });
    }

    return res.json({ data: question });
  } catch (err) {
    return res.json({ data: err });
  }
};

module.exports = addQuestion;
