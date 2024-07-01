const bcrypt = require("bcryptjs")
import User, { IUser, UserRole } from "../schema/User";
// import { resetPasswordEmailTemplate, sendEmail } from "./email";
// import { createUserTokens } from "./passport-jwt";



export const createUser = async (data: {
    email: string;
    role: UserRole;
    password: string;
  }) => {
    const user = await User.create({ ...data, active: true });
    return user;
  };


export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 12);
    console.log(hash)
    return hash;
  };