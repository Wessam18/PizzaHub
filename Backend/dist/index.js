"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const drinksRoutes_1 = __importDefault(require("./routes/drinksRoutes"));
const pizzaRoute_1 = __importDefault(require("./routes/pizzaRoute"));
const appitizerRoute_1 = __importDefault(require("./routes/appitizerRoute"));
const CartRoutes_1 = __importDefault(require("./routes/CartRoutes"));
const cors_1 = __importDefault(require("cors"));
const OrderRoutes_1 = __importDefault(require("./routes/OrderRoutes"));
const contactRoute_1 = __importDefault(require("./routes/contactRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const appitizerService_1 = require("./service/appitizerService");
const drinkService_1 = require("./service/drinkService");
const pizzaService_1 = require("./service/pizzaService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
// CORS configuration
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
// Apply CORS globally
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
    .then(() => console.log('Mongo Connected Successfully!'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));
// Route setup
app.use('/users', userRoutes_1.default);
app.use('/drinks', drinksRoutes_1.default);
app.use('/cart', CartRoutes_1.default);
app.use('/confirm', OrderRoutes_1.default);
app.use('/pizza', pizzaRoute_1.default);
app.use('/appitizer', appitizerRoute_1.default);
app.use('/contact', contactRoute_1.default);
// Seed initial data
(0, appitizerService_1.seedInitialAppitizers)();
(0, drinkService_1.seedInitialDrinks)();
(0, pizzaService_1.seedInitialPizzas)();
app.get('/appitizer', (req, res) => {
    res.json({ message: "Appetizer data here" });
});
(0, appitizerService_1.seedInitialAppitizers)();
(0, drinkService_1.seedInitialDrinks)();
(0, pizzaService_1.seedInitialPizzas)();
app.listen(port, () => {
    console.log(`Server Is Running On Port ${port}`);
});
