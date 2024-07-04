import mongoose from "mongoose";
import Tasks from "../schema/Tasks";


export const createTask = async(data:{
    title: string;
    desc?: string;
    priority: string;
    stage: string;
    estTime: Number;
    by?: string; 
    // by: mongoose.Types.ObjectId; 
}) => {
    const task = await Tasks.create({...data});
    return task;
}