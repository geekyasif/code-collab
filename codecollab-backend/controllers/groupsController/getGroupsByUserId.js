const Group = require("../../model/groupSchema");

const getGroupsByUserId = async (req, res) => {
  try{
    const user_id = req.params.userId;

  const groups = await Group.find({ created_by: user_id }).populate(
    "created_by",
    `username`
  );

  if (!groups) {
    return res.json({ data: "No groups found!" });
  }

  return res.json({ data: groups });
  }catch(err){
    return res.json({ data: err });
  }
};

module.exports = getGroupsByUserId;
