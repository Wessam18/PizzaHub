"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedInitialAppitizers = exports.getAllAppitizers = void 0;
const appitizerModel_1 = __importDefault(require("../models/appitizerModel"));
const getAllAppitizers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield appitizerModel_1.default.find();
});
exports.getAllAppitizers = getAllAppitizers;
const seedInitialAppitizers = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = [
        {
            image: "https://www.papajohnsegypt.com/images/Products/Bread-Sticks.jpg",
            title: "Bread Sticks",
            details: "Delicious oven - baked sticks. Served with BBQ Sauce.",
            price: 45,
            itemType: "Appitizers"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Cheese-Sticks.jpg",
            title: "Cheese Sticks",
            details: "Fresh dough with a blend of Garlic Sauce and Mozzrella cheese, Served with BBQ Sauce.",
            price: 99,
            itemType: "Appitizers"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Spicy-Pepperoni-Ranch-Rolls-item.jpg",
            title: "Spicy Pepperoni Ranch Rolls",
            details: "8 Rolls stuffed with Pepperoni, Jalapeno, Mozzarella Cheese and Ranch Sauce.",
            price: 145,
            itemType: "Appitizers"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Chicken-Ranch-Roll-WS.jpg",
            title: "Chicken Ranch Rolls",
            details: "8 Chicken Rolls stuffed with Mozzarella Cheese and Ranch Sauce.",
            price: 145,
            itemType: "Appitizers"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/tandoori-wings.jpg",
            title: "Tandoori Wings",
            details: "Savory wings baked to the bone served with barbeque sauce.",
            price: 109,
            itemType: "Appitizers"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Spicy-Chicken-Wings.jpg",
            title: "Spicy Chicken Wings",
            details: "Savory wings baked to the bone served with barbeque sauce.",
            price: 115,
            itemType: "Appitizers"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Chicken-Poppers.jpg",
            title: "Chicken Poppers",
            details: "9 pieces of Tender all-white chicken breasts, breaded and oven baked, Served with Ranch Sauce.",
            price: 160,
            itemType: "Appitizers"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Tandoori-Poppers.jpg",
            title: "Tandoori Poppers",
            details: "9 pieces of Tender all-white chicken breasts, breaded and oven baked, Served with Ranch Sauce.",
            price: 170,
            itemType: "Appitizers"
        },
    ];
    const existedAppitizers = yield (0, exports.getAllAppitizers)();
    if (existedAppitizers.length === 0) {
        yield appitizerModel_1.default.insertMany(products);
    }
});
exports.seedInitialAppitizers = seedInitialAppitizers;
