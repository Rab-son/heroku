const { model, Schema } = require("mongoose");

const sortedWasteSchema = new Schema({
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
  body: {
    type: String,
    default: "sorted waste",
  },
  typeOfWaste: {
    type: String,
    default: "not available",
  },
  price: {
    type: Number,
    default: 0,
  },
  amount: {
    type: String,
    default: 0,
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
module.exports = model("SortedWaste", sortedWasteSchema);
