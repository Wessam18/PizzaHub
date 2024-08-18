import express from 'express'
import { getAllAppitizers } from '../services/appitizerService'
const  router = express.Router()

router.get('/', async(req, res) =>  {
    const appitizers = await getAllAppitizers();
    res.status(200).send(appitizers)
})
export default router;
