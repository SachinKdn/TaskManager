import mongoose from "mongoose";
import { type BaseSchema } from "./index";
// import bcrypt from "bcrypt";
import { hashPassword } from "../services/user";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

const Schema = mongoose.Schema;

export interface IUser extends BaseSchema {
  name: string;
  email: string;
  isActive: boolean;
  password: string;
  tasks: mongoose.Types.ObjectId[];
  role: UserRole;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, default: "NewUser", required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    password: { type: String },
    role: { type: String, enum: UserRole, default: UserRole.USER },
  },
  { timestamps: true }
);

// save hashed password
UserSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export default mongoose.model<IUser>("user", UserSchema);