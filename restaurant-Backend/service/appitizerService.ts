import appitizersModel from '../models/AppetizersModel'


export const getAllAppitizers = async() => {
    return await appitizersModel.find()
}

export const seedInitialAppitizers = async () => {
    const products = [
        {
            image: "https://www.papajohnsegypt.com/images/Products/Bread-Sticks.jpg",
            title: "Bread Sticks",
            details: "Delicious oven - baked sticks. Served with BBQ Sauce.",
            price: 45,
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Cheese-Sticks.jpg",
            title: "Cheese Sticks",
            details: "Fresh dough with a blend of Garlic Sauce and Mozzrella cheese, Served with BBQ Sauce.",
            price: 99,
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Spicy-Pepperoni-Ranch-Rolls-item.jpg",
            title: "Spicy Pepperoni Ranch Rolls",
            details: "8 Rolls stuffed with Pepperoni, Jalapeno, Mozzarella Cheese and Ranch Sauce.",
            price: 145,
          },
          {
            image: "https://www.papajohnsegypt.com/images/Products/Chicken-Ranch-Roll-WS.jpg",
            title: "Chicken Ranch Rolls",
            details: "8 Chicken Rolls stuffed with Mozzarella Cheese and Ranch Sauce.",
            price: 145,
          },
          {
            image: "https://www.papajohnsegypt.com/images/Products/tandoori-wings.jpg",
            title: "Tandoori Wings",
            details: "Savory wings baked to the bone served with barbeque sauce.",
            price: 109,
          },
          {
            image: "https://www.papajohnsegypt.com/images/Products/Spicy-Chicken-Wings.jpg",
            title: "Spicy Chicken Wings",
            details: "Savory wings baked to the bone served with barbeque sauce.",
            price: 115,
          },
          {
            image: "https://www.papajohnsegypt.com/images/Products/Chicken-Poppers.jpg",
            title: "Chicken Poppers",
            details: "9 pieces of Tender all-white chicken breasts, breaded and oven baked, Served with Ranch Sauce.",
            price: 160,
        
        },
        {
            image: "https://www.papajohnsegypt.com/images/Products/Tandoori-Poppers.jpg",
            title: "Tandoori Poppers",
            details: "9 pieces of Tender all-white chicken breasts, breaded and oven baked, Served with Ranch Sauce.",
            price: 170,
        },
        ];


const existedAppitizers = await getAllAppitizers();
    if (existedAppitizers.length === 0) {
        await appitizersModel.insertMany(products)
    }
}
