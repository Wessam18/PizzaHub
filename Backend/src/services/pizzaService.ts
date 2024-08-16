import pizzasModel from '../models/pizzaModel';


export const getAllPizzas = async() => {
    return await pizzasModel.find()
}

export const seedInitialPizzas = async () => {
    const products = [
      {
        image: "https://www.papajohnsegypt.com/images/Products/Margherita.jpg",
        title: "Margherita",
        details: "A traditional Margherita pizza with fresh mozzarella, basil, and tomatoes.",
        sprice: 80,
        mprice: 150,
        lprice: 180,
        ssize: "Small",
        msize: "Medium",
        lsize: "Large",
      },
      {
        image: "https://www.papajohnsegypt.com/images/Products/6-Cheese.jpg",
        title: "Six Cheese",
        details: "A pizza loaded with six different cheeses for the ultimate cheesy experience.",
        sprice: 85,
        mprice: 130,
        lprice: 190,
        ssize: "Small",
        msize: "Medium",
        lsize: "Large",
      },
      {
        image: "https://www.papajohnsegypt.com/images/Products/cheese-burger.jpg",
        title: "Cheese Burger",
        details: "All the flavors of a cheeseburger on a pizza, with plenty of cheese.",
          sprice: 90,
          mprice: 140,
          lprice: 200,
          ssize: "Small",
          msize: "Medium",
          lsize: "Large",
      },
      {
        image: "https://www.papajohnsegypt.com/images/Products/Smoky-Ranch.jpg",
        title: "Smoky Ranch",
        details: "Smoky flavors paired with a creamy ranch base for a unique taste.",
        sprice: 95,
        mprice: 150,
        lprice: 210,
        ssize: "Small",
        msize: "Medium",
        lsize: "Large",
      },
      {
        image: "https://www.papajohnsegypt.com/images/Products/Little-Italy.jpg",
        title: "Little Italy",
        details: "A pizza inspired by the flavors of Italy, with fresh tomatoes and basil.",
        sprice: 100,
        mprice: 160,
        lprice: 220,
        ssize: "Small",
        msize: "Medium",
        lsize: "Large",
      },
      {
        image: "https://www.papajohnsegypt.com/images/Products/Garden-Special.jpg",
        title: "Garden Special",
        details: "Tomato, Onions, Green Pepper, Fresh Mushroom, Black Olives",
        sprice: 105,
        mprice: 170,
        lprice: 230,
        ssize: "Small",
        msize: "Medium",
        lsize: "Large",
      },
      {
        image: "https://www.papajohnsegypt.com/images/Products/Chicken-Ranch.jpg",
        title: "Chicken Ranch",
        details: "Tender chicken topped with a creamy ranch sauce and fresh vegetables.",
        sprice: 110,
        mprice: 180,
        lprice: 240,
        ssize: "Small",
        msize: "Medium",
        lsize: "Large",
      },
      {
        image: "https://www.papajohnsegypt.com/images/Products/Shrimps.jpg",
        title: "Shrimps",
        details: "Shrimps, Tomato, Onions, Green Pepper.",
        sprice: 115,
        mprice: 190,
        lprice: 260,
        ssize: "Small",
        msize: "Medium",
        lsize: "Large",
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
      },
      {
        image: "https://www.papajohnsegypt.com/images/Products/Spicy-Pepperoni-Ranch-Pizza.jpg",
        title: "Spicy Pepperoni Ranch",
        details: "Pepperoni pizza with a kick, combined with creamy ranch sauce.",
        sprice: 125,
        mprice: 210,
        lprice: 270,
        ssize: "Small",
        msize: "Medium",
        lsize: "Large",
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
      },
        ];


const existedPizzas = await getAllPizzas();
    if (existedPizzas.length === 0) {
        await pizzasModel.insertMany(products)
    }
}
