import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
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
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export { sendEmail };
