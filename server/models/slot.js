const mongoose = require('mongoose');
const slotSchema = new mongoose.Schema({
    slotId:{
        type:String,
    },
    speciality:{
        type:String
    },
    docId: {
        type: String
    },
    roomNumber: {
        type: Number
    },
    slots: [{
        time: {
            type: String
        },
        status: {
            type: Boolean
        },
        patientId:{
            type:String
        }
    }],
})
module.exports = mongoose.model('slot',slotSchema);