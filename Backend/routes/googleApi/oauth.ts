import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const oAuthClient = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

router.get('/', (req, res) => {
  const authorizeUrl = oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'openid', 'email'],
    prompt: 'consent'
  });
  res.json({ url: authorizeUrl });
});

export default router;
