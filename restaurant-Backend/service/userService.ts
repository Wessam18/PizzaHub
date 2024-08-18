import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const register = async ({
  name,
  email,
  phoneNumber,
  password,
}: RegisterParams) => {
  const findUserByEmail = await userModel.findOne({ email });
  if (findUserByEmail) {
    return { data: "Email Already Exists!", statusCode: 400 };
  }
  const findUserByPhone = await userModel.findOne({ phoneNumber });
  if (findUserByPhone) {
    return { data: "Phone Number Already Exists!", statusCode: 400 };
  }
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    name,
    email,
    phoneNumber,
    password: hashPass,
  });
  await newUser.save();
  return { data: generateJWT({ name, email, phoneNumber }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const signin = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Incorrect Email Or Password", statusCode: 400 };
  }
  const MatchPass = await bcrypt.compare(password, findUser.password);
  if (MatchPass) {
    return {
      data: generateJWT({
        name: findUser.name,
        email: findUser.email,
        phoneNumber: findUser.phoneNumber,
      }),
      statusCode: 200,
    };
  }
  return { data: "Incorrect Email Or Password", statusCode: 400 };
};
const generateJWT = (data: any) => {
  return jwt.sign(data, "F6F5BB625C8298836B7574DF71DFD", { expiresIn: "24h" });
};

interface UpdateUserParams {
  userId: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  currentPassword?: string;
  newPassword?: string;
}



export const updateUser = async ({
  userId,
  name,
  email,
  phoneNumber,
  currentPassword,
  newPassword,
}: UpdateUserParams) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Regex for validating the name
    const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
    if (name) {
      if (!nameRegex.test(name)) {
        throw new Error("Invalid name format. The first letter must be capitalized.");
      }
      user.name = name;
    }

    // Regex for validating the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email) {
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
      }
      const existingEmailUser: any = await userModel.findOne({ email });
      if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
        throw new Error("Email already in use");
      }
      user.email = email;
    }

    // Regex for validating the phone number
    const phoneRegex = /^\+20\d{10}$/;
    if (phoneNumber) {
      if (!phoneRegex.test(phoneNumber)) {
        throw new Error("Invalid phone number format. It must match +20XXXXXXXXXX.");
      }
      const existingPhoneUser: any = await userModel.findOne({ phoneNumber });
      if (existingPhoneUser && existingPhoneUser._id.toString() !== userId) {
        throw new Error("Phone number already in use");
      }
      user.phoneNumber = phoneNumber;
    }

    // Password update logic
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw new Error("Current password is incorrect");
      }

      const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&*]).{10,}$/;
      if (!passwordRegex.test(newPassword)) {
        throw new Error("New password does not meet criteria");
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }


    await user.save();

    // Generate JWT token with updated user data

    const token = generateJWT({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    return {
      data: {
        user: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
        token,
      },
      statusCode: 200,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('E11000 duplicate key error')) {
        if (error.message.includes('email')) {
          throw new Error("Email already in use");
        } else if (error.message.includes('phoneNumber')) {
          throw new Error("Phone number already in use");
        }
      }
      throw new Error(error.message || "Server error");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
