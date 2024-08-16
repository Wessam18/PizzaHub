import express from 'express'
import mongoose from 'mongoose'
import userRoute from "./routes/userRoute"
import { seedInitialDrinks } from './services/drinkService';
import drinksRoute from './routes/drinkRoute';
import pizzasRoute from './routes/pizzaRoute'
import { seedInitialPizzas } from './services/pizzaService';
import { seedInitialAppitizers } from './services/appitizerServise';
import appitizersRoute from './routes/appitizerRoute'
//import cartRoutes from '../routes/CartRoutes'
import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express()
const port = 5000;

app.use(express.json())
app.use(cors());

// const mongoURI = process.env.MONGODB_URI;
// if (!mongoURI) {
//     throw new Error("MONGODB_URI is not defined in the environment variables");
// }

mongoose
    .connect('mongodb://localhost:27017/PizzaHub')
    .then(() => console.log('Mongo Connected Successfully!'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

seedInitialDrinks();
seedInitialPizzas();
seedInitialAppitizers();


app.use('/user', userRoute);
app.use('/drink', drinksRoute);
app.use('/pizza', pizzasRoute);
app.use('/appitizer', appitizersRoute)
//app.use('/cart', cartRoutes);

app.listen(port, () =>{
    console.log(`Server Is Running On Port ${port}`);
});
