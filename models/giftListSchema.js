const mongoose = require('mongoose')
const giftSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    giftItems: [{
        books: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books",
        },
        quantity: {
            type: Number,
        },
        pricingType: {
            type: String,
        },
        subTotal: {
            type: Number,
            default: 0,
        },
        modifiedOn: {
            type: String,

        }
    }],
    quantity: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
)

module.exports = new mongoose.model('gift', giftSchema)