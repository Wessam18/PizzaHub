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
exports.seedInitialDrinks = exports.getAllDrinks = void 0;
var drinkModel_1 = __importDefault(require("../models/drinkModel"));
var getAllDrinks = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, drinkModel_1.default.find()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAllDrinks = getAllDrinks;
var seedInitialDrinks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var products, existedDrinks, _i, products_1, product, existingProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                products = [
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Pepsi.jpg",
                        title: "Pepsi",
                        price: 20,
                        itemType: "Drinks"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/Mirinda.jpg",
                        title: "Mirinda",
                        price: 20,
                        itemType: "Drinks"
                    },
                    {
                        image: "https://www.papajohnsegypt.com/images/Products/7up.jpg",
                        title: "7UP",
                        price: 20,
                        itemType: "Drinks"
                    },
                    {
                        image: "https://www.nestlepurelife.com/pk/sites/g/files/xknfdk411/files/1500ml_0_1.jpg",
                        title: "Mineral Water",
                        price: 20,
                        itemType: "Drinks"
                    },
                ];
                return [4 /*yield*/, (0, exports.getAllDrinks)()];
            case 1:
                existedDrinks = _a.sent();
                if (!(existedDrinks.length === 0)) return [3 /*break*/, 3];
                // Insert initial products if the database is empty
                return [4 /*yield*/, drinkModel_1.default.insertMany(products)];
            case 2:
                // Insert initial products if the database is empty
                _a.sent();
                return [3 /*break*/, 8];
            case 3:
                _i = 0, products_1 = products;
                _a.label = 4;
            case 4:
                if (!(_i < products_1.length)) return [3 /*break*/, 8];
                product = products_1[_i];
                return [4 /*yield*/, drinkModel_1.default.findOne({ title: product.title })];
            case 5:
                existingProduct = _a.sent();
                if (!!existingProduct) return [3 /*break*/, 7];
                return [4 /*yield*/, drinkModel_1.default.create(product)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 4];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.seedInitialDrinks = seedInitialDrinks;
