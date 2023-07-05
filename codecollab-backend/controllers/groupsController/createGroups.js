const Group = require("../../model/groupSchema");

const createGroupsController = async (req, res) => {
  const { name, description, created_by } = req.body;

  const existing_group = await Group.findOne({ name, created_by });
  if (existing_group) {
    return res.json({ data: "already exists chane name" });
  }

  const group = new Group({
    name,
    description,
    created_by
  })

  const new_group = await group.save()

  return res.json({ data: new_group });
};

module.exports = createGroupsController;
