const { model, Schema } = require("mongoose");

const notificationSortedWasteSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  sortedWaste: {
    type: Schema.Types.ObjectId,
    ref: "SortedWaste",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "wasteInstitution",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: String,
    required: true,
  },
});
module.exports = model(
  "NotificationSortedWaste",
  notificationSortedWasteSchema
);
