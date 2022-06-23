const cartSchema = require("../models/cartSchema")
const wishListSchema = require("../models/wishListSchema")
const booksSchema = require("../models/booksSchema")
const booksHelpers = require("../middleware/booksHelpers/booksHelpers")
const mongoose = require("mongoose")
const { resolve } = require("path")

function convertIntoMongo_id(el) {
    return mongoose.Types.ObjectId(el)
}

const addToCart = async (req, res, next) => {
    try {
        if (req.session.userId) {
            const bookId = req.params.id
            const book = await booksSchema.findOne({ _id: bookId }, { price: 1, stock: 1 })
            const price = parseInt(book.price);
            const userCart = await cartSchema.findOne({ userId: req.session.userId })
            if (userCart) {
                const booksInCart = await cartSchema.findOne({ userId: req.session.userId }, {
                    cartItems: {
                        $elemMatch: { books: bookId }
                    }
                })
                if (booksInCart.cartItems.length !== 0 && book.stock > 0) {
                    const bookUpdated = await cartSchema.updateOne({
                        userId: req.session.userId, 'cartItems.books': bookId
                    }, {
                        $inc: {
                            'cartItems.$.quantity': 1,
                            'cartItems.$.subTotal': price,
                            'quantity': 1,
                            'total': price,
                        },
                    })
                    // const bookStockUpdated = await bookSchema.updateOne({
                    //     _id: bookId, 'cartItems.books': bookId
                    // }, {
                    //     $dec: {
                    //         'stock': 1,
                    //     },
                    // })
                } else {
                    const cartItemUpdated = await cartSchema.updateOne(
                        { userId: req.session.userId },
                        {
                            $push: { cartItems: { books: bookId, quantity: 1, subTotal: price, modifiedOn: new Date() } },
                            $inc: { quantity: 1 },
                        })
                }
                return
            } else {
                const cart = new cartSchema({
                    userId: req.session.userId,
                    cartItems: [
                        {
                            books: bookId,
                            quantity: 1,
                            subTotal: price,
                            modifiedOn: new Date()
                        }
                    ],
                    quantity: 1,
                    total: price,
                    modifiedOn: new Date(),
                })
                const cartItemCreated = await cart.save();
                return
            }
        } else {
            res.json(false)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    } finally {
        el = req.session.userId
        id = convertIntoMongo_id(el)
        const cartCount = await cartSchema.aggregate([
            { $match: { userId: id } },
            {
                $project: { count: { $size: "$cartItems" }, _id: 0 }
            }])
        res.json(cartCount[0])
    }
};


const addToWishList = async (req, res, next) => {
    try {
        if (req.session.userId) {
            const bookId = req.params.id
            bookPrice = await booksSchema.findOne({ _id: bookId }, { price: 1, _id: 0 })
            console.log(bookPrice);
            const userWishList = await wishListSchema.findOne({ userId: req.session.userId })
            if (userWishList) {
                const booksInWishList = await wishListSchema.findOne({ userId: req.session.userId }, {
                    WishListItems: {
                        $elemMatch: { books: bookId }
                    }
                })
                if (booksInWishList.wishListItems.length !== 0) {
                    const bookUpdated = await wishListSchema.updateOne({
                        userId: req.session.userId, 'WishListItems.books': bookId
                    }, {
                        $inc: {
                            'WishListItems.$.quantity': 1,
                            'wishListItems.$.subTotal': price,
                            'quantity': 1,
                            'total': price,
                        },
                    })
                    return
                } else {
                    const wishListItemUpdated = await wishListSchema.updateOne(
                        { userId: req.session.userId },
                        {
                            $push: { wishListItems: { books: bookId, quantity: 1, subTotal: price, modifiedOn: new Date() } },
                            $inc: { quantity: 1 },
                        })
                }
                res.json(true)
            } else {
                const wishList = new wishListSchema({
                    userId: req.session.userId,
                    wishListItems: [
                        {
                            books: bookId,
                            quantity: 1,
                            subTotal: bookPrice,
                            modifiedOn: new Date()
                        }
                    ],
                    quantity: 1,
                    total: bookPrice,
                    modifiedOn: new Date(),
                })
                const wishListItemCreated = await wishList.save();
                res.json(true)
            }
        } else {
            res.json(false)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};


const addToGift = async (req, res, next) => {
    try {
        if (req.session.userId) {
            const bookId = req.params.id
            bookPrice = await booksSchema.findOne({ _id: bookId }, { price: 1, _id: 0 })
            const userGift = await giftSchema.findOne({ userId: req.session.userId })
            if (userGift) {
                const booksInGift = await giftSchema.findOne({ userId: req.session.userId }, {
                    giftItems: {
                        $elemMatch: { books: bookId }
                    }
                })
                console.log(bookPrice);
                if (booksInGift.giftItems.length !== 0) {
                    const bookUpdated = await giftSchema.updateOne({
                        userId: req.session.userId, 'giftItems.books': bookId
                    }, {
                        $inc: {
                            'giftItems.$.quantity': 1,
                            'giftItems.$.subTotal': price,
                            'quantity': 1,
                            'total': price,
                        },
                    })
                    return
                } else {
                    const giftItemUpdated = await giftSchema.updateOne(
                        { userId: req.session.userId },
                        {
                            $push: { giftItems: { books: bookId, quantity: 1, subTotal: price, modifiedOn: new Date() } },
                            $inc: { quantity: 1 },
                        })
                }
                res.json(true)
            } else {
                const gift = new giftSchema({
                    userId: req.session.userId,
                    giftItems: [
                        {
                            books: bookId,
                            quantity: 1,
                            subTotal: bookPrice,
                            modifiedOn: new Date()
                        }
                    ],
                    quantity: 1,
                    total: bookPrice,
                    modifiedOn: new Date(),
                })
                const GiftItemCreated = await gift.save();
                res.json(true)
            }
        } else {
            res.json(false)
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const getAllCount = async (req, res) => {
    try {
        const cartCount = await cartSchema.findOne({ userId: req.session.userId }, { quantity: 1, _id: 0 })
        console.log(cartCount);

    } catch (error) {
        next(error)

    }
}



module.exports = {
    addToCart,
    addToWishList,
    addToGift,
    getAllCount,

}