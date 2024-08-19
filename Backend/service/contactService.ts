import { sendEmail } from '../src/MiddleWares/SendEmail';
import dotenv from 'dotenv';
dotenv.config();

interface ContactDetails {
    email: string;
    message: string;
}

const handleContactForm = async (contactDetails: ContactDetails) => {
    const { email, message } = contactDetails;

    // Prepare the email HTML
    const emailHtml = `
        <h1>Contact Form Submission</h1>
        <p>We have received your message!</p>
        <p><strong>Email:</strong> ${email}</p>
        <h2>Message:</h2>
        <p>${message}</p>
    `;

    try {
        // Send the contact form email
        await sendEmail({
            to: `${email}, PizzaHubStuff@outlook.com`, // Send to user and a fixed recipient
            subject: 'Contact Form Submission',
            html: emailHtml,
        });

        return { message: 'Contact form submitted and email sent successfully' };
    } catch (error) {
        console.error('Error processing contact form:', error);
        return { message: 'Error processing contact form' };
    }
};

export default handleContactForm;
