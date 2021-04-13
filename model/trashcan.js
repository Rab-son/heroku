const { model, Schema } = require("mongoose");

const trashcanSchema = new Schema({
	trashcanId: {
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
	status: {
		type: Number,
		required: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "WasteInstitution",
	},
	zone: {
		type: Schema.Types.ObjectId,
		ref: "Zone",
	},
});
module.exports = model("Trashcan", trashcanSchema);
