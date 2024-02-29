const nodeMailer = require('nodemailer');
const config = require('../config.json')

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    service: 'gmail',
    auth: {
        user: config.nodemail.emailSender,
        pass: config.nodemail.passcode
    }
})

const sendEmail = (email, subject, body) => {
    const options = {
        from: config.nodemail.emailSender,
        to: email,
        subject: subject,
        text: body
    }
    transporter.sendMail(options, (error) => {
        if (error) {
            console.error(error);
        }
        console.log(`Message is sent to ${email}`);
    })
}

module.exports = sendEmail;