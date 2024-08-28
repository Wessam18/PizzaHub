"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var pizzasSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    details: { type: String, required: true },
    sprice: { type: Number, required: true },
    mprice: { type: Number, required: true },
    lprice: { type: Number, required: true },
    ssize: { type: String, required: true },
    msize: { type: String, required: true },
    lsize: { type: String, required: true },
    itemType: { type: String, defualt: "pizza" }
});
var pizzasModel = mongoose_1["default"].model('pizzas', pizzasSchema);
exports["default"] = pizzasModel;
