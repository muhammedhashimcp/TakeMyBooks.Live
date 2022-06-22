const admin = require("../models/adminSchema");
const user = require("../models/userSchema");
const ApiError = require('../middleware/ApiErrorHandler/ApiError');
const bcrypt = require('bcrypt')
const { stringify } = require("json-buffer");
const { validationResult } = require("express-validator");
const { createAdmin } = require("../middleware/adminHelpers/adminCRUD")

const verifyAdmin = async (req, res, next) => {

    try {
        console.log("inside verify admin");
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            errors.array().forEach(error => {
                req.flash("error", error.msg)
            })
            res.render("admin/registers/adminLogin", {
                messages: req.flash(),
                title: "Admin Login",
                layout: './layouts/registerLayout.ejs',
            })
        }
        const email = req.body.email
        const password = req.body.password
        const adminData = await admin.find({ email: email });
        const aPassword = adminData.password
        if (adminData) {
            // const isMatch = await bcrypt.compare(password, aPassword)
            // if (isMatch) {
            req.session.adminName = "administrator";
            req.session.isAdminLoggedIn = true;
            console.log(req.session);
            res.redirect('/admin/adminDashboard');
            // }
            return
        } else if (req.session.path === "/createAdmin") {
            const adminData = await createAdmin(req);
            console.log(adminData);
            res.redirect("/admin")
        }

    } catch (err) {
        console.log(err)
        next(err);
    }
};

const editUser = async (req, res, next) => {

    try {
        console.log("inside the post")
        const { id } = req.params;
        const newUser = req.body;
        console.log(id);
        const userUpdate = await user.findByIdAndUpdate(id, newUser);
        console.log(userUpdate);
        res.redirect("/admin/allUsers");
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let id = req.params.id
        const userData = await user.deleteOne({ _id: id });
        console.log(userData);
        res.redirect("/admin/allUsers")
    } catch (error) {
        next(error)
    }
}


const search = async (req, res, next) => {
    console.log('query: ' + JSON.stringify(req.query));
    let searchText = req.query["search-text"];
    console.log(searchText);
    try {
        let userData = await user.find({})
        if (searchText) {
            userData = userData.filter((user) => user.fullName.includes(searchText));
            req.session.userData = userData
        }
        res.redirect("/admin/allUsers")
    } catch (err) {
        next(err);
    }
}

const blockUser = async (req, res, next) => {
    try {
        console.log("inside the post")
        const { id } = req.params;
        const userData = await user.findById(id);
        console.log(userData.blockStatus);
        const blockStatus = !userData.blockStatus
        const u = await user.updateOne(
            {
                _id: Object(id)
            },
            {
                $set: {
                    blockStatus: blockStatus
                }
            }
        );
        const userDataUpdated = await user.findById(id);
        console.log(userDataUpdated.blockStatus);
        console.log('success');
        res.redirect("/admin/allUsers")
    } catch (err) {
        next(err);
    }
}



const adminLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}

module.exports = {
    verifyAdmin,
    // loadEditUser,
    editUser,
    deleteUser,
    search,
    blockUser,
    adminLogout,

}