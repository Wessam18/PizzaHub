import express from 'express'
import { getAllAppitizers } from '../service/appitizerService'
const  router = express.Router()

router.get('/', async(req, res) =>  {
    const appitizers = await getAllAppitizers();
    res.status(200).send(appitizers)
})
export default router;
