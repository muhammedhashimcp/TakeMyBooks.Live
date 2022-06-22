const otpGenerator = async (req,res,next) => {

    try {
        const otpGenerator = Math.floor(100000 + Math.random() * 900000);
        console.log(otpGenerator);
        req.session.OTP = otpGenerator;

        // only for 5 minutes   
        req.session.OtpTimeStart =new Date().getTime();
        console.log("OTP and time stored into section");
        return

    } catch (error) {
        console.log(error);
        return 
    }
}

module.exports = {
    otpGenerator
}