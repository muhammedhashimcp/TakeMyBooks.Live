const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/TakeMyBooks", {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("mongoDb connection Successful");

    }).catch((e) => {
        console.log("No connection")
    })