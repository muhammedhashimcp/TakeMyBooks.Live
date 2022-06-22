const express = require("express");
const router = express.Router();

const userStaticController = require('../controllers/userStaticController')
// const indexStaticController = require('../controllers/indexStaticController')
const {loadIndex} = require('../controllers/indexStaticController')



// router.get("/", indexStaticController.loadIndex)
// router.get("/userSignUp", userStaticController.loadUserSignUp)

router.get("/", loadIndex)



module.exports = router;