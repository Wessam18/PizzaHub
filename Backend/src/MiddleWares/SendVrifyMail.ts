import nodemailer from 'nodemailer'; // Import the nodemailer module for sending emails
import dotenv from 'dotenv'; // Import dotenv to load environment variables from a .env file

dotenv.config(); // Load environment variables from the .env file

// Define an interface to specify the shape of the email options object
interface EmailOptions {
    to: string; // The recipient's email address
    subject: string; // The subject of the email
    html: string; // The HTML content of the email
}

// Define an asynchronous function to send a verification email
const VreifyEmail = async ({ to, subject, html }: EmailOptions) => {
    // Create a transporter object using nodemailer, configured with the SMTP server details
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // SMTP server address for Office 365
        port: 587, // Port number for the SMTP server (587 for STARTTLS)
        secure: false, // Use STARTTLS (false) instead of SSL (true)
        auth: {
            user: process.env.EMAIL_VALID, // The sender's email address, loaded from environment variables
            pass: process.env.EMAILVALID_PASS, // The sender's email password, loaded from environment variables
        },
    });

    // Define the mail options, including the sender, recipient, subject, and content of the email
    const mailOptions = {
        from: process.env.SANBOX_USER, // The email address that will appear as the sender
        to, // The recipient's email address
        subject, // The subject of the email
        html, // The HTML content of the email
    };

    try {
        // Send the email using the transporter and the defined mail options
        await transporter.sendMail(mailOptions);
        // Log success message or handle further actions if needed
    } catch (error) {
        // Log an error message if the email fails to send
        console.error('Error sending email:', error);
    }
};

export default VreifyEmail; // Export the VreifyEmail function for use in other parts of the application
