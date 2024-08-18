import  mongoose, { Schema, Document } from 'mongoose'

export interface IAppitizers extends Document {
    title: string;
    image: string;
    details: string;
    price: number;
}

const appitizersSchema = new Schema<IAppitizers>({
    title: { type: String, required: true},
    image: { type: String, required: true},
    details: {type: String, required: true},
    price: { type: Number, required: true}
})

const appitizersModel = mongoose.model<IAppitizers>('appitizers', appitizersSchema)
export default appitizersModel;
