require("dotenv").config({ path: "../config.env" });
const nodemailer = require("nodemailer");
const EmailTemplate = require('./EmailMsgTemplate');

module.exports = async (email, subject, url) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Ashish Singh 👻" <cs1.coursely@gmail.com>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: EmailTemplate(url, subject), // html body
        });

    } catch (error) {
        console.log("Email not sent!");
        console.log(error);
    }
}
