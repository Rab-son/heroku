const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  nationalID: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  pin: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  blocked: {
    type: Boolean,
    required: true,
  },
  trashCollectionNofications: [
    {
      type: Schema.Types.ObjectId,
      ref: "NotificationTrashCollection",
    },
  ],
  sortedwasteNofications: [
    {
      type: Schema.Types.ObjectId,
      ref: "NotificationSortedWaste",
    },
  ],
  createdAt: {
    type: String,
    required: true,
  },
});
module.exports = model("User", userSchema);
