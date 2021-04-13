const model = require('mongoose').model;
const Schema = require('mongoose').Schema;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: 'WasteInstitution',
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = model('Review', reviewSchema);