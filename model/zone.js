const { model, Schema } = require("mongoose");

const zoneSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
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

  creator: {
    type: Schema.Types.ObjectId,
    ref: "WasteInstitution",
  },
  trashcans: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trashcan",
    },
  ],
  createdAt: {
    type: String,
    required: true,
  },
});
module.exports = model("Zone", zoneSchema);
