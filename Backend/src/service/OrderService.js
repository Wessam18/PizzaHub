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
var CartService_1 = require("./CartService");
var SendEmail_1 = require("../MiddleWares/SendEmail");
var orderModel_1 = require("../models/orderModel");
var confirmOrder = function (orderDetails) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, name, email, phoneNumber, address, items, emailHtml, newOrder, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = orderDetails.userId, name = orderDetails.name, email = orderDetails.email, phoneNumber = orderDetails.phoneNumber, address = orderDetails.address, items = orderDetails.items;
                if (!items || items.length === 0) {
                    return [2 /*return*/, { message: 'No items to process' }];
                }
                emailHtml = "\n        <h1>Order Confirmation</h1>\n        <p>Thank you for your order, ".concat(name, "!</p>\n        <p>Contact Information:</p>\n        <ul>\n            <li>Email: ").concat(email, "</li>\n            <li>Phone: ").concat(phoneNumber, "</li>\n            <li>Address: ").concat(address, "</li>\n        </ul>\n        <h2>Order Details:</h2>\n        <ul>\n            ").concat(items.map(function (item) { return "\n                <li>\n                    ".concat(item.size ? 'Pizza: ' : item.drink ? 'Drink: ' : item.appetizers ? 'Appetizer: ' : '').concat(item.title, " \n                    ").concat(item.size ? "(Size: ".concat(item.size, ")") : '', "\n                    - Quantity: ").concat(item.quantity, "\n                    - Price: ").concat(item.totalPrice, "\n                </li>\n            "); }).join(''), "\n        </ul>\n        <p>Total: ").concat(items.reduce(function (total, item) { return total + item.totalPrice; }, 0), "</p>\n    ");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, (0, SendEmail_1.sendEmail)({
                        to: "".concat(email, ", PizzaHubStuff@outlook.com"),
                        subject: 'Order Confirmation',
                        html: emailHtml
                    })];
            case 2:
                _a.sent();
                newOrder = new orderModel_1["default"]({
                    userId: userId,
                    name: name,
                    email: email,
                    phone: phoneNumber,
                    address: address,
                    items: items.map(function (item) { return ({
                        itemId: item.itemId,
                        title: item.title,
                        quantity: item.quantity,
                        price: item.totalPrice / item.quantity,
                        size: item.size
                    }); }),
                    total: items.reduce(function (total, item) { return total + item.totalPrice; }, 0),
                    status: 'completed'
                });
                return [4 /*yield*/, newOrder.save()];
            case 3:
                _a.sent();
                // Optionally clear the cart if needed
                return [4 /*yield*/, (0, CartService_1.clearUserCart)(userId)];
            case 4:
                // Optionally clear the cart if needed
                _a.sent();
                return [2 /*return*/, { message: 'Order confirmed and email sent' }]; // Success message
            case 5:
                error_1 = _a.sent();
                console.error('Error processing order:', error_1);
                return [2 /*return*/, { message: 'Error processing order' }]; // Error message
            case 6: return [2 /*return*/];
        }
    });
}); };
exports["default"] = confirmOrder;
