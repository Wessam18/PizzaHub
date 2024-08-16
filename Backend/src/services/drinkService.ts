import drinksModel from '../models/drinkModel'
import { Request, Response } from 'express';


export const getAllDrinks = async() => {
    return await drinksModel.find()
}

export const seedInitialDrinks = async () => {
    const products = [
          {
            image: "https://www.google.com/imgres?q=pepsi&imgurl=https%3A%2F%2Fwww.mustakshif.com%2Fpublic%2Fuploads%2Fproducts%2Fpepsi-pepsi-cans-30x375ml_9313820001470_Mustakshif.jpg&imgrefurl=https%3A%2F%2Fwww.mustakshif.com%2Fproduct%2Fdetail%2F9313820001470%2Fpepsi-cans-30x375ml&docid=g2VcOv-pdNZVIM&tbnid=DZCX90QF2_UElM&vet=12ahUKEwiIwKePvvKHAxW5VaQEHVDwCpoQM3oECDQQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwiIwKePvvKHAxW5VaQEHVDwCpoQM3oECDQQAA",
            title: "Pepsi",
            price: 20,
          },
          {
            image: "https://www.google.com/imgres?q=mirinda&imgurl=https%3A%2F%2Fsnackje.com%2Fwp-content%2Fuploads%2F2024%2F05%2FMirinda-Orange-Can-320ml.webp&imgrefurl=https%3A%2F%2Fsnackje.com%2Fproduct%2Fmirinda-orange-320ml%2F&docid=7T7r5oCNllsRDM&tbnid=zmTh6w3cCIQr1M&vet=12ahUKEwiCjfWivvKHAxWyUaQEHWIdBkgQM3oFCIABEAA..i&w=1000&h=1000&hcb=2&ved=2ahUKEwiCjfWivvKHAxWyUaQEHWIdBkgQM3oFCIABEAA",
            title: "Mirinda",
            price: 20,
          },
          {
            image: "https://www.google.com/imgres?q=mineral%20water&imgurl=http%3A%2F%2Fqne.com.pk%2Fcdn%2Fshop%2Fproducts%2Faquafina2.png%3Fv%3D1642574856&imgrefurl=https%3A%2F%2Fqne.com.pk%2Fproducts%2Faquafina-mineral-water-pet-bottle-500-ml&docid=zJv33_05Me32kM&tbnid=5L1Sn57vW2dyqM&vet=12ahUKEwi6zYiyvvKHAxUYAfsDHQEdNLoQM3oECEgQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwi6zYiyvvKHAxUYAfsDHQEdNLoQM3oECEgQAA",
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
