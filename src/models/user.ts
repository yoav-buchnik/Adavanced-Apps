import mongoose, { Document, Schema, model } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    email: { type: String, required: true },
});

export const User = model<UserDocument>("User", userSchema);
