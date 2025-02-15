const bcrypt = require("bcryptjs")
import User, { IUser, UserRole } from "../schema/User";
import { resetPasswordEmailTemplate, sendEmail } from "./email";
import { createUserTokens } from "./passport-jwt";

export const createUserAndSendLink = async (data: {
  email: string,
  role: UserRole
}) => {
  // const user:IUser = 
  await User.create(data);
  const user = await getUserByEmail(data.email);
  const { accessToken } = await createUserTokens(user!);
  await sendEmail({
    to: user!.email,
    subject: "Reset password",
    html: resetPasswordEmailTemplate(accessToken),
  });
  return user;
}

export const createUser = async (data: {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}) => {
  const user = await User.create({ ...data, isActive: true });
  return user;
};

export const updateUser = async (userId: string, data: Partial<IUser>) => {
  const user = await User.findOneAndUpdate({ _id: userId }, data, {
    new: true,
    projection: "-password",
  });
  return user;
};
export const getUserById = async (id: string) => {
  const user = await User.findById(id).lean();
  return user;
};
export const getUserByEmail = async (email: string) => {
  console.log("finding user by mail")
  const user = await User.findOne({ email: email }).lean();//This method returns a plain JavaScript object instead of a Mongoose document, which can be useful for querying and returning data in a more lightweight and efficient manner.
  return user;
};

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};