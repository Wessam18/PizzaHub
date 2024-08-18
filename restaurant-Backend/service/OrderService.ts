import { getActiveCart, clearUserCart } from './CartService';
import { sendEmail } from '../src/MiddleWares/SendEmail';
import { CartModel } from '../models/CartModel';

interface OrderDetails {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
}

const confirmOrder = async (orderDetails: OrderDetails) => {
    const { userId, name, email, phoneNumber, address } = orderDetails;
    
    // Retrieve the active cart for the user
    const cart = await CartModel.findOne({ userId, status: 'active' });
    
    // Check if the cart exists
    if (!cart) {
        console.error('Cart not found');
        return { message: 'Cart not found' }; // Response for cart not found
    }

    // Check if the cart is empty
    if (cart.items.length === 0) {
        console.log('Cart is empty, unable to process order');
        return { message: 'Cart is empty, unable to process order' }; // Response for empty cart
    }

    // Check if the order has already been confirmed
    if (cart.status === 'completed') {
        console.log('The order has already been confirmed. Please check your email.');
        return { message: 'The order has already been confirmed. Please check your email.' }; // Response for already confirmed order
    }

    // Prepare the email HTML
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
            ${cart.items.map(item => `
                <li>
                    ${item.size ? 'Pizza: ' : item.drink ? 'Drink: ' : item.appetizers ? 'Appetizer: ' : ''}${item.title} 
                    ${item.size ? `(Size: ${item.size})` : ''}
                    - Quantity: ${item.quantity}
                    - Price: ${item.price}
                </li>
            `).join('')}
        </ul>
        <p>Total: ${cart.total}</p>
    `;
    
    try {
        // Send the confirmation email
        await sendEmail({
            to: `${email}, PizzaHubStuff@outlook.com`,
            subject: 'Order Confirmation',
            html: emailHtml,
        });
        
        // Mark the cart as completed
        cart.status = 'completed'; // Mark as completed
        await cart.save(); // Save the updated cart
        
        // Clear the cart
        await clearUserCart(userId); 
        
        return { message: 'Order confirmed and email sent' }; // Success message
    } catch (error) {
        console.error('Error processing order:', error);
        return { message: 'Error processing order' }; // Error message
    }
};

export default confirmOrder
