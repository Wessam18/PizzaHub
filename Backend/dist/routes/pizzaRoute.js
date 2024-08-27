"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pizzaService_1 = require("../service/pizzaService");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const pizzas = await (0, pizzaService_1.getAllPizzas)();
    res.status(200).send(pizzas);
});
exports.default = router;
