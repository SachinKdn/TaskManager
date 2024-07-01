
import express , { type Express, type Request, type Response }from 'express';
import { type IUser } from "../schema/User";
import expressAsyncHandler from "express-async-handler";
import * as userService from "../services/user";
import { createResponse } from "../helper/response";




const router = express.Router();

router.post(
    "/register",
    // validate("users:create"),
    // catchError,
    expressAsyncHandler(async (req, res) => {
        console.log("Welcome To Registartion Section")
      const { email, password, role } = req.body as IUser;
      const user = await userService.createUser({ email, password, role });
      res.send(createResponse(user, "User created successfully!"));
    })
  );

router.get("/demo",(req: Request, res: Response) => {
    res.send({ status: "Sachin Jiii" });
  })


export default router;