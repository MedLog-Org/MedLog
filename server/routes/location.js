const express = require('express');
const router = express.Router();
const axios = require('axios');
const ip_collection = require("../models/ip");

router.post('/location', async (req, res) => {
    try {
        const { ip_address, latitude, longitude, location_permission } = req.body;

        if (!ip_address) {
            return res.status(400).json({ message: "IP address required" });
        }

        console.log("Received Data:", req.body);

        // Get geo data from IP
        const geoResponse = await axios.get(
            `http://ip-api.com/json/${ip_address}`
        );

        const geoData = geoResponse.data;

        if (geoData.status !== "success") {
            return res.status(400).json({ message: "Invalid IP" });
        }

        // Create DB object
        const new_ip = new ip_collection({
            ip_address,
            ip_geo_data: geoData,          // full IP geo data
            latitude: latitude || null,    // user location (if allowed)
            longitude: longitude || null,
            location_permission: location_permission || "unknown"
        });

        await new_ip.save();
        console.log("IP saved:", new_ip);
        res.status(200).json({
            message: "IP saved with geo + permission data",
            data: new_ip
        });

    } catch (error) {
        console.log("Geo Error:", error.response?.data || error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
