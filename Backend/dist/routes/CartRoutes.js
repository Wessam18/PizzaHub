"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CartService_1 = require("../service/CartService");
const validateJWT_1 = __importDefault(require("../MiddleWares/validateJWT"));
const CartService_2 = require("../service/CartService");
const router = express_1.default.Router();
router.get('/', validateJWT_1.default, async (req, res, next) => {
    const userId = req.user._id;
    const cart = await (0, CartService_1.getActiveCart)({ userId });
    res.status(200).send(cart);
});
router.post('/items', validateJWT_1.default, async (req, res) => {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const items = req.body;
    if (!Array.isArray(items)) {
        return res.status(400).send({ error: 'Request body must be an array of items' });
    }
    for (const item of items) {
        const { itemId, quantity, size, itemType } = item;
        if (!['Pizza', 'Drinks', 'Appetizers'].includes(itemType)) {
            return res.status(400).send({ error: `Invalid itemType: ${itemType}` });
        }
        const result = await (0, CartService_2.addItemToCart)({ userId, itemId, quantity, size, itemType });
        if (result.statusCode !== 200) {
            return res.status(result.statusCode).send(result.data);
        }
    }
    res.status(200).send({ message: 'Items added to cart successfully' });
});
exports.default = router;
