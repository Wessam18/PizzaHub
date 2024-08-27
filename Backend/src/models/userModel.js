"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, "enum": ['user', 'admin'], "default": 'user' },
    verified: { type: Boolean, "default": false }
}, { timestamps: true });
var userModel = mongoose_1["default"].model('User', userSchema);
exports["default"] = userModel;
