import express from 'express'
import { getAllPizzas } from '../services/pizzaService'
const  router = express.Router()

router.get('/', async(req, res) =>  {
    const pizzas = await getAllPizzas();
    res.status(200).send(pizzas)
})
export default router;
