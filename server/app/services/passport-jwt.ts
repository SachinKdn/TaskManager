import { type IUser } from "../schema/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import createError from "http-errors";
import * as userService from "./user";





const isValidPassword = async function (value: string, password: string) {
    const compare = await bcrypt.compare(value, password);
    return compare;
  };
  
  export const initPassport = (): void => {
    passport.use(
      new Strategy(
        {
          secretOrKey: process.env.JWT_SECRET || "TOP_SECRET",
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
          console.log("JWT PASSPORT>>>>>>")
            try {
            done(null, token);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  
    // user login
    passport.use(
        "login",
        new LocalStrategy(
          {
            usernameField: "email",
            passwordField: "password",
          },
          async (email, password, done) => {
            console.log("Login req in login passport");
            console.log(email);
            console.log(password);
            try {
              const user : IUser | null = await userService.getUserByEmail(email);
              if (user == null) {
                done(createError(401, "User not found!"), false);
                return;
              }
    
              if (!user.isActive) {
                done(createError(401, "User is inactive"), false);
                return;
              }
    
              const validate = await isValidPassword(password, user.password);
              if (!validate) {
                done(createError(401, "Invalid email or password"), false);
                return;
              }
              const { password: _p, ...result } = user;
              done(null, result, { message: "Logged in Successfully" });
            } catch (error: any) {
              done(createError(500, error.message));
            }
          }
        )
      );
  };



      export const createUserTokens = (user: Omit<IUser, "password">) => {
       console.log(user);
        const jwtSecret = process.env.JWT_SECRET ?? "";
        const token = jwt.sign(user, jwtSecret);
        console.log("Token created successfully");
        return { accessToken: token, refreshToken: "" };
      };
  
// export const decodeToken = (token: string) => {
//     const jwtSecret = process.env.JWT_SECRET || "";
//     const decode = jwt.decode(token);
//     return decode as IUser;
//   };

  export const decodeToken = (token: string): IUser => {
    const jwtSecret = process.env.JWT_SECRET || "";
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret) as IUser;
      return decoded; //this decoded is user object, don't use decoded.user
    } catch (error) {
      throw new Error("Invalid token");
    }
  };