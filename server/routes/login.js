const express = require('express');
const router = express.Router();
const user_collection = require("../models/user");
const doc_collection = require("../models/doctor");

router.post('/login', async (req, res) => {
    let data;
    let collection;

    if(req.body.userType=='patient'){
        data = {
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
            name:'',
            sex:'',
            dob:'',
            bloodGroup:'',
            photo:'',
            appointments:[],
        };
        collection = user_collection;
    }
    else if(req.body.userType == 'doctor'){
        data = {
            email: req.body.email,
            password: req.body.password,
            userType:req.body.userType,
            phone:'',
            speciality:'',
            photo:'',
            roomNumber:'',
            slotId:'',
            appointments:[],
        };
        collection = doc_collection;
    }
  
    try{
        const user = await collection.findOne({ email: data.email });
        console.log('user',user);
        if(user){
            if(user.password === data.password){
                req.session.userId = user._id;
                req.session.userType = user.userType;
                req.session.loggedIn = true;
                console.log(req.session)
                res.json({ success: true, message: "Successfully Login"});
            } 
            else{
                res.json({ success: false, message: "Wrong Password" });
            }
        } 
        else{
            const newUser = new collection(data);
            await newUser.save();
            req.session.userId = newUser._id;
            req.session.userType = newUser.userType;
            req.session.loggedIn = true;
            res.json({ success: true, message: "New User Registered and Logged In"});
        }
    } 
    catch(error){
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
router.post('/google', async (req, res) => {
    console.log('Email',req.body.goolgeId);
    let data;
    let collection;

    if(req.body.userType=='patient'){
        data = {
            email: req.body.goolgeId,
            password:'',
            userType: req.body.userType,
            name:'',
            sex:'',
            dob:'',
            bloodGroup:'',
            photo:'',
            appointments:[],
        };
        collection = user_collection;
    }
    else if(req.body.userType == 'doctor'){
        data = {
            email: req.body.goolgeId,
            password: '',
            userType:req.body.userType,
            phone:'',
            speciality:'',
            photo:'',
            roomNumber:'',
            slotId:'',
            appointments:[],
        };
        collection = doc_collection;
    }
    console.log(data);
    try{
        const user = await collection.findOne({ email: data.email });
        console.log('user',user);
        if(user){
            req.session.userId = user._id;
            req.session.userType = user.userType;
            req.session.loggedIn = true;
            res.json({ success: true, message: "Successfully Login"});
        } 
        else{
            const newUser = new collection(data);
            await newUser.save();
            req.session.userId = newUser._id;
            req.session.userType = newUser.userType;
            req.session.loggedIn = true;
            res.json({ success: true, message: "New User Registered and Logged In"});
        }
    } 
    catch(error){
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
router.post('/logout', async (req, res) => {
    try{
        req.session.destroy();
        res.json({ success: true, message: "Successfully Logged Out" });
    } 
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Error logging out" });
    }
});

module.exports = router;