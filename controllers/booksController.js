const {
	diff_minutes, destroySession, upload
} = require("../middleware/commonHelpers/commonHelpers.js");
const Books = require("../models/booksSchema.js");
const category = require("../models/categorySchema.js");
const settings = require("../models/settingsSchema.js");
const subCategory = require("../models/subCategorySchema.js");
const path = require("path")
const fs = require("fs")

const getAllBooksDetails = async (req, res) => {
	try {
		const books = await Books.find({})
		return books
	} catch (error) {
		next(error)
	}
}


const getBookDetails = async (req, res) => {
	try {
		const bookId = req.params.id
		const bookDetails = await bookSchema.findOne({ _id: bookId })
		console.log(bookDetails);
		res.json(bookDetails)
	} catch (error) {
		next(error)
	}
}



const loadAddBook = async (req, res, next) => {
	try {
		const categories = await category.find({}, { category: 1 })
		const languages = await settings.findOne({}, { language: 1, _id: 0 })
		const vendorTypes = await settings.findOne({}, { vendorType: 1, _id: 0 })
		const pricingTypes = await settings.findOne({}, { pricingType: 1, _id: 0 })

		// Object.keys(languages.language).forEach(function (key) {
		// 	console.log(key, languages.language[key]);
		// });
		res.status(200).render("admin/registers/addBooks", {
			layout: "./layouts/adminLayout.ejs",
			message: "Add a book",
			messages: req.flash(),
			title: "Add Book",
			images: "image",
			route: "admin",
			adminName: "admin",
			category: categories,
			languages: languages,
			vendorType: vendorTypes,
			pricingType: pricingTypes,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const addBooks = async (req, res, next) => {
	console.log("inside file upload");
	console.log(req.body);
	try {
		if (req.body) {
			const obj = {
				mainImage: req.files.mainImage[0].filename,
				subImage1: req.files.subImage1[0].filename,
				subImage2: req.files.subImage2[0].filename
			}
			const keywords = [req.body.keywords]
			const newBook = new Books({
				bookTitle: req.body.bookTitle,
				bookAuthor: req.body.bookAuthor,
				ISBN: req.body.ISBN,
				bookDescription: req.body.bookDescription,
				keywords: keywords,
				pricingType: req.body.pricingType,
				price: req.body.price,
				category: req.body.category,
				subCategory: req.body.subCategory,
				vendorType: req.body.vendorType,
				vendorId: req.body.vendorId,
				processingCharge: req.body.processingCharge,
				stock: req.body.stock,
				image: obj
			});
			await newBook.save();
			console.log("images And Data uploaded  successfully");
			res.redirect("/admin/addBooks")
		} else {
			res.redirect("/admin/adminDashboard")
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};
module.exports = {
	loadAddBook,
	addBooks,
	getAllBooksDetails,
	getBookDetails

} 