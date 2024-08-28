"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedInitialDrinks = exports.getAllDrinks = void 0;
const drinkModel_1 = __importDefault(require("../models/drinkModel"));
const getAllDrinks = async () => {
    return await drinkModel_1.default.find();
};
exports.getAllDrinks = getAllDrinks;
const seedInitialDrinks = async () => {
    const products = [
        {
            image: "https://www.papajohnsegypt.com/images/Products/Pepsi.jpg",
            title: "Pepsi",
            price: 20,
            itemType: "Drinks"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Mirinda.jpg",
            title: "Mirinda",
            price: 20,
            itemType: "Drinks"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/7up.jpg",
            title: "7UP",
            price: 20,
            itemType: "Drinks"
        },
        {
            image: "https://www.nestlepurelife.com/pk/sites/g/files/xknfdk411/files/1500ml_0_1.jpg",
            title: "Mineral Water",
            price: 20,
            itemType: "Drinks"
        },
    ];
    // Check if the database is empty
    const existedDrinks = await (0, exports.getAllDrinks)();
    if (existedDrinks.length === 0) {
        // Insert initial products if the database is empty
        await drinkModel_1.default.insertMany(products);
    }
    else {
        // Add new products only if they don't already exist
        for (const product of products) {
            const existingProduct = await drinkModel_1.default.findOne({ title: product.title });
            if (!existingProduct) {
                await drinkModel_1.default.create(product);
            }
        }
    }
};
exports.seedInitialDrinks = seedInitialDrinks;
