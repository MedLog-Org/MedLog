const express = require('express');
const router = express.Router();
const user_collection = require("../models/user");
const doc_collection = require("../models/doctor");

router.post('/profile/user', async (req, res) => {
    const { id, name, email, sex, dob, bloodGroup } = req.body;
    try{
        const user = await user_collection.findByIdAndUpdate(id, {
            $set: {
                name: name || undefined, 
                email: email || undefined,
                sex: sex || undefined,
                dob: dob || undefined,
                bloodGroup: bloodGroup || undefined
            }
        },{ new: true });
  
        if(!user){
            res.status(404).json({success:false, message: 'User not found' });
        } 
        else{
            res.json({ success:true,message: 'User profile updated successfully' });
        }
    } 
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error updating user profile' });
    }
});
  
router.post('/profile/doc', async (req, res) => {
    const { id, name, email, phone, speciality } = req.body;
    try{
       const user = await doc_collection.findByIdAndUpdate(id, {
            $set: {
                name: name || undefined, 
                email: email || undefined,
                phone: phone || undefined,
                speciality: speciality || undefined,
            }
        },{new: true });
  
        if(!user){
            res.status(404).json({success:false, message: 'User not found' });
        } 
        else{
            res.json({ success:true,message: 'User profile updated successfully' });
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user profile' });
    }
});

module.exports = router;