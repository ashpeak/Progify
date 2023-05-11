require("dotenv").config({ path: "../config.env" });
const nodemailer = require("nodemailer");

module.exports = async (email, subject, msg) => {
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

        const value = 4567;
        const ht = `<b><h1>hEY User! your api key is api?=${value}</h1><br>${msg}</b>`;

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <cs1.coursely@gmail.com>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: msg, // plain text body
            html: ht, // html body
        });

    } catch (error) {
        console.log("Email not sent!");
        console.log(error);
    }
}
