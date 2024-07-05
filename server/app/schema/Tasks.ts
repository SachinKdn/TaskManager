import mongoose from "mongoose";
import { type BaseSchema } from ".";
const Schema = mongoose.Schema;


export enum Priority{
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    NORMAL = "NORMAL",
    LOW = "LOW"
}
export enum Stage{
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export interface ITask extends BaseSchema{
    title: string;
    desc: string;
    priority: Priority;
    date: Date;
    stage: Stage;
    assignedTo: string;
    // by: mongoose.Types.ObjectId;
    estTime: Number;
    startTime: Date;
    endTime: Date;
}

const TaskSchema = new Schema<ITask>({
    title: {type: String, required: true},
    desc: {type: String},
    priority: {type: String, enum: Priority, default: Priority.NORMAL},
    date: { type: Date, default: new Date() },
    stage: {type: String, enum: Stage, default: Stage.TODO},
    // by: {type: Schema.Types.ObjectId,required: true, ref: 'User'},
    
    assignedTo: {type : String, required: true},
    estTime: {type: Number, required: true},
    startTime: {type: Date},
    endTime: {type: Date},
},
{timestamps: true});

export default mongoose.model<ITask>("task", TaskSchema);