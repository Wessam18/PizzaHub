import  { Request, Response, NextFunction } from 'express'
import userModel from '../../models/userModel'
import jwt from 'jsonwebtoken'
import { ExtendRequest } from '../types/ExtendReq'

const validateJWT = (req: ExtendRequest,  res: Response, next: NextFunction) => {
    const authHeader = req.get('authorization')
    if(!authHeader) {
        res.status(403).send("Auth Wasn't Provided");
        return;
    }
    const token = authHeader.split(" ")[1];
    if(!token) {
        res.status(403).send("Bearer Token Not Found")
        return;
    }
    jwt.verify(token, 'F6F5BB625C8298836B7574DF71DFD', async (err, payload) => {
        if(err) {
            res.status(403).send("Invalid Token")
            return;
        }
        if(!payload) {
            res.status(403).send("Invalid Token")
            return;
        }
        const userPayload = payload as {email: string, name:string, phoneNumber: string}
        const user = await userModel.findOne({email: userPayload.email} )
        if (!user) {
            res.status(404).send("User Not Found");
            return;
        }
        req.user = user;
        next();
    })
}

export default validateJWT;
