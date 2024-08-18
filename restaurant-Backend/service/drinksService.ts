import drinksModel from '../models/DrinksModel'
import { Request, Response } from 'express';


export const getAllDrinks = async() => {
    return await drinksModel.find()
}

export const seedInitialDrinks = async () => {
    const products = [
          {
            id: 21,
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.yumda.com%2Fen%2Fnews%2F1180019%2Fpepsi-unveils-a-new-logo-and-visual-identity-marking-the-iconic-brand-s-next-era.html&psig=AOvVaw1vXqWsnqqfHITyyZHT59yM&ust=1723513190431000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDmpI-p7ocDFQAAAAAdAAAAABAJ",
            title: "Pepsi",
            price: 20,
          }
        ];
const existedDrinks = await getAllDrinks();
    if (existedDrinks.length === 0) {
        await drinksModel.insertMany(products)
    }
}
