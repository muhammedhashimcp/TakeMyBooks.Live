const booksController = require("../controllers/booksController")
const userController = require("../controllers/userController")
const cartSchema = require("../models/cartSchema")
const wishListSchema = require("../models/wishListSchema")
const userSchema = require("../models/userSchema")

const mongoose = require("mongoose")




function convertIntoMongo_id(el) {
	return mongoose.Types.ObjectId(el)
}

const loadUserSignUp = (req, res) => {
	try {
		if (req.session.newUser) {
			res.redirect("/verifyOtp");
		} else if (req.session.user) {
			res.redirect("/user/userHomepage");
		} else {
			res.status(200).render("user/registers/signUp", {
				messages: req.flash(),
				title: "User Registration",
				action: "registerUser",
				layout: "./layouts/registerLayout.ejs",
				adminName: "user",
				routeName: "user",
			});
		}
	} catch (error) {
		console.log(error);
		next(error)
	}
};

const loadVerifyOtp = (req, res, next) => {
	try {
		console.log(req.session.path);
		if (req.session.path === "/userSignUp" || req.session.path === "/userLogin" || req.session.path === "/checkAccount") {
			res.status(200).render("user/registers/verifyOtp.ejs", {
				messages: req.flash(),
				title: "OTP Verification",
				layout: "./layouts/registerLayout.ejs",
				action: "registerUser",
				userName: req.session.fullName,
			});
		} else if (req.session.user) {
			res.redirect("/userHomepage");
		} else {
			res.redirect("/user/userSignUp");
		}
	} catch (error) {
		console.log(error);
		next(error)
	}
};

const loadUserLogin = (req, res, next) => {
	try {
		if (req.session.path === "/userSignUp") {
			res.status(200).render("user/registers/userLogin", {
				layout: "./layouts/registerLayout.ejs",
				messages: req.flash(),
				userType: "newUser",
				userName: "user",
				title: "User Login",
				username: req.session.fullName,
			});

		} else if (req.session.user) {
			res.redirect("/user/userHomepage");

		} else {
			req.session.path = req.path
			res.status(200).render("user/registers/userLogin", {
				layout: "./layouts/registerLayout.ejs",
				userType: "user",
				userName: "user",
				// username:"newUser",
				// action: "registerUser",
				title: " Login",
			});

		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};




const loadUserHomePage = async (req, res, next) => {
	try {
		console.log(req.session.userId);
		const user = req.session.user
		if (req.session.userId) {
			const books = await booksController.getAllBooksDetails()
			const userListCount = []
			el = req.session.userId
			id = convertIntoMongo_id(el)
			const cartCount = await cartSchema.aggregate([
				{ $match: { userId: id } },
				{
					$project: { count: { $size: "$cartItems" }, _id: 0 }
				}])
			userListCount.push(cartCount[0])
			res.status(200).render("user/userHomePage", {
				route: "user",
				title: "TakeMyBooks",
				userName: user,
				books: books,
				listCount: userListCount
			});
		} else {
			res.redirect("/");
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const loadForgotPassword = (req, res, next) => {
	try {

		res.status(200).render("user/registers/forgotPassword", {
			layout: "./layouts/registerLayout.ejs",
			message: "Enter your email address ",
			messages: req.flash(),
			title: "Forgot password ",
			userName: "user",
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const loadResetPassword = (req, res, next) => {
	try {
		const email = req.session.email
		res.status(200).render("user/registers/resetPassword", {
			layout: "./layouts/registerLayout.ejs",
			email: email,
			messages: req.flash(),
			link: req.flash(),
			route: "user",
			title: "Reset Password ",
			userName: "user",
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const loadShowCart = async (req, res, next) => {
	try {
		id = req.session.userId
		const user = await userSchema.findOne({ _id: req.session.userId })
		if (req.session.userId) {
			const cart = await cartSchema.findOne(
				{ userId: id }
			)
			console.log(cart);
			res.status(200).render("tables/userCart", {
				layout: "./layouts/registerLayout.ejs",
				route: "user",
				title: "cart",
				user: user,
				data: cart,
				route: "list"

			});
		} else {
			res.redirect("/user/userHomepage");
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const loadCheckout = async (req, res, next) => {
	try {
		id = req.session.userId
		const user = await userSchema.findOne({ _id: req.session.userId })
		if (req.session.userId) {
			const cart = await cartSchema.findOne(
				{ userId: id }
			)
			console.log(cart);
			res.status(200).render("tables/checkOut", {
				layout: "./layouts/registerLayout.ejs",
				route: "user",
				title: "cart",
				user: user,
				data: cart,
				route: "list"

			});
		} else {
			res.redirect("/user/userHomepage");
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};


module.exports = {
	loadUserSignUp,
	loadVerifyOtp,
	loadUserLogin,
	loadUserHomePage,
	loadForgotPassword,
	loadResetPassword,
	loadShowCart,
	loadCheckout
};

