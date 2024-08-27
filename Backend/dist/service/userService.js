"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendVerificationEmail = exports.updateUser = exports.signin = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const SendVrifyMail_1 = __importDefault(require("../MiddleWares/SendVrifyMail"));
const Token = require('../models/token');
const generateToken = () => crypto_1.default.randomBytes(20).toString('hex');
const generateJWT = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "24h" });
};
const register = async ({ name, email, phoneNumber, password }) => {
    const findUserByEmail = await userModel_1.default.findOne({ email });
    if (findUserByEmail) {
        return { data: "Email Already Exists!", statusCode: 400 };
    }
    const findUserByPhone = await userModel_1.default.findOne({ phoneNumber });
    if (findUserByPhone) {
        return { data: "Phone Number Already Exists!", statusCode: 400 };
    }
    const hashPass = await bcrypt_1.default.hash(password, 10);
    const verificationToken = generateToken();
    const newUser = new userModel_1.default({
        name,
        email,
        phoneNumber,
        password: hashPass,
        verified: false // Ensure user is not verified upon registration
    });
    await newUser.save();
    const token = new Token({
        userId: newUser._id,
        token: verificationToken
    });
    await token.save();
    const verificationLink = `https://pizza-hub-peach.vercel.app/users/${newUser._id}/verify/${verificationToken}`;
    const emailOptions = {
        to: email,
        subject: 'Please verify your email address',
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
    };
    await (0, SendVrifyMail_1.default)(emailOptions);
    return { data: "Verification email sent. Please check your inbox.", statusCode: 200 };
};
exports.register = register;
const signin = async ({ email, password }) => {
    try {
        // Find the user by email
        const findUser = await userModel_1.default.findOne({ email });
        // If user is not found, return an error
        if (!findUser) {
            return { data: "Incorrect email or password", statusCode: 400 };
        }
        // If the user is not verified
        if (!findUser.verified) {
            // Check if there's already a verification token for this user
            const existingToken = await Token.findOne({ userId: findUser._id });
            if (!existingToken) {
                // Generate a new verification token if not already existing
                const verificationToken = generateToken();
                const token = new Token({
                    userId: findUser._id,
                    token: verificationToken
                });
                await token.save();
                // Send verification email
                const verificationLink = `https://pizza-hub-peach.vercel.app/users/${findUser._id}/verify/${verificationToken}`;
                const emailOptions = {
                    to: email,
                    subject: 'Please verify your email address',
                    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
                };
                await (0, SendVrifyMail_1.default)(emailOptions);
            }
            // Inform user to check their email
            return { data: "An email was sent to your account", statusCode: 400 };
        }
        // If user is verified, check the password
        const isMatch = await bcrypt_1.default.compare(password, findUser.password);
        if (!isMatch) {
            return { data: "Incorrect email or password", statusCode: 400 };
        }
        // Generate and return JWT token
        const token = generateJWT({
            name: findUser.name,
            email: findUser.email,
            phoneNumber: findUser.phoneNumber,
        });
        return {
            data: token,
            statusCode: 200,
        };
    }
    catch (error) {
        console.error('Error during sign-in:', error);
        return { data: "Server error", statusCode: 500 };
    }
};
exports.signin = signin;
const generatedJWT = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || "default_secret_key", {
        expiresIn: "24h",
    });
};
const updateUser = async ({ userId, name, email, phoneNumber, currentPassword, newPassword, }) => {
    try {
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Regex for validating the name
        const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
        if (name) {
            if (!nameRegex.test(name)) {
                throw new Error("Invalid name format. The first letter must be capitalized.");
            }
            user.name = name;
        }
        // Regex for validating the email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email) {
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format.");
            }
            const existingEmailUser = await userModel_1.default.findOne({ email });
            if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
                throw new Error("Email already in use");
            }
            user.email = email;
        }
        // Regex for validating the phone number
        const phoneRegex = /^\+20\d{10}$/;
        if (phoneNumber) {
            if (!phoneRegex.test(phoneNumber)) {
                throw new Error("Invalid phone number format. It must match +20XXXXXXXXXX.");
            }
            const existingPhoneUser = await userModel_1.default.findOne({ phoneNumber });
            if (existingPhoneUser && existingPhoneUser._id.toString() !== userId) {
                throw new Error("Phone number already in use");
            }
            user.phoneNumber = phoneNumber;
        }
        // Password update logic
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt_1.default.compare(currentPassword, user.password);
            if (!isMatch) {
                throw new Error("Current password is incorrect");
            }
            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&*]).{10,}$/;
            if (!passwordRegex.test(newPassword)) {
                throw new Error("New password does not meet criteria");
            }
            user.password = await bcrypt_1.default.hash(newPassword, 10);
        }
        await user.save();
        // Generate JWT token with updated user data
        const token = generateJWT({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        });
        return {
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                },
                token,
            },
            statusCode: 200,
        };
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('E11000 duplicate key error')) {
                if (error.message.includes('email')) {
                    throw new Error("Email already in use");
                }
                else if (error.message.includes('phoneNumber')) {
                    throw new Error("Phone number already in use");
                }
            }
            throw new Error(error.message || "Server error");
        }
        else {
            throw new Error("An unknown error occurred");
        }
    }
};
exports.updateUser = updateUser;
const resendVerificationEmail = async (email) => {
    try {
        // Find the user by email
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return { data: "User not found", statusCode: 400 };
        }
        // Check if user is already verified
        if (user.verified) {
            return { data: "User already verified", statusCode: 400 };
        }
        // Check if there's already a verification token for this user
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            // Generate a new verification token if not already existing
            const verificationToken = generateToken();
            token = new Token({
                userId: user._id,
                token: verificationToken
            });
            await token.save();
        }
        // Send verification email
        const verificationLink = `https://pizza-hub-peach.vercel.app/users/${user._id}/verify/${token.token}`;
        const emailOptions = {
            to: email,
            subject: 'Please verify your email address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
        };
        await (0, SendVrifyMail_1.default)(emailOptions);
        return { data: "Verification email sent. Please check your inbox.", statusCode: 200 };
    }
    catch (error) {
        console.error('Error resending verification email:', error);
        return { data: "Server error", statusCode: 500 };
    }
};
exports.resendVerificationEmail = resendVerificationEmail;
