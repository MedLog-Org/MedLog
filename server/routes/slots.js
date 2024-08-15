const express = require('express');
const router = express.Router();
const doc_collection = require("../models/doctor");
const slot_collection = require("../models/slot")

router.post('/slots/doc', async (req, res) => {
    try{
        const slots = await slot_collection.find({ speciality: req.body.speciality });
        if(slots){
            const slotIds = slots.map(slot => slot.slotId);
            res.json({ success: true, message: 'List Found', slotIds });
        }
        else{
            res.json({ success: false, message: 'List Not Found' });
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/slots/doc/bookslot', async (req, res) => {
    try{
        let room = 100;
        for(let i = 101; i <= 120; i++) {
            const slot = await slot_collection.findOne({ slotId: req.body.slotId, speciality: req.body.speciality, roomNumber: i });
            if (slot == null) {
                room = i;
                break;
            }
        }

        const data = {
            slotId: req.body.slotId,
            docId: req.body.docId,
            speciality: req.body.speciality,
            roomNumber: room,
            slots: [
                { time: "", status: false, patientId: "" },
                { time: "", status: false, patientId: "" },
                { time: "", status: false, patientId: "" },
                { time: "", status: false, patientId: "" },
                { time: "", status: false, patientId: "" },
                { time: "", status: false, patientId: "" },
            ],
        };
        const timeMap = {
            "1": ["08-09", "09-10", "10-11", "11-12", "12-13", "13-14"],
            "2": ["14-15", "15-16", "16-17", "17-18", "18-19", "19-20"],
        }
        const timeSlots = timeMap[req.body.slotId];
        data.slots.forEach((slot, index) => {
            slot.time = timeSlots[index];
        });

        const slot = await slot_collection.findOneAndUpdate(
            { docId: req.body.docId, slotId: req.body.slotId },
            { $set: { roomNumber: room, slots: data.slots } },
            { new: true }
        );

        const doc = await doc_collection.findByIdAndUpdate(req.body.docId, {
            $set: {
              roomNumber: room,
              slotId: req.body.slotId
            }
        },{ new: true });

        if(slot){
            res.json({ success: true, message: 'Slot Booked', slot });
        }
        else{
            const newSlot = new slot_collection(data);
            newSlot.save();
            res.json({ success: true, message: 'Slot Booked', newSlot });
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Error in slot booking' });
    }
});

module.exports = router;