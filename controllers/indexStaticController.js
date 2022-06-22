const nextTick = require("next-tick");

const Books = require("../models/booksSchema");

const loadIndex = async (req, res, next) => {
	try {
		console.log(req.session.user);
		if (req.session.user) {
			res.redirect("/user/userHomePage");
		} else {
			const books = await Books.find({})
			console.log(books);
			books.forEach(element => {
				console.log(element.image[0].mainImage);
			});
			res.render("index/landingPage", {
				title: "Landing Page",
				layout: "./layouts/landingLayout.ejs",
				books: books
			});
			// res.redirect("/user/userHomePage");
		}
	} catch (error) {
		console.log(error);
		next(error)
	}
};

module.exports = {
	loadIndex,
}