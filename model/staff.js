const { model, Schema } = require("mongoose");

const staffSchema = new Schema({
  employeeID: {
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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "BASIC",
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "WasteInstitution",
  },
  zone: {
    type: Schema.Types.ObjectId,
    ref: "Zone",
    default: null,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = model("Staff", staffSchema);
