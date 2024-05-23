import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
    name: string;
    email: string;
    isAdmin: boolean;
    password: string;
}

const UserSchema: Schema<IUserDocument> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true }
});

export default mongoose.model('User', UserSchema);
