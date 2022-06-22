// send otp verification mail start
const nodemailer = require('nodemailer')

const sendVerifyMail = (email, validOtp) => {
    console.log(email, validOtp);
    try {
        const mailTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }

        });

        const mailDetails = {
            from: "hbroto1864@gmail.com",
            to: email,
            subject: "for user verification",
            text: "Hello, user You registered an account on TakeMYBooks.Org as an user,before being able to use your account you need to verify that this is your email address by using this verification OTP:     " + validOtp + "       Kind Regards,    "

        }

        mailTransporter.sendMail(mailDetails, (err, Info) => {
            if (err) {
                console.log(err);
            } else {
                console.log("email has been sent ", Info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    sendVerifyMail
}