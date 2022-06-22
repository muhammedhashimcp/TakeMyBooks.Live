const {
    diff_minutes
} = require("./commonHelpers/commonHelpers.js");


const otpAuthentication=async (req,res,next)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            errors.array().forEach((error) => {
                req.flash("error", error.msg, error.param);
            });
            res.status(200).render("user/registers/verifyOtp.ejs", {
                title: "OTP Verification",
                layout: "./layouts/registerLayout.ejs",
                action: "registerUser",
                userName: req.session.fullName,
            });
            
        } else {
         
        }
        console.log("otp verification");
        
        console.log(req.session);
        const OtpTimeStart = req.session.OtpTimeStart;
        console.log(OtpTimeStart);
        const otpTimeEnd = new Date().getTime();
        remainingTime = await diff_minutes(OtpTimeStart, otpTimeEnd);
        console.log(remainingTime);
        if (remainingTime < 5000) {
            console.log("otp valid, not expired");
            const userOtp = req.body.otp;
            const validOtp = req.session.OTP;
            if (userOtp === validOtp) {
                req.session.otpValid=true;
                type = 'success';
                msg = 'Invalid link; please try again';
                req.flash(type, msg);
            }else{
                type = 'success';
                msg = 'Your password has been updated successfully';
                req.flash(type, msg);                
            }
            return
        }else{
            return
        }
    } catch (error) {
        console.log(error.message);
    }
}



module.exports={
    otpAuthentication
}

