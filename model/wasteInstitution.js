const { model, Schema } = require("mongoose");

const wasteInstitutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  employeeID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdZones: [
    {
      type: Schema.Types.ObjectId,
      ref: "Zone",
    },
  ],
  createdStaffs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Staff",
    },
  ],
  trashCollections: [
    {
      type: Schema.Types.ObjectId,
      ref: "TrashCollection",
    },
  ],

  sortedWastes: [
    {
      type: Schema.Types.ObjectId,
      ref: "SortedWaste",
    },
  ],
  illegalDumpings: [
    {
      type: Schema.Types.ObjectId,
      ref: "IllegalDumping",
    },
  ],

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  createdAt: String,
});

module.exports = model("WasteInstitution", wasteInstitutionSchema);
