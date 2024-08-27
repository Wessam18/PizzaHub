"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearUserCart = exports.addItemToCart = exports.getActiveCart = void 0;
const cartModel_1 = require("../models/cartModel");
const pizzaModel_1 = __importDefault(require("../models/pizzaModel"));
const appitizerModel_1 = __importDefault(require("../models/appitizerModel"));
const drinkModel_1 = __importDefault(require("../models/drinkModel"));
const CreateCartUser = async ({ userId }) => {
    const cart = await cartModel_1.CartModel.create({ userId, total: 0 });
    await cart.save();
    return cart;
};
const getActiveCart = async ({ userId }) => {
    let cart = await cartModel_1.CartModel.findOne({ userId, status: "active" });
    if (!cart) {
        cart = await CreateCartUser({ userId });
    }
    return cart;
};
exports.getActiveCart = getActiveCart;
const addItemToCart = async ({ userId, itemId, quantity, size, itemType }) => {
    const cart = await (0, exports.getActiveCart)({ userId });
    let item, price, title;
    switch (itemType) {
        case 'Pizza':
            item = await pizzaModel_1.default.findById(itemId);
            if (!item)
                return { data: "Pizza Wasn't Found", statusCode: 400 };
            switch (size) {
                case 'Small':
                    price = item.sprice;
                    break;
                case 'Medium':
                    price = item.mprice;
                    break;
                case 'Large':
                    price = item.lprice;
                    break;
                default:
                    return { data: "Invalid Size", statusCode: 400 };
            }
            title = item.title;
            break;
        case 'Drinks':
            item = await drinkModel_1.default.findById(itemId);
            if (!item)
                return { data: "Drink Wasn't Found", statusCode: 400 };
            price = item.price;
            title = item.title;
            break;
        case 'Appetizers':
            item = await appitizerModel_1.default.findById(itemId);
            if (!item)
                return { data: "Appetizer Wasn't Found", statusCode: 400 };
            price = item.price;
            title = item.title;
            break;
        default:
            return { data: "Invalid Item Type", statusCode: 400 };
    }
    const totalPrice = price * quantity;
    cart.items.push(Object.assign({ itemId: itemId, price: totalPrice, quantity,
        title }, (itemType === 'Pizza' && { size })));
    cart.total += totalPrice;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
};
exports.addItemToCart = addItemToCart;
const clearUserCart = async (userId) => {
    const cart = await (0, exports.getActiveCart)({ userId });
    try {
        await cartModel_1.CartModel.updateOne({ userId }, { $set: { status: 'cleared', items: [], total: 0 } });
    }
    catch (error) {
        console.error('Error clearing cart:', error);
        throw new Error('Failed to clear cart');
    }
};
exports.clearUserCart = clearUserCart;
