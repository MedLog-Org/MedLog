const express = require('express');
const router = express.Router();
const axios = require('axios');
const ip_collection = require("../models/ip");

router.post('/location', async (req, res) => {
    try {
        const { ip_address } = req.body;

        if (!ip_address) {
            return res.status(400).json({ message: "IP address required" });
        }

        console.log("Received IP:", ip_address);

        // 🔎 Check if already exists
        const existing = await ip_collection.findOne({ ip_address });

        if (existing) {
            console.log("IP already exists in DB:", ip_address);  
            return res.status(200).json({
                message: "IP already stored",
                data: existing
            });
        }


        // 🌍 Call API
        const geoResponse = await axios.get(
            `http://ip-api.com/json/${ip_address}`
        );

        const geoData = geoResponse.data;

        console.log("Geo Data:", geoData);

        if (geoData.status !== "success") {
            return res.status(400).json({ message: "Invalid IP" });
        }

        // 💾 Save everything
        const new_ip = new ip_collection({
            ip_address,
            ...geoData
        });


        await new_ip.save();

        res.status(200).json({
            message: "IP saved with full geo data",
            data: new_ip
        });

    } catch (error) {
        console.log("Geo Error:", error.response?.data || error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});




module.exports = router;
