import { hashPassword } from "./../services/user";
import createHttpError from "http-errors";
import express , { type Express, type Request, type Response }from 'express';
import { type IUser } from "../schema/User";
import expressAsyncHandler from "express-async-handler";
import * as userService from "../services/user";
import { createResponse } from "../helper/response";
import { createUserTokens, decodeToken } from "../services/passport-jwt";
import { omit } from 'lodash';
import passport from "passport";
import { checkAdmin } from '../services/checkAdmin';



const router = express.Router();


router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  expressAsyncHandler(async (req, res, next) => {
    console.log("Login Request Occured in users.ts.")
    console.log(req.user);
    res.send(
      createResponse({ ...createUserTokens(req.user!), user: req.user })
    );
  })
);
router.get("/me",
  passport.authenticate("jwt", { session: false }),
  expressAsyncHandler(async (req, res) => {
  console.log(req);
  res.send(createResponse(req.user, "User details feteched successfully!"));
}))
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  expressAsyncHandler(async (req, res) => {
    const user = req.params.id;
    const result = await userService.updateUser(user, req.body);
    res.send(createResponse(result, "User updated successfully!"));
  })
);

router.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
      const {name, email, password, role } = req.body as IUser;
      const user = await userService.createUser({ name, email, password, role });
    
    const { password: _p, ...result } = user;
    const userWithoutPassword = omit(user.toObject(), ['password']);
    const tokens = createUserTokens(result);
    res.send(
      createResponse({
        ...tokens,
        user: userWithoutPassword,
      })
    );
    })
  );

router.get("/demo",(req: Request, res: Response) => {
    res.send({ status: "Sachin Jiii" });
  })


  router.post(
    "/register-with-link",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    expressAsyncHandler(async (req, res) => {
      const { email, role } = req.body as IUser;
      const user = await userService.createUserAndSendLink({
        email,
        role,
      });
      res.send(createResponse(user, "Reset password link sent successfully!"));
    })
  );

  //set the new password for newuser
  router.post(
    "/set-new-password/:token",
    expressAsyncHandler(async (req, res) => {
      const { password, name } = req.body as IUser;
      const decode = decodeToken(req.params.token);
      if (!decode || !decode._id) {
        throw createHttpError(400, { message: "Invalid token" });
      }
      const existUser = await userService.getUserById(decode._id);
      if (!existUser) {
        throw createHttpError(400, {
          message: "User not found",
        });
      }
  
      if (existUser?.password) {
        throw createHttpError(400, {
          message: "Password already updated for this user",
        });
      }
      const user = await userService.updateUser(decode._id, {
        name: name,
        isActive: true,
        password: await hashPassword(password),
      });

      res.send(createResponse(user, "Password updated successfully!"));
    })
  );
export default router;