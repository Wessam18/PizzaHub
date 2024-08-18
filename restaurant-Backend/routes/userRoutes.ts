import express, { Request, Response } from 'express';
import { register,   signin } from '../service/userService';
import { updateUser } from '../service/userService'
import validateJWT from '../src/MiddleWares/validateJWT';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv')
dotenv.config();
const {OAuthClient} = require('google-auth-library');

const passport = require('passport');

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

interface ExtendRequest extends express.Request {
    user?: any;
}

router.put('/account', validateJWT, async (req: ExtendRequest, res: Response) => {
    const { name, email, phoneNumber, currentPassword, newPassword } = req.body;
    const userId = req?.user?._id;
  
    if (!userId) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  
    try {
      const { data, statusCode } = await updateUser({ userId, name, email, phoneNumber, currentPassword, newPassword });
      res.status(statusCode).send(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Update Error:', error.message);
        res.status(400).send({ message: error.message });
      } else {
        console.error('Unknown Error:', error);
        res.status(500).send({ message: 'An unknown error occurred' });
      }
    }
  });

router.get('/account', validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ user });
    } catch (error) {
      res.status(500).send({ message: 'An error occurred while fetching user data' });
    }
  });

  router.delete('/account', validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      if (!userId) {
        return res.status(400).send({ message: 'User ID is missing' });
      }
      const user = await userModel.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully', user });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send({ message: 'An error occurred while deleting the user' });
    }
  });

export default  router
