"use strict";
exports.__esModule = true;
exports.CartModel = void 0;
var mongoose_1 = require("mongoose");
var cartStatusEnum = ["active", "completed"];
var cartItemSchema = new mongoose_1.Schema({
    pizza: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Pizza' },
    appetizers: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Appetizers' },
    drink: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Drinks' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    size: { type: String }
});
var cartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    total: { type: Number, required: true },
    status: { type: String, "enum": cartStatusEnum, "default": 'active' },
    verificationCode: { type: String },
    verificationExpires: { type: Date }
});
exports.CartModel = mongoose_1["default"].model("Cart", cartSchema);
