const admin = require("../models/adminSchema");
const user = require("../models/userSchema");
const subCategory = require("../models/subCategorySchema");
const category = require("../models/categorySchema");

const adminLoginLoad = async (req, res, next) => {
    console.log("admin controller js ");

    try {
        if (req.session.admin) {
            res.redirect("/adminDashboard");
        } else {
            res.render("admin/registers/adminLogin", {
                messages: req.flash(),
                title: "Admin Login",
                layout: "./layouts/registerLayout.ejs",
            });
        }
    } catch (error) {
        next(error);
    }
};
const loadAdminDashboard = async (req, res) => {
    try {
        adminName = req.session.adminName;
        if (adminName === "administrator") {
            res.render("admin/adminDashboard", {
                layout: "./layouts/adminLayout.ejs",
                title: "Admin Dashboard",
                adminName: adminName,
                route: "admin",
                adminAction: false
            });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const loadAllUsers = async (req, res, next) => {
    try {
        if (req.session.userData) {
            const userData = req.session.userData
            console.log(userData);
            delete req.session.userData
            res.render("tables/allDetails", {
                layout: "./layouts/adminLayout.ejs",
                title: "Admin Dashboard",
                adminName: "administrator",
                data: userData,
            });

        } else {
            const userData = await user.find({});
            res.render("tables/allDetails", {
                layout: "./layouts/adminLayout.ejs",
                title: "Admin Dashboard",
                adminName: "administrator",
                data: userData,
            });

        }

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const loadAddUsers = (req, res, next) => {
    try {
        res.render("pages/registers/signUp", {
            title: "Add User",
            action: "addUser",
            layout: "./layouts/registerLayout.ejs",
            adminName: "administrator",
            userData: userData,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const loadEditUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const userData = await user.findById(id);
        console.log(userData);
        res.render("admin/registers/editUser", {
            adminName: "administrator",
            message: "Edit user data",
            data: userData,
            title: "Edit User",
            // action: "addUser",
            layout: "./layouts/registerLayout.ejs",
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const loadAddUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await user.findById(id).lean();
    } catch (error) {
        next(error);
    }
};

const loadAdminSettings = async (req, res, next) => {
    try {

        // console.log(subCategories);
        const categories = await category.find({})
        res.render("admin/registers/adminSettings", {
            layout: "./layouts/adminLayout.ejs",
            title: "settings",
            adminName: "administrator",
            category: categories,
            // subCategory: subCategories
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};


module.exports = {
    adminLoginLoad,
    loadAdminDashboard,
    loadAllUsers,
    loadAddUsers,
    loadEditUser,
    loadAdminSettings,

};
