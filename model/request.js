const mongoose = require('mongoose')
const requestCollectionSchema = mongoose.Schema({
    areaname:String,
    wasteInstitutionID:String
})

const Request = mongoose.model('Request', requestCollectionSchema);
module.exports = Request;
