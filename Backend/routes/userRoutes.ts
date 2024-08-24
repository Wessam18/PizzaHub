import express, { Request, Response } from 'express';
import { register,   signin } from '../service/userService';
import { updateUser } from '../service/userService'
import validateJWT from '../src/MiddleWares/validateJWT';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';
const  Token = require('../models/token')
const dotenv = require('dotenv')
dotenv.config();
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'
import VreifyEmail from '../src/MiddleWares/SendVrifyMail';
const router = express.Router()
import { resendVerificationEmail } from '../service/userService';

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

router.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(400).send({ message: "Invalid Link" });

        const token = await Token.findOne({ userId: user._id, token: req.params.token });
        if (!token) return res.status(400).send({ message: "Invalid Link" });

        user.verified = true;
        await user.save();
        setTimeout(async () => {
          await token.deleteOne();
      }, 15000);
        res.status(200).send({ message: "Email Verified Successfully" });
    } catch (error) {
        console.error('Error during email verification:', error); // Log the error details
        res.status(500).send({ message: 'An error occurred while verifying the user' });
    }
});

  router.post('/ForgotPassword', async (req, res) => {
  const { email } = req.body;

  try {
      const user = await userModel.findOne({ email });
      if (!user) {
          return res.status(404).send({ status: "User Doesn't Exist" });
      }

      const token = jwt.sign({ id: user._id }, "F6F5BB625C8298836B7574DF71DFD", { expiresIn: "1d" });

      const resetLink = `http://localhost:5173/ResetPassword/${user._id}/${token}`;

      await VreifyEmail({
          to: email,
          subject: 'Reset Your Password',
          html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      });

      res.status(200).send({ status: 'Password reset email sent successfully.' });
  } catch (error) {
      console.error('Error during password reset:', error);
      res.status(500).send({ status: 'An error occurred while sending the password reset email.' });
  }
});
interface ResetPasswordParams {
  id: string;
  token: string;
}

router.post('/ResetPassword/:id/:token', async (req: Request, res: Response) => {
  const { id, token } = req.params;
  const { password } = req.body;

  if (!id || !token || !password) {
    return res.status(400).json({ status: "Missing required fields" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    if (!result) {
      return res.status(404).json({ status: "User not found" });
    }

    res.status(200).json({ status: "Success" });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ status: "Invalid token" });
    }

    console.error('Error during password reset:', error);
    res.status(500).json({ status: "Error during password reset" });
  }
});

router.post('/resend-verification-email', async (req, res) => {
  const { email } = req.body;

  const result = await resendVerificationEmail(email);
  res.status(result.statusCode).json(result);
});

export default  router
