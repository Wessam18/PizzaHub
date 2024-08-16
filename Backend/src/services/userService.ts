import userModel from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface RegisterParams  {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export const register = async ({name, email, phoneNumber, password}: RegisterParams) => {
    const findUserByEmail = await userModel.findOne({ email })
    if(findUserByEmail) {
        return { data: "Email Already Exists!", statusCode: 400}
    }

    const findUserByPhone = await userModel.findOne({ phoneNumber })
    if(findUserByPhone) {
        return { data: "Phone Number Already Exists!", statusCode: 400}
    }
    const hashPass = await bcrypt.hash(password, 10)
    const newUser = new userModel({ name, email, phoneNumber, password: hashPass })
    await newUser.save()

    return { data: generateJWT({name, email, phoneNumber}), statusCode: 200};

}

interface LoginParams {
    email: string;
    password: string;
}

export const signin = async ({ email, password }: LoginParams) => {
    const findUser = await userModel.findOne({ email })
    if(!findUser) {
        return { data : "Incorrect Email Or Password", statusCode: 400}
    }
    const MatchPass = await bcrypt.compare(password, findUser.password);
    if(MatchPass) {
        return { data: generateJWT({name: findUser.name, email: findUser.email, phoneNumber: findUser.phoneNumber}), statusCode: 200};
    }
    return { data: "Incorrect Email Or Password", statusCode: 400}
}

const generateJWT = (data: any) => {
    return jwt.sign(data, 'zSThmvkzZnpd61Du8e9XkJLYVDt2phPB', { expiresIn: '24h'})
}


