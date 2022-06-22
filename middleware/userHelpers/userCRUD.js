const { turquoise } = require("color-name");
const user = require("../../models/userSchema");


const { securePassword } = require("../userHelpers/userHelpers");

const createUser = async (req, res, next) => {

    try {

        const newUser = req.session.newUser
        console.log(newUser);
        const registerUser = new user({
            fullName: newUser.fullName,
            email: newUser.email,
            countryCode: newUser.countryCode,
            phoneNumber: newUser.phoneNumber,
            job: newUser.job,
            age: newUser.age,
            address: [{
                fullName: newUser.fullName,
                address: newUser.address,
                place: newUser.place,
                buildingNumber: newUser.buildingNumber,
                pinCode: newUser.pinCode,
                district: newUser.district,
                phoneNumber: newUser.phoneNumber,
            }],
            password: newUser.password,
            roll: "newUser",
            status: "active",
            blockStatus: false
        })
        const hashPassword = await securePassword(newUser.password);
        const UserData = await registerUser.save();
        console.log("created new user successfully");
        return UserData

    } catch (error) {
        console.log(error);
        return
    }
}

const updateUser = async (filter, update, next) => {
    try {
        const doc = await user.findOneAndUpdate(filter, update, {
            new: false
        });
        return doc

    } catch (error) {
        console.log(error);
        return

    }
}

module.exports = {
    createUser,
    updateUser
}