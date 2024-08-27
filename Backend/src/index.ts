import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/userRoutes';
import drinksRoutes from './routes/drinksRoutes';
import pizzasRoute from './routes/pizzaRoute';
import appitizersRoute from './routes/appitizerRoute';
import cartRoutes from './routes/CartRoutes';
import cors from 'cors';
import orderRoutes from './routes/OrderRoutes';
import contactRoute from './routes/contactRoute';
import dotenv from 'dotenv';
import { seedInitialAppitizers } from './service/appitizerService';
import { seedInitialDrinks } from './service/drinkService';
import { seedInitialPizzas } from './service/pizzaService';

dotenv.config();

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

// Apply CORS globally
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string, {
    serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
.then(() => console.log('Mongo Connected Successfully!'))
.catch((err) => console.log('Failed to connect to MongoDB', err));

// Route setup
app.use('/users', usersRoutes);
app.use('/drinks', drinksRoutes);
app.use('/cart', cartRoutes);
app.use('/confirm', orderRoutes);
app.use('/pizza', pizzasRoute);
app.use('/appitizer', appitizersRoute);
app.use('/contact', contactRoute);


// Seed initial data
seedInitialAppitizers();
seedInitialDrinks();
seedInitialPizzas();

app.get('/appitizer', (req, res) => {
    res.json({ message: "Appetizer data here" });
  });

seedInitialAppitizers()
seedInitialDrinks()
seedInitialPizzas()


app.listen(port, () =>{
    console.log(`Server Is Running On Port ${port}`);
});
