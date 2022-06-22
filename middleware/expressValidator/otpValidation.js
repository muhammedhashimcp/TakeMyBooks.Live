const { count } = require("../../models/userSchema");
const {
    diff_minutes
} = require("../commonHelpers/commonHelpers");

const otpValidation = {
    otp : {
        exists: {
            errorMessage: "Enter OTP",
        },
        isInt: { errorMessage: "Should be a number" },
        isLength: {
            options: { min: 6, max: 6 },
            errorMessage: "OTP should be 6 digits",
        },
    },
};

module.exports = {
    otpValidation
};