const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  trashcollection: {
    type: Schema.Types.ObjectId,
    ref: "TrashCollection",
  },
  sortedWaste: {
    type: Schema.Types.ObjectId,
    ref: "SortedWaste",
  },
  body: {
    type: String,
    default: "not available",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
  },
  createdAt: {
    type: String,
    required: true,
  },
});
module.exports = model("Task", taskSchema);
