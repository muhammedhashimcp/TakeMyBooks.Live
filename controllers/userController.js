const user = require("../models/userSchema");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const { sendVerifyMail } = require("../middleware/otpMail/nodeMailer");
const { createUser, updateUser } = require("../middleware/userHelpers/userCRUD");
const { otpGenerator } = require("../middleware/otpMail/otp");
const {
    diff_minutes, destroySession
} = require("../middleware/commonHelpers/commonHelpers.js");
const userStaticController = require('../controllers/userStaticController')
const { securePassword } = require("../middleware/userHelpers/userHelpers");
const cartSchema = require("../models/cartSchema");


const userSignUp = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            errors.array().forEach((error) => {
                req.flash("error", error.msg, error.param);
            });
            res.status(200).render("user/registers/signUp", {
                messages: req.flash(),
                layout: "./layouts/registerLayout.ejs",
                admin: true,
                title: "'Register",
                action: "registerUser",
            });
        }
        const email = req.body.email;
        const userData = await user.findOne({ email: email });
        console.log(userData);
        if (userData) {
            req.flash('error', `Email already in use, Try again or Login to continue!`)
            res.redirect('/user/userSignUp')
        } else {
            console.log("after validation redirect to verify otp");
            req.session.newUser = req.body;
            req.session.userName = req.body.fullName;
            req.session.email = req.body.email;
            req.session.path = req.path
            await otpGenerator(req);
            sendVerifyMail(req.session.email, req.session.OTP);
            console.log("redirecting to verify otp");
            res.redirect("/user/verifyOtp");
        }
    } catch (error) {
        console.log(err);
        next(error);
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            errors.array().forEach((error) => {
                req.flash("error", error.msg, error.param);
            });
            res.status(200).render("user/registers/verifyOtp", {
                messages: req.flash(),
                layout: "./layouts/registerLayout.ejs",
                userName: "user",
                admin: true,
                title: "'Register",
                action: "registerUser",
            });
        }
        console.log("otp verification");
        const OtpTimeStart = req.session.OtpTimeStart;
        console.log(OtpTimeStart);
        const otpTimeEnd = new Date().getTime();
        remainingTime = await diff_minutes(OtpTimeStart, otpTimeEnd);
        console.log(remainingTime);

        if (remainingTime < 5000 && remainingTime > 0) {
            console.log("otp valid, not expired");
            const userOtp = req.body.otp;
            console.log(userOtp);
            const validOtp = req.session.OTP;
            if (userOtp == validOtp) {
                console.log(req.session.path);
                if (req.session.path === "/userSignUp") {
                    console.log("user signup");
                    const UserData = await createUser(req);
                    console.log(UserData);
                    console.log(req.session);
                    delete req.session.newUser
                    delete req.session.fullName
                    delete req.session.OTP
                    delete req.session.OtpTimeStart
                    delete req.session.email;
                    delete req.session.newUser;
                    req.session.newUser = UserData.fullName;
                    res.redirect("/user/userLogin");
                } else if (req.session.path === "/userLogin") {
                    console.log("user login");
                    res.redirect("/user/userHomePage");
                } else if (req.session.path === "/checkAccount") {
                    console.log("/ forgotPassword");
                    res.status(200).redirect("/user/resetPassword");
                } else {
                    console.log("else");
                    res.redirect("/");
                }
                return
            } else {
                req.flash('error', `invalid OTP, Try again!`)
                res.redirect('/user/verifyOtp')

            }
        } else {
            req.flash('error', `OTP expired, Try again to register!`)
            res.redirect('/user/verifyOtp')

        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const verifyUserLogin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            console.log(errors);
            errors.array().forEach((error) => {
                req.flash("error", error.msg);
            });
            res.status(200).render("user/registers/userLogin", {
                messages: req.flash(),
                layout: "./layouts/registerLayout.ejs",
                userType: "user",
                title: "'Login",
                userName: "user"
                // admin: true
            });
        }
        console.log("inside login");
        const email = req.body.email;
        const password = req.body.password
        const userData = await user.findOne({ email: email });
        if (userData) {
            const isMatch = await bcrypt.compare(password, userData.password)
            if (isMatch) {
                console.log(isMatch);
                console.log(req.session.path);
                req.session.isUserLoggedIn = true;
                req.session.user = userData.fullName
                req.session.email = userData.email
                req.session.userId = userData._id
                delete req.session.newUser
                if (req.session.path === "/userLogin") {
                    // await otpGenerator(req);
                    // sendVerifyMail(req.session.email, req.session.OTP);
                    // res.redirect("/user/verifyOtp")
                    res.redirect("/user/userHomePage");
                } else {
                    res.redirect("/user/userHomePage");
                }
                return
            }
            return
        } else {
            req.flash('error', 'invalid email or password !')
            res.status(200).redirect('/user/userLogin')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const checkAccount = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            errors.array().forEach((error) => {
                req.flash("error", error.msg);
            });
            res.status(200).render("user/registers/forgotPassword", {
                messages: req.flash(),
                layout: "./layouts/registerLayout.ejs",
                message: "Enter your email address ",
                route: "user",
                title: "Forgot password ",
                userName: "user",
            });
        }
        const email = req.body.email
        const userData = await user.findOne({ email: email });
        if (userData) {
            req.session.email = userData.email
            req.session.path = req.path
            req.session.newUser = userData
            req.session.userName = req.body.fullName;
            await otpGenerator(req);
            sendVerifyMail(req.body.email, req.session.OTP);
            res.redirect('/user/verifyOtp')
        } else {
            req.flash("error", "Account not found")
            res.redirect("/user/forgotPassword")
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const resetPassword = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            errors.array().forEach((error) => {
                req.flash("error", error.msg);
            });
            res.redirect("/user/resetPassword")
        }
        if (req.session.email) {
            const hashPassword = await securePassword(req.body.password);
            const filter = { email: req.session.email }
            const update = { password: hashPassword }
            const doc = await updateUser(filter, update)
            console.log(doc);
            res.redirect('/user/userLogin')
        } else {
            req.flash("error", "Account not found")
            res.redirect("/user/resetPassword")
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
};


const userLogout = (req, res) => {
    console.log("user session");
    req.session.destroy();
    res.redirect('/')
}

module.exports = {
    userSignUp,
    verifyOtp,
    verifyUserLogin,
    userLogout,
    checkAccount,
    resetPassword,
};
