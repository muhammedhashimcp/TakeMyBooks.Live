const express = require("express");
const router = express.Router();
// const path = require('path')

const userController = require('../controllers/userController')
const booksController = require('../controllers/booksController')
const userStaticController = require('../controllers/userStaticController')
const userAJAXController = require('../controllers/userAJAXController')

const { checkSchema } = require("express-validator");
const {
    userDataValidation, checkEmail, checkPasswords
} = require("../middleware/expressValidator/userValidation");
const {
    loginDataValidation
} = require("../middleware/expressValidator/loginValidation");
const {
    otpValidation
} = require("../middleware/expressValidator/otpValidation")


//user routes 
router.get("/userSignUp", userStaticController.loadUserSignUp)
router.post("/userSignUp", checkSchema(userDataValidation), userController.userSignUp)
router.get("/verifyOtp", userStaticController.loadVerifyOtp)
router.post("/verifyOtp", checkSchema(otpValidation), userController.verifyOtp)
router.get("/userLogin", userStaticController.loadUserLogin)
router.post("/userLogin", checkSchema(loginDataValidation), userController.verifyUserLogin)
router.get("/userHomepage", userStaticController.loadUserHomePage)

router.get("/forgotPassword", userStaticController.loadForgotPassword)
router.post("/checkAccount", checkSchema(checkEmail), userController.checkAccount)
router.get("/resetPassword", userStaticController.loadResetPassword)
router.post("/resetPassword", checkSchema(checkPasswords), userController.resetPassword)
// router.post("/editUser/user-edit/:id", userController.loadUpdateUser)
// router.get("/blockUser/user-blockUpdate/:id", userController.blockUpdateUser)
// router.get("/contactUser/user-contact/:id", userController.loadContactUser)
// router.post("/contactUser/user-contact/:id", userController.contactUser)
router.get("/addToCart/:id", userAJAXController.addToCart)
router.get("/addToGift/:id", userAJAXController.addToGift)
router.get("/addToWishList/:id", userAJAXController.addToWishList)
router.get("/getAllCount", userAJAXController.getAllCount)
router.get("/getBooksDetails/:id", booksController.getBookDetails)
// router.get("/allBooks", userController.loadAllBooks)
// router.get("/addBooks", userController.loadAddBooks)
// router.post("/addBooks", userController.addBooks)
// router.get("/editBooks/books-edit/:id", userController.loadEditBooks)
// router.post("/editBooks/books-edit/:id", userController.loadUpdateBooks)

// router.get("/contactUser/user-contact/:id", userController.loadContactUser)
// router.post("/contactUser/user-contact/:id", userController.contactUser)

// router.get("/viewOrders", userController.loadViewOrders)
// router.post("/addOrders", userController.addOrders)
// router.get("/editOrders", userController.loadEditOrders)
// router.post("/editOrders", userController.loadUpdateOrders)

router.get("/userLogout", userController.userLogout)
module.exports = router;