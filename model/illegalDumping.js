const { model, Schema } = require("mongoose");

const illegalDumpingSchema = new Schema({
  location: {
    type: String,
    default: "not available",
  },
  latitude: {
    type: Number,
    default: 0,
  },

  longitude: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    required: true,
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
module.exports = model("IllegalDumping", illegalDumpingSchema);
