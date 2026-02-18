const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
    ip_address: String,
    ip_geo_data: Object,
    latitude: Number,
    longitude: Number,
    location_permission: {
        type: String,
        enum: ["granted", "denied", "unsupported", "unknown"],
        default: "unknown"
    }
}, { timestamps: true });

module.exports = mongoose.model("ip_collection", ipSchema);
