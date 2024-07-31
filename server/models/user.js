const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
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
    sex:{
        type:String
    },
    dob:{
        type:String
    },
    bloodGroup:{
        type:String
    },
    photo:{
        type:String,
    }
})
module.exports = mongoose.model('user',userSchema);