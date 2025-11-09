import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS
    }
})

export default transporter;