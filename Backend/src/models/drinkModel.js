"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var drinksSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    itemType: { type: String, "default": "Drinks" }
});
var drinksModel = mongoose_1["default"].model('drinks', drinksSchema);
exports["default"] = drinksModel;
