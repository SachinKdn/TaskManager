import express , { type Express, type Request, type Response }from 'express';
import expressAsyncHandler from 'express-async-handler';
import passport from 'passport';
import { ITask } from '../schema/Tasks';
const router = express.Router();
import * as taskService from "../services/task";
import { createResponse } from '../helper/response';

router.post("/new",
    passport.authenticate("jwt",{session: false}),
    expressAsyncHandler(async (req,res)=>{
        console.log("Welcome to Add Task API.")
        const {title, desc, priority,stage,estTime} = req.body as ITask;
        let by ;
        if(!req.body.by){
            by = req.user?._id;
        }else{
            by = req.body.by;
        }
        // const id = req.user?._id;
        const task = await taskService.createTask({title, desc, priority,stage,estTime,
            by});
            console.log(task);
        res.send(createResponse(task,"Task Created Successfully!!"))
    })
)

















export default router;