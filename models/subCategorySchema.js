const mongoose = require("mongoose")

const category = require("../models/categorySchema")

const subCategorySchema = new mongoose.Schema({
    subCategory: {
        type: String,
        unique: true
    },
})

module.exports = new mongoose.model('subCategory', subCategorySchema);