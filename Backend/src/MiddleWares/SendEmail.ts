import nodemailer from 'nodemailer';
import { generateRandomNumbers, storeVerificationCodes, verifyCode } from './VreifyEmail'

const dotenv = require('dotenv');
dotenv.config();

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

const sendEmail = async ({ to, subject, html }: EmailOptions) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export { sendEmail };
