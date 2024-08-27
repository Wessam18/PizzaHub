"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SendEmail_1 = require("../MiddleWares/SendEmail");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const handleContactForm = (contactDetails) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield (0, SendEmail_1.sendEmail)({
            to: `${email}, PizzaHubStuff@outlook.com`,
            subject: 'Contact Form Submission',
            html: emailHtml,
        });
        return { message: 'Contact form submitted and email sent successfully' };
    }
    catch (error) {
        console.error('Error processing contact form:', error);
        return { message: 'Error processing contact form' };
    }
});
exports.default = handleContactForm;
