"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var drinksRoutes_1 = __importDefault(require("./routes/drinksRoutes"));
var pizzaRoute_1 = __importDefault(require("./routes/pizzaRoute"));
var appitizerRoute_1 = __importDefault(require("./routes/appitizerRoute"));
var CartRoutes_1 = __importDefault(require("./routes/CartRoutes"));
var cors_1 = __importDefault(require("cors"));
var OrderRoutes_1 = __importDefault(require("./routes/OrderRoutes"));
var contactRoute_1 = __importDefault(require("./routes/contactRoute"));
var dotenv_1 = __importDefault(require("dotenv"));
var appitizerService_1 = require("./service/appitizerService");
var drinkService_1 = require("./service/drinkService");
var pizzaService_1 = require("./service/pizzaService");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(function () { return console.log('Mongo Connected Successfully!'); })
    .catch(function (err) { return console.log('Failed to connect to MongoDB', err); });
app.use('/users', userRoutes_1.default);
app.use('/drinks', drinksRoutes_1.default);
app.use('/cart', CartRoutes_1.default);
app.use('/confirm', OrderRoutes_1.default);
app.use('/pizza', pizzaRoute_1.default);
app.use('/appitizer', appitizerRoute_1.default);
app.use('/contact', contactRoute_1.default);
(0, appitizerService_1.seedInitialAppitizers)();
(0, drinkService_1.seedInitialDrinks)();
(0, pizzaService_1.seedInitialPizzas)();
app.listen(port, function () {
    console.log("Server Is Running On Port ".concat(port));
});
