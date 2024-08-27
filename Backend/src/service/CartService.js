"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.clearUserCart = exports.addItemToCart = exports.getActiveCart = void 0;
var cartModel_1 = require("../models/cartModel");
var pizzaModel_1 = require("../models/pizzaModel");
var appitizerModel_1 = require("../models/appitizerModel");
var drinkModel_1 = require("../models/drinkModel");
var CreateCartUser = function (_a) {
    var userId = _a.userId;
    return __awaiter(void 0, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cartModel_1.CartModel.create({ userId: userId, total: 0 })];
                case 1:
                    cart = _b.sent();
                    return [4 /*yield*/, cart.save()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, cart];
            }
        });
    });
};
var getActiveCart = function (_a) {
    var userId = _a.userId;
    return __awaiter(void 0, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cartModel_1.CartModel.findOne({ userId: userId, status: "active" })];
                case 1:
                    cart = _b.sent();
                    if (!!cart) return [3 /*break*/, 3];
                    return [4 /*yield*/, CreateCartUser({ userId: userId })];
                case 2:
                    cart = _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/, cart];
            }
        });
    });
};
exports.getActiveCart = getActiveCart;
var addItemToCart = function (_a) {
    var userId = _a.userId, itemId = _a.itemId, quantity = _a.quantity, size = _a.size, itemType = _a.itemType;
    return __awaiter(void 0, void 0, void 0, function () {
        var cart, item, price, title, _b, totalPrice, updatedCart;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, exports.getActiveCart)({ userId: userId })];
                case 1:
                    cart = _c.sent();
                    _b = itemType;
                    switch (_b) {
                        case 'Pizza': return [3 /*break*/, 2];
                        case 'Drinks': return [3 /*break*/, 4];
                        case 'Appetizers': return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 2: return [4 /*yield*/, pizzaModel_1["default"].findById(itemId)];
                case 3:
                    item = _c.sent();
                    if (!item)
                        return [2 /*return*/, { data: "Pizza Wasn't Found", statusCode: 400 }];
                    switch (size) {
                        case 'Small':
                            price = item.sprice;
                            break;
                        case 'Medium':
                            price = item.mprice;
                            break;
                        case 'Large':
                            price = item.lprice;
                            break;
                        default:
                            return [2 /*return*/, { data: "Invalid Size", statusCode: 400 }];
                    }
                    title = item.title;
                    return [3 /*break*/, 9];
                case 4: return [4 /*yield*/, drinkModel_1["default"].findById(itemId)];
                case 5:
                    item = _c.sent();
                    if (!item)
                        return [2 /*return*/, { data: "Drink Wasn't Found", statusCode: 400 }];
                    price = item.price;
                    title = item.title;
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, appitizerModel_1["default"].findById(itemId)];
                case 7:
                    item = _c.sent();
                    if (!item)
                        return [2 /*return*/, { data: "Appetizer Wasn't Found", statusCode: 400 }];
                    price = item.price;
                    title = item.title;
                    return [3 /*break*/, 9];
                case 8: return [2 /*return*/, { data: "Invalid Item Type", statusCode: 400 }];
                case 9:
                    totalPrice = price * quantity;
                    cart.items.push(__assign({ itemId: itemId, price: totalPrice, quantity: quantity, title: title }, (itemType === 'Pizza' && { size: size })));
                    cart.total += totalPrice;
                    return [4 /*yield*/, cart.save()];
                case 10:
                    updatedCart = _c.sent();
                    return [2 /*return*/, { data: updatedCart, statusCode: 200 }];
            }
        });
    });
};
exports.addItemToCart = addItemToCart;
var clearUserCart = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getActiveCart)({ userId: userId })];
            case 1:
                cart = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, cartModel_1.CartModel.updateOne({ userId: userId }, { $set: { status: 'cleared', items: [], total: 0 } })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Error clearing cart:', error_1);
                throw new Error('Failed to clear cart');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.clearUserCart = clearUserCart;
