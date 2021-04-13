const mongoose = require('mongoose')
const sortedTypeSchema = mongoose.Schema({
    wasteType:String
})
const SortedType = mongoose.model('SortedType', sortedTypeSchema);
module.exports = SortedType;