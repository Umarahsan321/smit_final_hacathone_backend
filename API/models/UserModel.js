import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, required: true },
        cnic: { type: String, unique: true, required: true },
        password: { type: String || "" },
        role: { type: String, default: "user", enum: ["user", "admin"] },
    },
    {
        timestamps: true,
    },
);

export const UserModel = mongoose.model("Users", userSchema);