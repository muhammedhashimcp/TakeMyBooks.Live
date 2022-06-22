const { turquoise } = require("color-name");
const admin = require("../../models/adminSchema");


const { securePassword } = require("../userHelpers/userHelpers");

const createAdmin = async (req, res, next) => {

    try {

        const registerAdmin = new admin({
            email: req.body.email,
            password: req.body.password,

        })

        const adminData = await registerAdmin.save();
        console.log("created new Admin successfully");
        return adminData
    } catch (error) {
        console.log(error);
        return
    }
}



module.exports = {
    createAdmin

}