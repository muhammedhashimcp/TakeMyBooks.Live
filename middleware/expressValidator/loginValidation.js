

const loginDataValidation = {
    email: {
        exists: { errorMessage: "email is required" },
        isEmail: { errorMessage: "Please provide valid email" },
        custom:{
            options:async (req,res,next)=>{
                console.log(req.body);
            }
        }
    },
    password: {
        exists: { errorMessage: "Password is required" },
        isString: { errorMessage: "password should be string" },
      
    }
};


const adminDataValidation = {
    email: {
        exists: { errorMessage: "email is required" },
        isEmail: { errorMessage: "Please provide valid email" },
    },
    password: {
        exists: { errorMessage: "Password is required" },
        isString: { errorMessage: "password should be string" },
        isLength: {
            options: { min: 5 },
            errorMessage: "Password should be at least 5 characters",
        },    
    }
};

module.exports = {
    loginDataValidation,adminDataValidation
};