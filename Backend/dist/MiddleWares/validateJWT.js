"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        res.status(403).send("Auth Wasn't Provided");
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(403).send("Bearer Token Not Found");
        return;
    }
    const secret = process.env.JWT_SECRET;
    jsonwebtoken_1.default.verify(token, secret, async (err, payload) => {
        if (err) {
            res.status(403).send("Invalid Token");
            return;
        }
        if (!payload) {
            res.status(403).send("Invalid Token");
            return;
        }
        const userPayload = payload;
        const user = await userModel_1.default.findOne({ email: userPayload.email });
        if (!user) {
            res.status(404).send("User Not Found");
            return;
        }
        req.user = user;
        next();
    });
};
exports.default = validateJWT;
