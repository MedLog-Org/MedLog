const mongoose = require('mongoose');
const docSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    userType:{
        type:String,
    },
    phone:{
        type:String
    },
    speciality:{
        type:String
    },
    photo:{
        type:String,
    }
})
module.exports = mongoose.model('doctor',docSchema);