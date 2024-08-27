"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var orderItemSchema = new mongoose_1.Schema({
    pizza: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Pizza' },
    appetizers: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Appetizers' },
    drink: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Drinks' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    size: { type: String }
});
var orderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, "enum": ['completed', 'pending'], "default": 'pending' }
});
exports["default"] = mongoose_1["default"].model("Order", orderSchema);
