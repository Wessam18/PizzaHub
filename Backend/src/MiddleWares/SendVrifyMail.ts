import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

const VreifyEmail = async ({ to, subject, html }: EmailOptions) => {
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SANBOX_USER,
            pass: process.env.SANDBOX_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SANBOX_USER,
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

export default VreifyEmail;
