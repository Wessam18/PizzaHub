"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = require("../service/userService");
const userService_2 = require("../service/userService");
const validateJWT_1 = __importDefault(require("../MiddleWares/validateJWT"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token = require('../models/token');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const SendVrifyMail_1 = __importDefault(require("../MiddleWares/SendVrifyMail"));
const router = express_1.default.Router();
const userService_3 = require("../service/userService");
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password } = req.body;
    const { statusCode, data } = yield (0, userService_1.register)({ name, email, phoneNumber, password });
    res.status(statusCode).send(data);
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { statusCode, data } = yield (0, userService_1.signin)({ email, password });
    res.status(statusCode).send(data);
}));
router.put('/account', validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email, phoneNumber, currentPassword, newPassword } = req.body;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const { data, statusCode } = yield (0, userService_2.updateUser)({ userId, name, email, phoneNumber, currentPassword, newPassword });
        res.status(statusCode).send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Update Error:', error.message);
            res.status(400).send({ message: error.message });
        }
        else {
            console.error('Unknown Error:', error);
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
}));
router.get('/account', validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ user });
    }
    catch (error) {
        res.status(500).send({ message: 'An error occurred while fetching user data' });
    }
}));
router.delete('/account', validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(400).send({ message: 'User ID is missing' });
        }
        const user = yield userModel_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully', user });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: 'An error occurred while deleting the user' });
    }
}));
router.get("/:id/verify/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
        if (!user)
            return res.status(400).send({ message: "Invalid Link" });
        const token = yield Token.findOne({ userId: user._id, token: req.params.token });
        if (!token)
            return res.status(400).send({ message: "Invalid Link" });
        user.verified = true;
        yield user.save();
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield token.deleteOne();
        }), 15000);
        res.status(200).send({ message: "Email Verified Successfully" });
    }
    catch (error) {
        console.error('Error during email verification:', error); // Log the error details
        res.status(500).send({ message: 'An error occurred while verifying the user' });
    }
}));
router.post('/ForgotPassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).send({ status: "User Doesn't Exist" });
        }
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, { expiresIn: "1d" });
        const resetLink = `https://pizza-hub-peach.vercel.app/ResetPassword/${user._id}/${token}`;
        yield (0, SendVrifyMail_1.default)({
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });
        res.status(200).send({ status: 'Password reset email sent successfully.' });
    }
    catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).send({ status: 'An error occurred while sending the password reset email.' });
    }
}));
router.post('/ResetPassword/:id/:token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const { password } = req.body;
    if (!id || !token || !password) {
        return res.status(400).json({ status: "Missing required fields" });
    }
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const result = yield userModel_1.default.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        if (!result) {
            return res.status(404).json({ status: "User not found" });
        }
        res.status(200).json({ status: "Success" });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({ status: "Invalid token" });
            }
            console.error('Error during password reset:', error.message);
            return res.status(500).json({ status: "Error during password reset" });
        }
        else {
            console.error('Unknown error during password reset:', error);
            return res.status(500).json({ status: "An unknown error occurred" });
        }
    }
}));
router.post('/resend-verification-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield (0, userService_3.resendVerificationEmail)(email);
    res.status(result.statusCode).json(result);
}));
exports.default = router;
