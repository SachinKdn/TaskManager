import express , { type Express, type Request, type Response }from 'express';
import expressAsyncHandler from 'express-async-handler';
import passport from 'passport';
import Tasks, { ITask } from '../schema/Tasks';
const router = express.Router();
import * as taskService from "../services/task";
import { createResponse } from '../helper/response';

router.post("/new",
    passport.authenticate("jwt",{session: false}),
    expressAsyncHandler(async (req,res)=>{
        console.log("Welcome to Add Task API.")
        const {title, desc, priority,stage,estTime} = req.body as ITask;
        let assignedTo ;
        if(!req.body.assignedTo){
            assignedTo = req.user?._id;
        }else{
            assignedTo = req.body.assignedTo;
        }
        // const id = req.user?._id;
        const task = await taskService.createTask({title, desc, priority,stage,estTime,
            assignedTo});
            console.log(task);
        res.send(createResponse(task,"Task Created Successfully!!"))
    })
)


router.get("/:id",
    passport.authenticate("jwt",{session: false}),
    expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const task= await taskService.getTaskById(req.params.id);
        if(!task){
            res.status(404).json({ message: 'Task not found' });
            return;
        }
       
        res.send(createResponse(task))
    })
)

router.put("/update/:id",
    passport.authenticate("jwt",{session: false}),
    expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        try {
          const taskId = req.params.id;
          const updateData = req.body as Partial<ITask>;
      
          // Check if the task exists
          const existingTask = await taskService.getTaskById(taskId);
          
          console.log(existingTask);
          if (!existingTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
          }
      
          // Update the task
          const updatedTask = await Tasks.findByIdAndUpdate(taskId, updateData, { new: true });
          res.send(createResponse(updatedTask,"Task Created Successfully!!"))
        //   res.status(200).json({ task: updatedTask, message: 'Task updated successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      })
)


router.delete("/delete/:id",
    passport.authenticate("jwt",{session: false}),
    expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const task= await taskService.getTaskById(req.params.id);
        if(!task){
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
        res.send(createResponse(deletedTask,"Task Deleted Successfully!!"))
    })
)
















export default router;