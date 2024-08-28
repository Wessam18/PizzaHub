"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drinkService_1 = require("../service/drinkService");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const drinks = await (0, drinkService_1.getAllDrinks)();
    res.status(200).send(drinks);
});
exports.default = router;
