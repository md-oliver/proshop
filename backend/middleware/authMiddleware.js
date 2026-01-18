import jwt from "jsonwebtoken";
import asyncHandle from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect Routes
export const protect = asyncHandle(async (req, res, next) => {
    let token;

    // Read the jwt from cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Unauthorized");
        }
    } else {
        res.status(401);
        throw new Error("Unauthorized");
    }
});

// Admin Middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Unauthorized");
    }
};
