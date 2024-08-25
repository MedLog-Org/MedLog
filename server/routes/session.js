const express = require('express');
const router = express.Router();
const user_collection = require("../models/user");
const doc_collection = require("../models/doctor"); 

router.get('/', async (req, res) => {
  console.log('session',req.session);
    try {
        if(req.session.loggedIn){
            let collection;
            if(req.session.userType=='patient')
              collection=user_collection;
            else if(req.session.userType=='doctor')
              collection=doc_collection;
            else
              console.log(req.session.userType);

            const user = await collection.findOne({ _id: req.session.userId });
            res.json({
              isLoggedIn: true,
              user: user
            });
            console.log(user);
        } 
        else{
            res.json({isLoggedIn: false,message: "User is not logged in"});
        } 
    } 
    catch(error){
        console.error('Error fetching user:', error);
        res.status(500).json({success: false,message: "Internal Server Error"});
    }
});

module.exports = router;
