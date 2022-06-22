const mongoose = require("mongoose")
const db = require("../config/mongoDb");
const bcrypt = require('bcrypt')
// const books = require("../models/booksSchema")
// const cartWishGift = require("../models/cartWishGiftSchema")


const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    countryCode: {
        type: String,

    },
    phoneNumber: {
        type: Number,
        unique: true,
    },
    job: {
        type: String,

    },
    age: {
        type: Number,
    },

    address: [{
        addressType: {
            type: String,
            default: "Home Address"
        },
        address: {
            type: String,
        },
        place: {
            type: String,
        },
        buildingNumber: {
            type: String,
        },
        pinCode: {
            type: Number,

        },
        district: {
            type: String,
        },
        state: {
            type: String,
        },
    }],

    password: {
        type: String,

    },
    roll: {
        type: String,
        default: "newUser"
    },
    status: {
        type: String,
        required: true,
        default: "active"
    },
    blockStatus: {
        type: Boolean,
    },
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
    },
    orderHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
    },
    cartWishGift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartWishGift",
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
