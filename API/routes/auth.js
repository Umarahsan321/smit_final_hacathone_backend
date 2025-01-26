import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";
import { LoanModel } from "../models/LoanModel.js";

const router = express.Router();

router.post('/api/register', async (req, res) => {
    try {
        console.log("Request body in backend:", req.body);

        const { name, email, cnic } = req.body;

        if (!name || !email || !cnic) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ name, email, cnic, password: hashedPassword });
        await user.save();

        res.status(201).json({
            msg: "User registered successfully. Check your email for your password.",
            password, // Note: You'd normally email this, not send it in the response
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ msg: "Server error", error });
    }
});


router.post('/api/loan-request', async (req, res) => {
    try {
        const { category, subcategory, amount } = req.body;
        const token = Math.random().toString(36).slice(-8);
        const loan = new LoanModel({ category, subcategory, amount, token });
        await loan.save();
        res.json({ token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ msg: "Server error", error });
    }

});

export default router;