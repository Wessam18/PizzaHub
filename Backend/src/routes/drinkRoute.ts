import express from 'express'
import { getAllDrinks } from '../services/drinkService'
const  router = express.Router()

router.get('/', async(req, res) =>  {
    const drinks = await getAllDrinks();
    res.status(200).send(drinks)
})
export default router;
