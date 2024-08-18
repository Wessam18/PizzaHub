import express from 'express'
import mongoose from 'mongoose'
import userRoute from "./routes/userRoute"
import { seedInitialDrinks } from './services/drinkService';
import drinksRoute from './routes/drinkRoute';
import pizzasRoute from './routes/pizzaRoute'
import { seedInitialPizzas } from './services/pizzaService';
import { seedInitialAppitizers } from './services/appitizerService';
import contactRoute from './routes/contactRoute'; // Import the contact route
import appitizersRoute from './routes/appitizerRoute'
import cors from 'cors';


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


app.use('/user', userRoute);
app.use('/drink', drinksRoute);
app.use('/pizza', pizzasRoute);
app.use('/appitizer', appitizersRoute)
app.use('/contact', contactRoute); // Use the contact route under /api


app.listen(port, () =>{
    console.log(`Server Is Running On Port ${port}`);
});
