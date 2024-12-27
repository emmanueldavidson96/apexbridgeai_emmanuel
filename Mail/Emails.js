// import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
// import { mailtrapClient, sender } from "./mailtrap.config.js"

const {PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE} = require("./EmailTemplates")
const { mailtrapClient, sender } = require("./Mailtrap.config");

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully", response)
    }
    catch(error){
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}

module.exports = {
    sendVerificationEmail
}