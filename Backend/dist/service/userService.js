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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendVerificationEmail = exports.updateUser = exports.signin = exports.register = void 0;
var userModel_1 = __importDefault(require("../models/userModel"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var SendVrifyMail_1 = __importDefault(require("../MiddleWares/SendVrifyMail"));
var Token = require('../models/token');
var generateToken = function () { return crypto_1.default.randomBytes(20).toString('hex'); };
var generateJWT = function (data) {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "24h" });
};
var register = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var findUserByEmail, findUserByPhone, hashPass, verificationToken, newUser, token, verificationLink, emailOptions;
    var name = _b.name, email = _b.email, phoneNumber = _b.phoneNumber, password = _b.password;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 1:
                findUserByEmail = _c.sent();
                if (findUserByEmail) {
                    return [2 /*return*/, { data: "Email Already Exists!", statusCode: 400 }];
                }
                return [4 /*yield*/, userModel_1.default.findOne({ phoneNumber: phoneNumber })];
            case 2:
                findUserByPhone = _c.sent();
                if (findUserByPhone) {
                    return [2 /*return*/, { data: "Phone Number Already Exists!", statusCode: 400 }];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 3:
                hashPass = _c.sent();
                verificationToken = generateToken();
                newUser = new userModel_1.default({
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: hashPass,
                    verified: false // Ensure user is not verified upon registration
                });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _c.sent();
                token = new Token({
                    userId: newUser._id,
                    token: verificationToken
                });
                return [4 /*yield*/, token.save()];
            case 5:
                _c.sent();
                verificationLink = "http://localhost:5173/users/".concat(newUser._id, "/verify/").concat(verificationToken);
                emailOptions = {
                    to: email,
                    subject: 'Please verify your email address',
                    html: "<p>Click <a href=\"".concat(verificationLink, "\">here</a> to verify your email address.</p>"),
                };
                return [4 /*yield*/, (0, SendVrifyMail_1.default)(emailOptions)];
            case 6:
                _c.sent();
                return [2 /*return*/, { data: "Verification email sent. Please check your inbox.", statusCode: 200 }];
        }
    });
}); };
exports.register = register;
var signin = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var findUser, existingToken, verificationToken, token_1, verificationLink, emailOptions, isMatch, token, error_1;
    var email = _b.email, password = _b.password;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 8, , 9]);
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 1:
                findUser = _c.sent();
                // If user is not found, return an error
                if (!findUser) {
                    return [2 /*return*/, { data: "Incorrect email or password", statusCode: 400 }];
                }
                if (!!findUser.verified) return [3 /*break*/, 6];
                return [4 /*yield*/, Token.findOne({ userId: findUser._id })];
            case 2:
                existingToken = _c.sent();
                if (!!existingToken) return [3 /*break*/, 5];
                verificationToken = generateToken();
                token_1 = new Token({
                    userId: findUser._id,
                    token: verificationToken
                });
                return [4 /*yield*/, token_1.save()];
            case 3:
                _c.sent();
                verificationLink = "http://localhost:5173/users/".concat(findUser._id, "/verify/").concat(verificationToken);
                emailOptions = {
                    to: email,
                    subject: 'Please verify your email address',
                    html: "<p>Click <a href=\"".concat(verificationLink, "\">here</a> to verify your email address.</p>"),
                };
                return [4 /*yield*/, (0, SendVrifyMail_1.default)(emailOptions)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5: 
            // Inform user to check their email
            return [2 /*return*/, { data: "An email was sent to your account", statusCode: 400 }];
            case 6: return [4 /*yield*/, bcrypt_1.default.compare(password, findUser.password)];
            case 7:
                isMatch = _c.sent();
                if (!isMatch) {
                    return [2 /*return*/, { data: "Incorrect email or password", statusCode: 400 }];
                }
                token = generatedJWT({
                    name: findUser.name,
                    email: findUser.email,
                    phoneNumber: findUser.phoneNumber,
                });
                return [2 /*return*/, {
                        data: token,
                        statusCode: 200,
                    }];
            case 8:
                error_1 = _c.sent();
                console.error('Error during sign-in:', error_1);
                return [2 /*return*/, { data: "Server error", statusCode: 500 }];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
var generatedJWT = function (data) {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || "default_secret_key", {
        expiresIn: "24h",
    });
};
var updateUser = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var user, nameRegex, emailRegex, existingEmailUser, phoneRegex, existingPhoneUser, isMatch, passwordRegex, _c, token, error_2;
    var userId = _b.userId, name = _b.name, email = _b.email, phoneNumber = _b.phoneNumber, currentPassword = _b.currentPassword, newPassword = _b.newPassword;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 10, , 11]);
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _d.sent();
                if (!user) {
                    throw new Error("User not found");
                }
                nameRegex = /^[A-Z][a-zA-Z\s]*$/;
                if (name) {
                    if (!nameRegex.test(name)) {
                        throw new Error("Invalid name format. The first letter must be capitalized.");
                    }
                    user.name = name;
                }
                emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email) return [3 /*break*/, 3];
                if (!emailRegex.test(email)) {
                    throw new Error("Invalid email format.");
                }
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 2:
                existingEmailUser = _d.sent();
                if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
                    throw new Error("Email already in use");
                }
                user.email = email;
                _d.label = 3;
            case 3:
                phoneRegex = /^\+20\d{10}$/;
                if (!phoneNumber) return [3 /*break*/, 5];
                if (!phoneRegex.test(phoneNumber)) {
                    throw new Error("Invalid phone number format. It must match +20XXXXXXXXXX.");
                }
                return [4 /*yield*/, userModel_1.default.findOne({ phoneNumber: phoneNumber })];
            case 4:
                existingPhoneUser = _d.sent();
                if (existingPhoneUser && existingPhoneUser._id.toString() !== userId) {
                    throw new Error("Phone number already in use");
                }
                user.phoneNumber = phoneNumber;
                _d.label = 5;
            case 5:
                if (!(currentPassword && newPassword)) return [3 /*break*/, 8];
                return [4 /*yield*/, bcrypt_1.default.compare(currentPassword, user.password)];
            case 6:
                isMatch = _d.sent();
                if (!isMatch) {
                    throw new Error("Current password is incorrect");
                }
                passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&*]).{10,}$/;
                if (!passwordRegex.test(newPassword)) {
                    throw new Error("New password does not meet criteria");
                }
                _c = user;
                return [4 /*yield*/, bcrypt_1.default.hash(newPassword, 10)];
            case 7:
                _c.password = _d.sent();
                _d.label = 8;
            case 8: return [4 /*yield*/, user.save()];
            case 9:
                _d.sent();
                token = generateJWT({
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                });
                return [2 /*return*/, {
                        data: {
                            user: {
                                name: user.name,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                            },
                            token: token,
                        },
                        statusCode: 200,
                    }];
            case 10:
                error_2 = _d.sent();
                if (error_2 instanceof Error) {
                    if (error_2.message.includes('E11000 duplicate key error')) {
                        if (error_2.message.includes('email')) {
                            throw new Error("Email already in use");
                        }
                        else if (error_2.message.includes('phoneNumber')) {
                            throw new Error("Phone number already in use");
                        }
                    }
                    throw new Error(error_2.message || "Server error");
                }
                else {
                    throw new Error("An unknown error occurred");
                }
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var resendVerificationEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, verificationToken, verificationLink, emailOptions, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, { data: "User not found", statusCode: 400 }];
                }
                // Check if user is already verified
                if (user.verified) {
                    return [2 /*return*/, { data: "User already verified", statusCode: 400 }];
                }
                return [4 /*yield*/, Token.findOne({ userId: user._id })];
            case 2:
                token = _a.sent();
                if (!!token) return [3 /*break*/, 4];
                verificationToken = generateToken();
                token = new Token({
                    userId: user._id,
                    token: verificationToken
                });
                return [4 /*yield*/, token.save()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                verificationLink = "http://localhost:5173/users/".concat(user._id, "/verify/").concat(token.token);
                emailOptions = {
                    to: email,
                    subject: 'Please verify your email address',
                    html: "<p>Click <a href=\"".concat(verificationLink, "\">here</a> to verify your email address.</p>"),
                };
                return [4 /*yield*/, (0, SendVrifyMail_1.default)(emailOptions)];
            case 5:
                _a.sent();
                return [2 /*return*/, { data: "Verification email sent. Please check your inbox.", statusCode: 200 }];
            case 6:
                error_3 = _a.sent();
                console.error('Error resending verification email:', error_3);
                return [2 /*return*/, { data: "Server error", statusCode: 500 }];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.resendVerificationEmail = resendVerificationEmail;
