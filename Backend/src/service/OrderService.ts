import { getActiveCart, clearUserCart } from './CartService';
import { sendEmail } from '../MiddleWares/SendEmail';
import { CartModel } from '../models/cartModel';
import OrderModel from '../models/orderModel';

interface OrderDetails {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    items: any
}

const confirmOrder = async (orderDetails: OrderDetails) => {
    const { userId, name, email, phoneNumber, address, items } = orderDetails;

    if (!items || items.length === 0) {
        return { message: 'No items to process' };
    }

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
            ${items.map(item => `
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
        await sendEmail({
            to: `${email}, PizzaHubStuff@outlook.com`,
            subject: 'Order Confirmation',
            html: emailHtml,
        });

        const newOrder = new OrderModel({
            userId: userId,
            name: name,
            email: email,
            phone: phoneNumber,
            address: address,
            items: items.map(item => ({
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

        // Optionally clear the cart if needed
        await clearUserCart(userId);

        return { message: 'Order confirmed and email sent' }; // Success message
    } catch (error) {
        console.error('Error processing order:', error);
        return { message: 'Error processing order' }; // Error message
    }
};

export default confirmOrder
