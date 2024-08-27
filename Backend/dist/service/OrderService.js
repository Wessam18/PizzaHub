"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartService_1 = require("./CartService");
const SendEmail_1 = require("../MiddleWares/SendEmail");
const orderModel_1 = __importDefault(require("../models/orderModel"));
const confirmOrder = async (orderDetails) => {
    const { userId, name, email, phoneNumber, address, items } = orderDetails;
    if (!items || items.length === 0) {
        return { message: 'No items to process' };
    }
    // Construct the email HTML content
    const emailHtml = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order, ${name}!</p>
        <p>Contact Information:</p>
        <ul>
            <li>Email: ${email}</li>
            <li>Phone: ${phoneNumber}</li>
            <li>Address: ${address}</li>
        </ul>
        <h2>Order Details:</h2>
        <ul>
            ${items.map((item) => `
                <li>
                    ${item.size ? 'Pizza: ' : item.drink ? 'Drink: ' : item.appetizers ? 'Appetizer: ' : ''}${item.title} 
                    ${item.size ? `(Size: ${item.size})` : ''}
                    - Quantity: ${item.quantity}
                    - Price: ${item.totalPrice}
                </li>
            `).join('')}
        </ul>
        <p>Total: ${items.reduce((total, item) => total + item.totalPrice, 0)}</p>
    `;
    try {
        // Send the order confirmation email
        await (0, SendEmail_1.sendEmail)({
            to: `${email}, PizzaHubStuff@outlook.com`,
            subject: 'Order Confirmation',
            html: emailHtml,
        });
        // Create a new order in the database
        const newOrder = new orderModel_1.default({
            userId: userId,
            name: name,
            email: email,
            phone: phoneNumber,
            address: address,
            items: items.map((item) => ({
                itemId: item.itemId,
                title: item.title,
                quantity: item.quantity,
                price: item.totalPrice / item.quantity,
                size: item.size
            })),
            total: items.reduce((total, item) => total + item.totalPrice, 0),
            status: 'completed'
        });
        await newOrder.save();
        // Optionally clear the user's cart after confirming the order
        await (0, CartService_1.clearUserCart)(userId);
        return { message: 'Order confirmed and email sent' }; // Success message
    }
    catch (error) {
        console.error('Error processing order:', error);
        return { message: 'Error processing order' }; // Error message
    }
};
exports.default = confirmOrder;
