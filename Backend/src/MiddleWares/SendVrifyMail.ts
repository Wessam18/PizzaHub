import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();


interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

const VreifyEmail = async ({ to, subject, html }: EmailOptions) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_VALID,
            pass: process.env.EMAILVALID_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_VALID,
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
