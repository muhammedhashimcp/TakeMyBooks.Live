const express = require("express");
const router = express.Router();
const path = require('path')
const { checkSchema } = require("express-validator");
const {
    loginDataValidation, adminDataValidation
} = require("../middleware/expressValidator/loginValidation");

const adminController = require('../controllers/adminController')
const adminStaticController = require('../controllers/adminStaticController')
const adminAJAXController = require('../controllers/adminAJAXController')

const booksController = require('../controllers/booksController')
const {
    upload
} = require("../config/multerConfig.js");

router.get("/", adminStaticController.adminLoginLoad)
router.post("/adminLogin", checkSchema(adminDataValidation), adminController.verifyAdmin)
router.get("/adminDashboard", adminStaticController.loadAdminDashboard)

router.get("/allUsers", adminStaticController.loadAllUsers)
router.get("/addUser", adminStaticController.loadAddUsers)
// router.post("/addUser", userController.newUser)

router.get("/editUser/:id", adminStaticController.loadEditUser)
router.post("/editUser/:id", adminController.editUser)
router.get("/deleteUser/:id", adminController.deleteUser)
router.get("/search", adminController.search)
router.get("/blockUser/:id", adminController.blockUser)

// router.get("/contactUser/user-contact/:id", adminController.loadContactUser)
// router.post("/contactUser/user-contact/:id", adminController.contactUser)
// router.get("/allBooks", adminController.loadAllBooks)
// router.get("/editBooks/books-edit/:id", adminController.loadEditBooks)
// router.post("/editBooks/books-edit/:id", adminController.loadUpdateBooks)

router.get("/addBooks", booksController.loadAddBook)
router.post("/addBooks", upload.fields([{ name: "mainImage", maxCount: 1 }, { name: "subImage1", maxCount: 1 }, { name: "subImage2", maxCount: 1 }]), booksController.addBooks)


// router.get("/viewOrders", adminController.loadViewOrders)
// router.post("/addOrders", adminController.addOrders)
// router.get("/editOrders", adminController.loadEditOrders)
// router.post("/editOrders", adminController.loadUpdateOrders)
//ajax  

router.get("/settings", adminStaticController.loadAdminSettings)
router.post("/addCategory", adminAJAXController.addCategory)
router.get("/deleteCategory/:id", adminAJAXController.deleteCategory)
router.post("/addSubCategory/:id", adminAJAXController.addSubCategory)
router.get("/displaySubCategory/:id", adminAJAXController.displaySubCategory)
router.post("/deleteSubCategory/:id", adminAJAXController.deleteSubCategory)
router.post("/addLanguage", adminAJAXController.addLanguage)
router.post("/addPricingType", adminAJAXController.addPricingType)
router.post("/addVendorType", adminAJAXController.addVendorType)

router.get("/adminLogout", adminController.adminLogout)

module.exports = router;