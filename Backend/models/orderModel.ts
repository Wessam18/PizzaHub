import mongoose, { Schema, Document, Types } from "mongoose";
import { ICartItem } from "./cartModel";

export interface IOrderItem {
    pizza?: Types.ObjectId;
    appetizers?: Types.ObjectId;
    drink?: Types.ObjectId;
    price: number;
    quantity: number;
    title: string;
    size?: 'Small' | 'Medium' | 'Large';
}

export interface IOrder extends Document {
    userId: Types.ObjectId | string;
    name: string;
    email: string;
    phone: string;
    address: string;
    items: IOrderItem[];
    total: number;
    status: 'completed' | 'pending';
}

const orderItemSchema = new Schema<IOrderItem>({
    pizza: { type: Schema.Types.ObjectId, ref: 'Pizza' },
    appetizers: { type: Schema.Types.ObjectId, ref: 'Appetizers' },
    drink: { type: Schema.Types.ObjectId, ref: 'Drinks' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    size: { type: String }
});

const orderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ['completed', 'pending'], default: 'pending' }
});

export default mongoose.model<IOrder>("Order", orderSchema);
