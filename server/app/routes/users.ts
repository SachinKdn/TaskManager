import { hashPassword } from "./../services/user";
import createHttpError from "http-errors";
import express , { type Express, type Request, type Response }from 'express';
import User, { type IUser } from "../schema/User";
import expressAsyncHandler from "express-async-handler";
import * as userService from "../services/user";
import { createResponse } from "../helper/response";
import { createUserTokens, decodeToken } from "../services/passport-jwt";
import { omit } from 'lodash';
import passport from "passport";
import { checkAdmin } from '../services/checkAdmin';
import Tasks from "../schema/Tasks";
import { catchError, validate } from "../middleware/validation";



const router = express.Router();


router.post(
  "/login",
  validate("user:login"),
  catchError,
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
  const user = await User.findById(req.user?._id).select("-password");
  res.send(createResponse(user, "User details feteched successfully!"));
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
    validate("users:create"),
  catchError,
    expressAsyncHandler(async (req, res) => {
      const {name, email, password, role } = req.body as IUser;
      const user = await userService.createUser({ name, email, password, role });
      console.log("---------------------------------")
      console.log(user)
    const { password: _p, ...result } = user;
    const userWithoutPassword = omit(user.toObject(), ['password']);
    console.log("---------------------------------")
    console.log(userWithoutPassword)
    console.log("---------------------------------")
    const tokens = createUserTokens(user.toObject());
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
      console.log({email,role});
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
    validate("set-new-password"),
    expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
      const { password, name } = req.body as IUser;
      console.log(req.body);
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

  router.get("/allUsers",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
      console.log(req.user?.name)
      console.log(req.user?._id)
      console.log("AllUsers are requested by admin.")
      const users = await User.find().select("-password");
      console.log(users);
      res.send(users);
      // res.send(createResponse(users));
    })
  )
  router.get("/mytasks",
    passport.authenticate("jwt", { session: false }),
    expressAsyncHandler(async (req: Request, res: Response): Promise<void>=> {
      console.log("Request Reached to the /mytasks.")
      const userId = req.user?._id;
      const tasks = await Tasks.find({assignedTo: userId});
      res.send(createResponse(tasks));
    })
  )
  router.get("/:id",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    expressAsyncHandler(async (req: Request, res: Response): Promise<void>=> {
      const userId = req.params.id;
      const tasks = await Tasks.find({assignedTo: userId});
      res.send(createResponse(tasks));
      // res.send(tasks);
    })
  )
  
  
export default router;