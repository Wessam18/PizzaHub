import mongoose, {Schema,  Document} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    phoneNumber: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true})

const userModel = mongoose.model<IUser>('User', userSchema)

export default userModel
