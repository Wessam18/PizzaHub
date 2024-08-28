"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactService_1 = __importDefault(require("../service/contactService")); // Adjust path if needed
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const { email, message } = req.body;
    // Validate request body
    if (!email || !message) {
        return res.status(400).send({ error: 'Missing required fields' });
    }
    try {
        const result = await (0, contactService_1.default)({ email, message });
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to process contact form' });
    }
});
exports.default = router;
