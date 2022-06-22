const mongoose = require("mongoose")


const settingsSchema = new mongoose.Schema({

    language: [{
        type: String,
        unique: true
    }],
    pricingType: [{
        type: String,
        unique: true
    }],
    vendorType: [{
        type: String,
        unique: true
    }],
    paymentOptions: [{
        type: String,
        unique: true
    }],
    deliveryMethods: [{
        type: String,
        unique: true
    }],
    services: [{
        type: String,
        unique: true
    }],
})

const Settings = new mongoose.model("settings", settingsSchema);

module.exports = Settings