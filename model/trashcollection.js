const { model, Schema } = require("mongoose");

const trashCollectionSchema = new Schema({
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
  body: {
    type: String,
    default: "trash collection request",
  },
  typeOfWaste: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    default: "not available",
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "WasteInstitution",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: String,
});
module.exports = model("TrashCollection", trashCollectionSchema);
