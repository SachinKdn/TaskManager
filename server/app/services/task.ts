import mongoose from "mongoose";
import Tasks from "../schema/Tasks";


export const createTask = async(data:{
    title: string;
    desc?: string;
    priority: string;
    stage: string;
    estTime: Number;
    assignedTo?: string; 
    // by: mongoose.Types.ObjectId; 
}) => {
    const task = await Tasks.create({...data});
    return task;
}

export const getTaskById = async (id: string) => {
    const task = await Tasks.findById(id).lean();
    return task;
  };