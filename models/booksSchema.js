const mongoose = require("mongoose")

const { settings } = require("../models/settingsSchema")

const booksSchema = new mongoose.Schema({

    bookTitle: {
        type: String,
        unique: true
    },
    bookAuthor: {
        type: String,

    },
    ISBN: {
        type: String,
        unique: true
    },
    TakeMyBooksNo: {
        type: Number,
        unique: true
    },
    bookDescription: {
        type: String,

    },
    keywords: [
        String,
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'settings.category',

    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'settings.subCategory',
    },
    pricingType: {
        type: String,

    },
    vendorType: {
        type: String,

    },
    vendorId: {
        type: Number,

    },
    pricingType: {
        type: String,

    },
    price: {
        type: Number,

    },
    processingCharge: {
        type: String,

    },
    stock: {
        type: Number,
        min: 0,
        max: 255
    },
    createdDate: {
        type: Number,
        min: 0,
        max: 255
    },
    image: {
        type: Array,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Books = new mongoose.model("books", booksSchema);
module.exports = Books;