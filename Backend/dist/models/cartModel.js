"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const cartStatusEnum = ["active", "completed"];
const cartItemSchema = new mongoose_1.Schema({
    pizza: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Pizza' },
    appetizers: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Appetizers' },
    drink: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Drinks' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    size: { type: String },
});
const cartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: cartStatusEnum, default: 'active' },
    verificationCode: { type: String },
    verificationExpires: { type: Date },
});
exports.CartModel = mongoose_1.default.model("Cart", cartSchema);
