import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import dotenv from "dotenv";

dotenv.config({ path: '../config/.env' });

export const VerifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ success: false, error: "Forbidden" });
    }

    try {
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, error: "No token" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await UserModel
            .findById(payload._id)
            .select('-password');

        if (!user) {
            return res.status(401).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
};