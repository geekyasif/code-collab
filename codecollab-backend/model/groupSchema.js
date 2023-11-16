const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},{timestamp: true});

module.exports = mongoose.model("Group", groupSchema)
