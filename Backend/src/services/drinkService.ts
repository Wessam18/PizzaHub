import drinksModel from '../models/drinkModel'
import { Request, Response } from 'express';


export const getAllDrinks = async() => {
    return await drinksModel.find()
}

export const seedInitialDrinks = async () => {
    const products = [
          {
            image: "https://www.papajohnsegypt.com/images/Products/Pepsi.jpg",
            title: "Pepsi",
            price: 20,
          },
          {
            image: "https://www.papajohnsegypt.com/images/Products/Mirinda.jpg",
            title: "Mirinda",
            price: 20,
          },
          {
            image: "https://www.papajohnsegypt.com/images/Products/7up.jpg",
            title: "7UP",
            price: 20,
          },
          {
            image: "https://www.nestlepurelife.com/pk/sites/g/files/xknfdk411/files/1500ml_0_1.jpg",
            title: "Mineral Water",
            price: 20,
          },
        ];

// Check if the database is empty
const existedDrinks = await getAllDrinks();
    if (existedDrinks.length === 0) {
        // Insert initial products if the database is empty
        await drinksModel.insertMany(products)
    } else {
      // Add new products only if they don't already exist
      for (const product of products) {
          const existingProduct = await drinksModel.findOne({ title: product.title });
          if (!existingProduct) {
              await drinksModel.create(product);
          }
      }
  }
    
}
