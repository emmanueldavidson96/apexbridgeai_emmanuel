const {MailtrapClient} = require("mailtrap");
const dotenv = require("dotenv");

// const { MailtrapClient } = require("mailtrap");

// const TOKEN = "9600a1104b94c84b00882c2a08fb7d33";

// const client = new MailtrapClient({
//   token: TOKEN,
// });

// const sender = {
//   email: "hello@apexbridge.ai",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "support@apexbridge.ai",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const mailtrapClient = new MailtrapClient({
    token: TOKEN,
    endpoint:ENDPOINT
})

const sender = {
    email: "hello@apexbridge.ai",
    name: "Apex Bridge AI"
}

module.exports = {
    mailtrapClient,
    sender
}
