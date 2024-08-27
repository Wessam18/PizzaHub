import { getActiveCart, clearUserCart } from './CartService';
import { sendEmail } from '../MiddleWares/SendEmail';
import { CartModel } from '../models/cartModel';
import OrderModel from '../models/orderModel';

// Define an interface for each item in the order
interface OrderItem {
    itemId: string;
    title: string;
    quantity: number;
    totalPrice: number;
    size?: string;
    drink?: boolean;
    appetizers?: boolean;
}

// Define the OrderDetails interface
interface OrderDetails {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    items: OrderItem[];  // items is an array of OrderItem
}

const confirmOrder = async (orderDetails: OrderDetails) => {
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
            ${items.map((item: OrderItem) => `
                <li>
                    ${item.size ? 'Pizza: ' : item.drink ? 'Drink: ' : item.appetizers ? 'Appetizer: ' : ''}${item.title} 
                    ${item.size ? `(Size: ${item.size})` : ''}
                    - Quantity: ${item.quantity}
                    - Price: ${item.totalPrice}
                </li>
            `).join('')}
        </ul>
        <p>Total: ${items.reduce((total: number, item: OrderItem) => total + item.totalPrice, 0)}</p>
    `;

    try {
        // Send the order confirmation email
        await sendEmail({
            to: `${email}, PizzaHubStuff@outlook.com`,
            subject: 'Order Confirmation',
            html: emailHtml,
        });

        // Create a new order in the database
        const newOrder = new OrderModel({
            userId: userId,
            name: name,
            email: email,
            phone: phoneNumber,
            address: address,
            items: items.map((item: OrderItem) => ({
                itemId: item.itemId,
                title: item.title,
                quantity: item.quantity,
                price: item.totalPrice / item.quantity,
                size: item.size
            })),
            total: items.reduce((total: number, item: OrderItem) => total + item.totalPrice, 0),
            status: 'completed'
        });

        await newOrder.save();

        // Optionally clear the user's cart after confirming the order
        await clearUserCart(userId);

        return { message: 'Order confirmed and email sent' }; // Success message
    } catch (error) {
        console.error('Error processing order:', error);
        return { message: 'Error processing order' }; // Error message
    }
};

export default confirmOrder;
