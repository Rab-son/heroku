const { model, Schema } = require("mongoose");

const notificationTrashCollectionSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  trashcollection: {
    type: Schema.Types.ObjectId,
    ref: "TrashCollection",
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
  "NotificationTrashCollection",
  notificationTrashCollectionSchema
);
