import express, { Request, Response } from 'express';
import { register,   signin } from '../services/userService';
//import { updateUser } from '../service/userService'
//import validateJWT from '../src/MiddleWares/validateJWT';


const router = express.Router()

router.post('/signup', async (req, res) =>  {
    const {name,  email, phoneNumber, password} = req.body
    const {statusCode, data} = await register({ name, email, phoneNumber, password});
    res.status(statusCode).send(data)
})

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    const { statusCode,  data } =  await signin({ email, password })
    res.status(statusCode).send(data)
})


export default  router
