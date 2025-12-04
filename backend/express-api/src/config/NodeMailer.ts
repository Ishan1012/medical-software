import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 120000,
    greetingTimeout: 120000,
    socketTimeout: 120000,
    logger: true
})

export default transporter;