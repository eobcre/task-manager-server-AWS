const mongoose = require('mongoose');

const assignTaskSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    userName: { type: String, required: true },
    taskName: { type: String, required: true },
    documentType: { type: String, required: true },
    assignTo: {
      userId: { type: Number, required: true },
      username: { type: String, required: true },
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AssignTask', assignTaskSchema);
