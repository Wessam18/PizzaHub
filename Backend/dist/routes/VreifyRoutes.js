"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartModel_1 = require("../models/cartModel");
const OrderService_1 = __importDefault(require("../service/OrderService"));
const router = express_1.default.Router();
router.post('/verifyEmail', async (req, res) => {
    const { userId, verificationCode } = req.body;
    try {
        const cart = await cartModel_1.CartModel.findOne({ userId });
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
        await (0, OrderService_1.default)(userId);
        res.json({ message: 'Order confirmed' });
    }
    catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
