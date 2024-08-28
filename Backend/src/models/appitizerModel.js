"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var appitizersSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    itemType: { type: String, "default": "Appitizers" }
});
var appitizersModel = mongoose_1["default"].model('appitizers', appitizersSchema);
exports["default"] = appitizersModel;
