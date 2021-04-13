const { model, Schema } = require("mongoose");

const languageSchema = new Schema({
  english: {
    type: String,
    required: true,
  },
  chichewa: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: String,
});
module.exports = model("Language", languageSchema);
