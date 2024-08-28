"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var userRoutes_1 = require("./routes/userRoutes");
var drinksRoutes_1 = require("./routes/drinksRoutes");
var pizzaRoute_1 = require("./routes/pizzaRoute");
var appitizerRoute_1 = require("./routes/appitizerRoute");
var CartRoutes_1 = require("./routes/CartRoutes");
var OrderRoutes_1 = require("./routes/OrderRoutes");
var contactRoute_1 = require("./routes/contactRoute");
var dotenv_1 = require("dotenv");
var appitizerService_1 = require("./service/appitizerService");
var drinkService_1 = require("./service/drinkService");
var pizzaService_1 = require("./service/pizzaService");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var port = 5001;
app.use(express_1["default"].json());
var corsOptions = {
    origin: 'https://pizza-hub-peach.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
mongoose_1["default"].connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
    .then(function () { return console.log('Mongo Connected Successfully!'); })["catch"](function (err) { return console.log('Failed to connect to MongoDB', err); });
app.use('/users', userRoutes_1["default"]);
app.use('/drinks', drinksRoutes_1["default"]);
app.use('/cart', CartRoutes_1["default"]);
app.use('/confirm', OrderRoutes_1["default"]);
app.use('/pizza', pizzaRoute_1["default"]);
app.use('/appitizer', appitizerRoute_1["default"]);
app.use('/contact', contactRoute_1["default"]);
(0, appitizerService_1.seedInitialAppitizers)();
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
(0, drinkService_1.seedInitialDrinks)();
(0, pizzaService_1.seedInitialPizzas)();
app.listen(port, function () {
    console.log("Server Is Running On Port ".concat(port));
});
