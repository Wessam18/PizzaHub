import express from 'express'
import mongoose from 'mongoose'
import usersRoutes from '../routes/userRoutes'
import drinksRoutes from '../routes/drinksRoutes'
import pizzasRoute from '../routes/pizzaRoute'
import appitizersRoute from '../routes/appitizerRoute'
import { seedInitialDrinks } from "../service/drinkService"
import { seedInitialPizzas } from '../service/pizzaService';
import { seedInitialAppitizers } from '../service/appitizerService';

import cartRoutes from '../routes/CartRoutes'
import cors from 'cors';
import orderRoutes from '../routes/OrderRoutes'


const app = express()
const port = 5000;

app.use(express.json())

app.use(cors());


mongoose
    .connect('mongodb://localhost:27017/PizzaHub')
    .then(() => console.log('Mongo Connected Successfully!'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

seedInitialDrinks();
seedInitialPizzas();
seedInitialAppitizers();

app.use('/users', usersRoutes);
app.use('/drinks', drinksRoutes);
app.use('/cart', cartRoutes);
app.use('/confirm', orderRoutes)
app.use('/pizza', pizzasRoute);
app.use('/appitizer', appitizersRoute)


app.listen(port, () =>{
    console.log(`Server Is Running On Port ${port}`);
});
