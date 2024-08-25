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
var express_1 = __importDefault(require("express"));
var userService_1 = require("../service/userService");
var userService_2 = require("../service/userService");
var validateJWT_1 = __importDefault(require("../MiddleWares/validateJWT"));
var userModel_1 = __importDefault(require("../models/userModel"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token = require('../models/token');
var dotenv = require('dotenv');
dotenv.config();
var bcrypt_1 = __importDefault(require("bcrypt"));
var SendVrifyMail_1 = __importDefault(require("../MiddleWares/SendVrifyMail"));
var router = express_1.default.Router();
var userService_3 = require("../service/userService");
router.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, phoneNumber, password, _b, statusCode, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, phoneNumber = _a.phoneNumber, password = _a.password;
                return [4 /*yield*/, (0, userService_1.register)({ name: name, email: email, phoneNumber: phoneNumber, password: password })];
            case 1:
                _b = _c.sent(), statusCode = _b.statusCode, data = _b.data;
                res.status(statusCode).send(data);
                return [2 /*return*/];
        }
    });
}); });
router.post('/signin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, _b, statusCode, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, userService_1.signin)({ email: email, password: password })];
            case 1:
                _b = _c.sent(), statusCode = _b.statusCode, data = _b.data;
                res.status(statusCode).send(data);
                return [2 /*return*/];
        }
    });
}); });
router.put('/account', validateJWT_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, phoneNumber, currentPassword, newPassword, userId, _b, data, statusCode, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, phoneNumber = _a.phoneNumber, currentPassword = _a.currentPassword, newPassword = _a.newPassword;
                userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).send({ message: 'Unauthorized' })];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, userService_2.updateUser)({ userId: userId, name: name, email: email, phoneNumber: phoneNumber, currentPassword: currentPassword, newPassword: newPassword })];
            case 2:
                _b = _d.sent(), data = _b.data, statusCode = _b.statusCode;
                res.status(statusCode).send(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                if (error_1 instanceof Error) {
                    console.error('Update Error:', error_1.message);
                    res.status(400).send({ message: error_1.message });
                }
                else {
                    console.error('Unknown Error:', error_1);
                    res.status(500).send({ message: 'An unknown error occurred' });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/account', validateJWT_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ message: 'User not found' })];
                }
                res.status(200).send({ user: user });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(500).send({ message: 'An error occurred while fetching user data' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete('/account', validateJWT_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    return [2 /*return*/, res.status(400).send({ message: 'User ID is missing' })];
                }
                return [4 /*yield*/, userModel_1.default.findByIdAndDelete(userId)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ message: 'User not found' })];
                }
                res.status(200).send({ message: 'User deleted successfully', user: user });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error('Error deleting user:', error_3);
                res.status(500).send({ message: 'An error occurred while deleting the user' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id/verify/:token", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, userModel_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ message: "Invalid Link" })];
                return [4 /*yield*/, Token.findOne({ userId: user._id, token: req.params.token })];
            case 2:
                token_1 = _a.sent();
                if (!token_1)
                    return [2 /*return*/, res.status(400).send({ message: "Invalid Link" })];
                user.verified = true;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, token_1.deleteOne()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 15000);
                res.status(200).send({ message: "Email Verified Successfully" });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error('Error during email verification:', error_4); // Log the error details
                res.status(500).send({ message: 'An error occurred while verifying the user' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/ForgotPassword', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, resetLink, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ status: "User Doesn't Exist" })];
                }
                token = jsonwebtoken_1.default.sign({ id: user._id }, "F6F5BB625C8298836B7574DF71DFD", { expiresIn: "1d" });
                resetLink = "http://localhost:5173/ResetPassword/".concat(user._id, "/").concat(token);
                return [4 /*yield*/, (0, SendVrifyMail_1.default)({
                        to: email,
                        subject: 'Reset Your Password',
                        html: "<p>Click <a href=\"".concat(resetLink, "\">here</a> to reset your password.</p>"),
                    })];
            case 3:
                _a.sent();
                res.status(200).send({ status: 'Password reset email sent successfully.' });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.error('Error during password reset:', error_5);
                res.status(500).send({ status: 'An error occurred while sending the password reset email.' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/ResetPassword/:id/:token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, token, password, decoded, hashedPassword, result, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, id = _a.id, token = _a.token;
                password = req.body.password;
                if (!id || !token || !password) {
                    return [2 /*return*/, res.status(400).json({ status: "Missing required fields" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(id, { password: hashedPassword }, { new: true })];
            case 3:
                result = _b.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ status: "User not found" })];
                }
                res.status(200).json({ status: "Success" });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _b.sent();
                if (error_6.name === 'JsonWebTokenError') {
                    return [2 /*return*/, res.status(400).json({ status: "Invalid token" })];
                }
                console.error('Error during password reset:', error_6);
                res.status(500).json({ status: "Error during password reset" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/resend-verification-email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, (0, userService_3.resendVerificationEmail)(email)];
            case 1:
                result = _a.sent();
                res.status(result.statusCode).json(result);
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
