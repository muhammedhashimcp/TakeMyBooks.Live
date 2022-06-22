const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    cartWishGift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartWishGift",
    },
    price: {
        type: Number,
        required: true
    },
    pricingType: {
        type: string

    },
    paymentMethod: {
        type: string
    },
    paymentDetails: {
        type: string

    },
    status: {
        type: string,

    },
    deliveryStatus: {
        type: string,
    },
    subtotal: {
        type: Number,
        default: 0
    },
    shipping: {
        type: Number,
        default: 50,
    },
    price: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        default: 0,
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})



const Orders = new mongoose.model("order", orderSchema);

module.exports = Orders;