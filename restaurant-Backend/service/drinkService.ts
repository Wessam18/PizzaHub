import drinksModel from '../models/DrinksModel'
import { Request, Response } from 'express';


export const getAllDrinks = async() => {
    return await drinksModel.find()
}

export const seedInitialDrinks = async () => {
    const products = [
          {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbc4Z7DfLx5tRA2RjS7LwxjtiP4Sq-8yZR_4Vk1RflU_7zlMyeE-LDlG2tLTf6TQ4gtgc&usqp=CAU",
            title: "Pepsi",
            price: 20,
          },
          {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1rhfN19UUm8rHHpq6yvbTCwJ_YlKfUS9-vSI-518wfzvChXQaqihxDanz-14VZhE8S8&usqp=CAU",
            title: "Mirinda",
            price: 20,
          },
          {
            image: "https://qne.com.pk/cdn/shop/products/aquafina2.png?v=1642574856",
            title: "Mineral Water",
            price: 20,
          },
        ];

const existedDrinks = await getAllDrinks();
    if (existedDrinks.length === 0) {
        await drinksModel.insertMany(products)
    } else {
      for (const product of products) {
          const existingProduct = await drinksModel.findOne({ title: product.title });
          if (!existingProduct) {
              await drinksModel.create(product);
          }
      }
  }
    
}
