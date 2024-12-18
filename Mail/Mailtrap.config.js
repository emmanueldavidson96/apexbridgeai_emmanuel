const {MailtrapClient} = require("mailtrap");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const mailtrapClient = new MailtrapClient({
    token: TOKEN,
    endpoint:ENDPOINT
})

const sender = {
    email: "hello@demomailtrap.com",
    name: "Apex Bridge AI"
}

module.exports = {
    mailtrapClient,
    sender
}
