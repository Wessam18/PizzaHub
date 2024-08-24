import  mongoose, { Schema, Document } from 'mongoose'

export interface IDrinks extends Document {
    title: string;
    image: string;
    price: number;
    itemType?: string;
}

const drinksSchema = new Schema<IDrinks>({
    title: { type: String, required: true},
    image: { type: String, required: true},
    price: { type: Number, required: true},
    itemType: {type: String, default: "Drinks"}
})

const drinksModel = mongoose.model<IDrinks>('drinks', drinksSchema)
export default drinksModel;
