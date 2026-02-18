const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
    ip_address: {
        type: String,
        required: true,
    },
    status: String,
    country: String,
    countryCode: String,
    region: String,
    regionName: String,
    city: String,
    zip: String,
    lat: Number,
    lon: Number,
    timezone: String,
    isp: String,
    org: String,
    as: String,
    query: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ip_collection", ipSchema);
