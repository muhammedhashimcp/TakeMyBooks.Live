
const { contains, isEmptyObject, param } = require("jquery");
const { CHAR_CARRIAGE_RETURN } = require("picomatch/lib/constants");
const user = require("../../models/userSchema");

const userDataValidation = {
    fullName: {
        exists: {
            errorMessage: "Full name is required",
        },
        isString: {
            errorMessage: "User name should be string",
        },
        custom: {
            options:(value) => {
                function containsNumber(value) {
                    return /\d/.test(value);
                }
                let isNumber = containsNumber(value);

                if (!isNumber) {
                    sanitizedValue = true;
                } else {
                    sanitizedValue = false;
                }
                return sanitizedValue;
            },
            errorMessage: "full name should be a string, never contain any number",
        },
    },
    email: {
        exists: { errorMessage: "email is required" },
        isEmail: { errorMessage: "Please provide valid email" },
        custom: {
            options: async (value, { req }) => {
                const userData = await user.findOne({ email: value });
                console.log(userData);
              let sanitizedValue =false
                if (userData) {
                   sanitizedValue = true;
                    msg= "Email already in use"
                    req.flash("error",msg); 
                }
                return sanitizedValue
            },  

        },
    },
    countryCode: {
        isString: { errorMessage: "Please provide valid country code" },
    },
    phoneNumber: {
        exists: {
            errorMessage: "Phone number should be string",
        },
        isString: { errorMessage: "password should be string" },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "Phone number should be 10 digits",
        },
    },
    job: {
        isString: { errorMessage: "Select your job " },
    },
    age: {
        isInt: {
            options: { min: 5, max: 100 },
            errorMessage: "select your age, should be a number"
        },
    },
    address: {
        isString: { errorMessage: "Enter your  address" },
    },
    buildingNumber: {
        isString: { errorMessage: "Enter your building number" },
    },
    pinCode: {
        isInt: {
            errorMessage: "select your Pin code, should be a number",
        },
    },
    district: {
        isString: { errorMessage: "Select your district" },
    },

    password: {
        exists: { errorMessage: "Password is required" },
        isString: { errorMessage: "password should be string" },
        isLength: {
            options: { min: 5 },
            errorMessage: "Password should be at least 5 characters",
        },
    },
    confirmPassword: {
        exists: { errorMessage: "confirm Password is required" },
        isString: { errorMessage: "password should be string" },
        custom: {
            options: (value, { req }) => {
                let sanitizedValue;
                if (value === req.body.password) {
                    sanitizedValue = true;
                } else {
                    sanitizedValue = false;
                }
                return sanitizedValue;
            },
            errorMessage: "Password should be match",
        },
    },
};

const checkEmail = {
   
    email: {
        exists: { errorMessage: "email is required" },
        isEmail: { errorMessage: "Please provide valid email" },
    },

};

const checkPasswords = {
   
    password: {
        exists: { errorMessage: "Password is required" },
        isString: { errorMessage: "password should be string" },
        isLength: {
            options: { min: 5 },
            errorMessage: "Password should be at least 5 characters",
        },
    },
    confirmPassword: {
        exists: { errorMessage: "confirm Password is required" },
        isString: { errorMessage: "password should be string" },
        custom: {
            options: (value, { req }) => {
                let sanitizedValue;
                if (value === req.body.password) {
                    sanitizedValue = true;
                } else {
                    sanitizedValue = false;
                }
                return sanitizedValue;
            },
            errorMessage: "Password should be match",
        },
    },

};


module.exports = {
    userDataValidation,checkEmail,checkPasswords
};
  