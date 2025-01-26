import mongoose from "mongoose";

const { Schema } = mongoose;

const loanSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId },
        category: { type: String },
        subcategory: { type: String, },
        amount: { type: String, },
        ststus: { type: String, },
        token: { type: String, },
    },
    {
        timestamps: true,
    },
);

export const LoanModel = mongoose.model("Loan", loanSchema);