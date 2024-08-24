import express, { Request, Response } from 'express';
import { CartModel } from '../models/cartModel';
import clearUserCart from '../service/OrderService';

const router = express.Router();

router.post('/verifyEmail', async (req: Request, res: Response) => {
    const { userId, verificationCode } = req.body;

    try {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        if (cart.status === 'completed') {
            return res.status(400).json({ message: 'The order has already been confirmed' });
        }

        if (!cart.verificationCode || !cart.verificationExpires) {
            return res.status(400).json({ message: 'Verification code or expiration is missing' });
        }

        if (cart.verificationCode !== verificationCode || new Date() > cart.verificationExpires) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }

        cart.status = 'completed';
        await cart.save();

        await clearUserCart(userId);

        res.json({ message: 'Order confirmed' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
