import  mongoose, { Schema, Document } from 'mongoose'

export interface IPizzas extends Document {
    image: string;
    title: string;
    details: string;
    sprice: number;
    mprice: number;
    lprice: number;
    ssize: string;
    msize: string;
    lsize: string;
    role: string;
}

const pizzasSchema = new Schema<IPizzas>({
    title: { type: String, required: true},
    image: { type: String, required: true},
    details: { type: String, required: true},
    sprice: { type: Number, required: true},
    lprice: { type: Number, required: true},
    ssize: { type: String, required: true},
    msize: { type: String, required: true},
    lsize: { type: String, required: true},
    role: { type: String, required: true, defualt: "pizza"}

})

const pizzasModel = mongoose.model<IPizzas>('pizzas', pizzasSchema)
export default pizzasModel;


