import mongoose, { Schema, ObjectId, Document} from "mongoose";
import { IDrinks } from './drinkModel'
import { IPizzas } from './pizzaModel'
import { IAppitizers } from './appitizerModel'


const cartStatusEnum = ["active", 'completed']

export interface ICartItem extends Document {
    drinks: IDrinks;
    pizza: IPizzas;
    appetizers: IAppitizers;
    price: number;
    quantity: number;
    title: string;
    size: string;
}

export interface ICart extends Document {
    userId: ObjectId | string;
    items: ICartItem[];
    total: number;
    status: "active" | "completed"
}

const cartItemSchema = new Schema<ICartItem>({
    drinks: {type: Schema.Types.ObjectId, ref: 'drinks', required: true},
    pizza: {type: Schema.Types.ObjectId, ref: 'pizzas', required: true},
    appetizers: {type: Schema.Types.ObjectId, ref: 'appitizers', required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true, default: 1},
    title: { type: String, required: true },
    size: { type: String }
})

const cartSchema = new Schema <ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    items: [cartItemSchema],
    total: {type: Number, required: true},
    status: { type: String, enum: cartStatusEnum, default:'active'}
})

export const cartModel = mongoose.model<ICart>("cart", cartSchema)
