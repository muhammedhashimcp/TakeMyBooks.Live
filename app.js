
const express = require('express');
const app = express();

const apiErrorHandler = require('./middleware/ApiErrorHandler/api-error-handler');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')


const mongoose = require("mongoose");

const port = process.env.PORT || 3000;


const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectFlash = require('connect-flash');

const db = require("./config/mongoDb");
mongoose.set('bufferCommands', false);

const indexRouter = require("./routes/indexRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");


global.globalString = "This can be accessed anywhere!";
console.log(globalString);

app.use(cookieParser());
app.use(morgan("dev"));

app.use(session({ secret: 'someKeysPrefer', saveUninitialized: true, resave: false, cookie: { maxAge: 60000 * 60 } }));

app.use(connectFlash());

app.use(express.static(path.join(__dirname, "public")));



app.use(expressLayouts);

app.set('layout', 'layouts/layout');
app.set("view engine", "ejs");
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(apiErrorHandler);


app.use((req, res, next) => {
    console.log("req.path: " + req.path, "  req.method: " + req.method, "   req.url: " + req.url, "     req.href: " + req.href);
    console.log(req.body);
    console.log(req.query)
    console.log(req.params);
    next();
})

app.use('/public', (req, res, next) => {
    const { url, path: routePath } = req;
    console.log(url);
    next();
});

app.use((req, res, next) => {
    res.set('cache-control', 'no-store')
    next()
})
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
    console.log("Server Started at " + port)
})