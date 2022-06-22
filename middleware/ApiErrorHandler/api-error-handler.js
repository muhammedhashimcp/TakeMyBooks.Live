const ApiError = require('./ApiError');

function apiErrorHandler(err, req, res, next) {
    // in prod, don't use console.log or console.err because
    // it is not async
    // console.error(err);

    // console.log("req.path: " + req.path, "  req.method: " + req.method, "   req.url: " + req.url, "     req.href: " + req.href);

    if (err instanceof ApiError) {
        // res.status(err.code).json(err.message);
        res.redirect("pages/error/apiError")
        return;
    }

    // res.status(500).json('something went wrong' + err);
    // res.render('error', )
    res.render('pages/error/error', {
        title: "error",
        layout: './layouts/errorLayout.ejs',
    })
}

module.exports = apiErrorHandler;