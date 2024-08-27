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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedInitialPizzas = exports.getAllPizzas = void 0;
const pizzaModel_1 = __importDefault(require("../models/pizzaModel"));
const getAllPizzas = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield pizzaModel_1.default.find();
});
exports.getAllPizzas = getAllPizzas;
const seedInitialPizzas = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = [
        {
            image: "https://store.eurostarfoods.co.uk/cdn/shop/articles/Pizza-Margarita-Frumenta_900x.jpg?v=1631279490",
            title: "Margherita",
            details: "A traditional Margherita pizza with fresh mozzarella, basil, and tomatoes.",
            sprice: 80,
            mprice: 150,
            lprice: 180,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy84Loxp9I5SltGOfUU89qCStK6hyXSiolQgLF6Xl1yEAcngyiBOnIkguDiPaPDsJwTDs&usqp=CAU",
            title: "Six Cheese",
            details: "A pizza loaded with six different cheeses for the ultimate cheesy experience.",
            sprice: 85,
            mprice: 130,
            lprice: 190,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://topsecretrecipes.com/images/product/dominos-cheeseburger-pizza-copycat-recipe.jpg",
            title: "Cheese Burger",
            details: "All the flavors of a cheeseburger on a pizza, with plenty of cheese.",
            sprice: 90,
            mprice: 140,
            lprice: 200,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://bakingamoment.com/wp-content/uploads/2024/04/IMG_3069-chicken-bacon-ranch-pizza.jpg",
            title: "Smoky Ranch",
            details: "Smoky flavors paired with a creamy ranch base for a unique taste.",
            sprice: 95,
            mprice: 150,
            lprice: 210,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Garden-Special.jpg",
            title: "Little Italy",
            details: "A pizza inspired by the flavors of Italy, with fresh tomatoes and basil.",
            sprice: 100,
            mprice: 160,
            lprice: 220,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://img.freepik.com/premium-photo/pizza-with-mushrooms-mushrooms-it-sits-table_985633-20430.jpg?w=740",
            title: "Garden Special",
            details: "Tomato, Onions, Green Pepper, Fresh Mushroom, Black Olives",
            sprice: 105,
            mprice: 170,
            lprice: 230,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://images.zyda.co/cdn-cgi/image/width=1080,quality=75,f=auto,metadata=none/photos/menu_items/photo_urls/e6fedec2-0bf3-4a92-af7b-b41718ea924b/original/%D8%B1%D8%A7%D9%86%D8%B4_%D8%AA%D8%B4%D9%83%D9%86_%D8%A8%D9%8A%D9%83%D9%88%D9%86.jpg?1707316270",
            title: "Chicken Ranch",
            details: "Tender chicken topped with a creamy ranch sauce and fresh vegetables.",
            sprice: 110,
            mprice: 180,
            lprice: 240,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://img.freepik.com/premium-photo/pizza-with-shrimps-kalamata-olives-pesto-mozzarella-cheese-basil-cherry-tomatoes-chili_162695-56089.jpg?ga=GA1.1.1105971845.1724013645&semt=ais_hybrid",
            title: "Shrimps",
            details: "Shrimps, Tomato, Onions, Green Pepper.",
            sprice: 115,
            mprice: 190,
            lprice: 260,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Mexican-Ole.jpg",
            title: "Mexican Ole",
            details: "Grilled Chicken, Tomato, Onions, Green Pepper, Fresh Mushroom, Jalapeno",
            sprice: 120,
            mprice: 200,
            lprice: 260,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://img.freepik.com/premium-photo/pepperoni-pizza-with-mozzarella-cheese-tomatoes-basil-black-background_1308157-112913.jpg?w=740",
            title: "Spicy Pepperoni Ranch",
            details: "Pepperoni pizza with a kick, combined with creamy ranch sauce.",
            sprice: 125,
            mprice: 210,
            lprice: 270,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Chicken-BBQ.jpg",
            title: "Chicken BBQ",
            details: "juicy chicken smothered in a tangy barbecue sauce. This pizza is topped with a blend of melted cheeses, red onions, and cilantro, offering a perfect balance of smoky, sweet, and zesty flavors.",
            sprice: 130,
            mprice: 220,
            lprice: 280,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Buffalo-Poppers-Pizza.jpg",
            title: "Buffalo Poppers",
            details: "Chicken Poppers,Beef Bacon, Onions, Jalapeno Pepper, Ranch Sauce with Buffalo Sauce Drizzled on top.",
            sprice: 170,
            mprice: 240,
            lprice: 300,
            ssize: "Small",
            msize: "Medium",
            lsize: "Large",
            itemType: "Pizza"
        },
    ];
    const existedPizzas = yield (0, exports.getAllPizzas)();
    if (existedPizzas.length === 0) {
        yield pizzaModel_1.default.insertMany(products);
    }
});
exports.seedInitialPizzas = seedInitialPizzas;
