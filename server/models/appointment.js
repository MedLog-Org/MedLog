const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    speciality:{
        type:String
    },
    slots: [{
        time: {
            type: String
        },
        docName: {
            type: String
        },
        roomNumber: {
            type: String
        },
        status: {
            type: Boolean
        }
    }],
})
module.exports = mongoose.model('appointment',appointmentSchema);