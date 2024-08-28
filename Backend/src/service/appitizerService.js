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
        while (_) try {
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
exports.__esModule = true;
exports.seedInitialAppitizers = exports.getAllAppitizers = void 0;
var appitizerModel_1 = require("../models/appitizerModel");
var getAllAppitizers = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, appitizerModel_1["default"].find()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAllAppitizers = getAllAppitizers;
var seedInitialAppitizers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var products, existedAppitizers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                products = [
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Bread-Sticks.jpg",
                        title: "Bread Sticks",
                        details: "Delicious oven - baked sticks. Served with BBQ Sauce.",
                        price: 45,
                        itemType: "Appitizers"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Cheese-Sticks.jpg",
                        title: "Cheese Sticks",
                        details: "Fresh dough with a blend of Garlic Sauce and Mozzrella cheese, Served with BBQ Sauce.",
                        price: 99,
                        itemType: "Appitizers"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Spicy-Pepperoni-Ranch-Rolls-item.jpg",
                        title: "Spicy Pepperoni Ranch Rolls",
                        details: "8 Rolls stuffed with Pepperoni, Jalapeno, Mozzarella Cheese and Ranch Sauce.",
                        price: 145,
                        itemType: "Appitizers"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Chicken-Ranch-Roll-WS.jpg",
                        title: "Chicken Ranch Rolls",
                        details: "8 Chicken Rolls stuffed with Mozzarella Cheese and Ranch Sauce.",
                        price: 145,
                        itemType: "Appitizers"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/tandoori-wings.jpg",
                        title: "Tandoori Wings",
                        details: "Savory wings baked to the bone served with barbeque sauce.",
                        price: 109,
                        itemType: "Appitizers"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Spicy-Chicken-Wings.jpg",
                        title: "Spicy Chicken Wings",
                        details: "Savory wings baked to the bone served with barbeque sauce.",
                        price: 115,
                        itemType: "Appitizers"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Chicken-Poppers.jpg",
                        title: "Chicken Poppers",
                        details: "9 pieces of Tender all-white chicken breasts, breaded and oven baked, Served with Ranch Sauce.",
                        price: 160,
                        itemType: "Appitizers"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Tandoori-Poppers.jpg",
                        title: "Tandoori Poppers",
                        details: "9 pieces of Tender all-white chicken breasts, breaded and oven baked, Served with Ranch Sauce.",
                        price: 170,
                        itemType: "Appitizers"
                    },
                ];
                return [4 /*yield*/, (0, exports.getAllAppitizers)()];
            case 1:
                existedAppitizers = _a.sent();
                if (!(existedAppitizers.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, appitizerModel_1["default"].insertMany(products)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.seedInitialAppitizers = seedInitialAppitizers;
