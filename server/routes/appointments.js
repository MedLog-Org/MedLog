const express = require('express');
const router = express.Router();
const user_collection = require("../models/user");
const doc_collection = require("../models/doctor");
const slot_collection = require("../models/slot")

router.post('/appointment/slots', async (req,res) => {
    try{
        const slots = await slot_collection.find({speciality:req.body.speciality});
        const availableSlots = [];
        const slotTimeSet = new Set();
        for(const slot of slots){
            const docId = slot.docId;
            for(const timeSlot of slot.slots){
                if (!timeSlot.status) { 
                  const slotTime = timeSlot.time;
                  if (!slotTimeSet.has(slotTime)) {
                    console.log(slotTime,docId,timeSlot.status);
                    availableSlots.push({ slotTime, docId });
                    slotTimeSet.add(slotTime);
                  }
                }
            }
        }
        res.send({ availableSlots });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/appointment/bookslot',async(req,res) => {
    console.log(req.body);
    try{
        const doc_slot = await slot_collection.findOneAndUpdate(
            { docId: req.body.docId, 'slots.time': req.body.slotTime },
            { $set: { 'slots.$.status': true, 'slots.$.patientId': req.session.userId} },
            { new: true }
        );
        const doc_data = await doc_collection.findOne({_id:req.body.docId});

        const patient_data_slot = {
            doc_name:doc_data.name,
            doc_email:doc_data.email,
            doc_phone:doc_data.phone,
            slot:req.body.slotTime,
            room_number:doc_data.roomNumber,
        }

        const patient_appointment = await user_collection.findOne({_id:req.session.userId});
        patient_appointment.appointments.push(patient_data_slot);
        patient_appointment.save();
        console.log(patient_appointment);

        const doc_data_slot ={
            user_name:patient_appointment.name,
            user_email:patient_appointment.email,
            slot:req.body.slotTime,
            dob:patient_appointment.dob,
            bloodGroup:patient_appointment.bloodGroup,
        }

        doc_data.appointments.push(doc_data_slot);
        doc_data.save();

        res.send({success:true,doc_slot});
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;