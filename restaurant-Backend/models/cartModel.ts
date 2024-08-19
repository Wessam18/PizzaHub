import mongoose, { Schema, Document, Types } from "mongoose";
import { IDrinks } from './drinkModel';
import { IPizzas } from './pizzaModel';
import { IAppitizers } from './appitizerModel';

const cartStatusEnum = ["active", "completed"] as const;
type CartStatus = typeof cartStatusEnum[number];

export interface ICartItem {
    drink?: IDrinks;
    pizza?: IPizzas;
    appetizers?: IAppitizers;
    price: number;
    quantity: number;
    title: string;
    size?: 'Small' | 'Medium' | 'Large';
}

export interface ICart extends Document {
    userId: Types.ObjectId | string;
    items: ICartItem[];
    total: number;
    size?: string;
    status: CartStatus;
    verificationCode?: string;
    verificationExpires?: Date;
}

const cartItemSchema = new Schema<ICartItem>({
    pizza: { type: Schema.Types.ObjectId, ref: 'Pizza' },
    appetizers: { type: Schema.Types.ObjectId, ref: 'Appetizers' },
    drink: { type: Schema.Types.ObjectId, ref: 'Drinks' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    size: { type: String },
});

const cartSchema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: cartStatusEnum, default: 'active' },
    verificationCode: { type: String },
    verificationExpires: { type: Date },
});

export const CartModel = mongoose.model<ICart>("Cart", cartSchema);
