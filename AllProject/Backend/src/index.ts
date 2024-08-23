import express from 'express'
import mongoose from 'mongoose'
import usersRoutes from '../routes/userRoutes'
import drinksRoutes from '../routes/drinksRoutes'
import pizzasRoute from '../routes/pizzaRoute'
import appitizersRoute from '../routes/appitizerRoute'

import cartRoutes from '../routes/CartRoutes'
import cors from 'cors';
import orderRoutes from '../routes/OrderRoutes'
import contactRoute from '../routes/contactRoute'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000;

app.use(express.json())

app.use(cors());


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Mongo Connected Successfully!'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

app.use('/users', usersRoutes);
app.use('/drinks', drinksRoutes);
app.use('/cart', cartRoutes);
app.use('/confirm', orderRoutes)
app.use('/pizza', pizzasRoute);
app.use('/appitizer', appitizersRoute)
app.use('/contact', contactRoute);



app.listen(port, () =>{
    console.log(`Server Is Running On Port ${port}`);
});
