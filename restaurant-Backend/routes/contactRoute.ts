import express from 'express';
import handleContactForm from '../service/contactService';
import { ExtendRequest } from '../src/types/ExtendReq'

const router = express.Router();

router.post('/', async (req: ExtendRequest, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).send({ error: 'Missing required fields' });
    }

    try {
        const result = await handleContactForm({ email, message });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to process contact form' });
    }
});

export default router;
