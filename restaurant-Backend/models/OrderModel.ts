import mongoose, { Document, Schema } from 'mongoose';

interface OrderItem {
    itemId: string;
    title: string;
    quantity: number;
    price: number;
    size?: string;
}
export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    address: string;
    items: OrderItem[];
    total: number;
    status: string;
}

const OrderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
        {
            itemId: { type: String, required: true },
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            size: { type: String, required: false }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true, default: 'active' }
});

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
