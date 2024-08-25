import express from 'express';
import validateJWT from '../MiddleWares/validateJWT';
import confirmOrder from '../service/OrderService';
import { ExtendRequest } from '../types/ExtendReq';

const router = express.Router();

router.post('/order', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user?._id;
    const { name, email, phone, address, items } = req.body;

    if (!name || !email || !phone || !address || !items) {
        return res.status(400).send({ error: 'Missing required fields' });
    }

    try {
        await confirmOrder({
            userId,
            name,
            email,
            phoneNumber: phone,
            address,
            items
        });
        res.status(200).send({ message: 'Order confirmed and email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to confirm order' });
    }
});
export default router;
