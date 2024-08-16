import express, { Request, Response, NextFunction } from 'express';
import { getActiveCart }  from '../services/cartService';
import validateJWT from '../src/MiddleWares/validateJWT';
import { ExtendRequest } from '../src/types/ExtendReq';
import appetizersModal from '../models/appitizerModel';

import { addItemToCart } from '../services/cartService';

const router = express.Router();

router.get('/', validateJWT, async (req: ExtendRequest, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const cart = await getActiveCart({ userId });
    res.status(200).send(cart);
});

router.post('/items', validateJWT, async (req: ExtendRequest, res: Response) => {
    const userId = req?.user?._id;
    const { itemId, quantity, size, itemType } = req.body;
    if (!['Pizza', 'Drinks', 'Appetizers'].includes(itemType)) {
        return res.status(400).send({ data: "Invalid Item Type" });
    }
    const result = await addItemToCart({ userId, itemId, quantity, size, itemType });
    res.status(result.statusCode ?? 500).send(result.data);
});

export default router;
