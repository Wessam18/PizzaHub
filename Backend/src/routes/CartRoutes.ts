// import express, { Request, Response, NextFunction } from 'express';
// import { getActiveCart }  from '../service/CartService';
// import validateJWT from '../MiddleWares/validateJWT';
// import { ExtendRequest } from '../types/ExtendReq';
// import appetizersModal from '../models/appitizerModel';

// import { addItemToCart } from '../service/CartService';

// const router = express.Router();

// router.get('/', validateJWT, async (req: ExtendRequest, res: Response, next: NextFunction) => {
//     const userId = req.user._id;
//     const cart = await getActiveCart({ userId });
//     res.status(200).send(cart);
// });

// router.post('/items', validateJWT, async (req: ExtendRequest, res: Response) => {
//     const userId = req?.user?._id;
//     const items = req.body;

//     if (!Array.isArray(items)) {
//         return res.status(400).send({ error: 'Request body must be an array of items' });
//     }

//     for (const item of items) {
//         const { itemId, quantity, size, itemType } = item;

//         if (!['Pizza', 'Drinks', 'Appetizers'].includes(itemType)) {
//             return res.status(400).send({ error: `Invalid itemType: ${itemType}` });
//         }
//         const result = await addItemToCart({ userId, itemId, quantity, size, itemType });
//         if (result.statusCode !== 200) {
//             return res.status(result.statusCode).send(result.data);
//         }
//     }

//     res.status(200).send({ message: 'Items added to cart successfully' });
// });

// export default router
