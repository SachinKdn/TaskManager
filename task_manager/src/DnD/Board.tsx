import React, { useEffect, useState } from 'react'
import { ITask } from '../pages/login';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from "./Column";
import { useUpdateTaskByIDMutation } from '../redux/api';
interface TasksProps {
  tasks: ITask[];
}
const Board: React.FC<TasksProps> = ({ tasks }) => {
  const [completed, setCompleted] = useState<ITask[]>([]);
  const [incomplete, setIncomplete] = useState<ITask[]>([]);
  const [inProgress, setInProgress] = useState<ITask[]>([]);

  const [updateTaskByID] = useUpdateTaskByIDMutation();
  useEffect(() => {
    console.log(tasks)
    setCompleted(tasks.filter((task) => task.stage === "COMPLETED"));
    setIncomplete(tasks.filter((task) => task.stage === "TODO"));
    setInProgress(tasks.filter((task) => task.stage === "IN PROGRESS"));
  }, [tasks]);

  
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log({source,destination})
    if (!destination) return;

    const sourceCol = getColumn(source.droppableId);
    
    const destinationCol = getColumn(destination.droppableId);

    const [movedTask] = sourceCol.splice(source.index, 1);

    const updatedTask = { ...movedTask, stage: getStage(destination.droppableId) };
    console.log(movedTask);
    destinationCol.splice(destination.index, 0, updatedTask);

    // Update the state
    setColumn(source.droppableId, sourceCol);
    setColumn(destination.droppableId, destinationCol);

    // Save the changes to the database
    console.log(updatedTask);
    updateTaskByID({ id: updatedTask._id, credentials: { stage: updatedTask.stage } });
  };

  const getColumn = (colId: string) => {
    switch (colId) {
      case 'todo':
        return incomplete;
      case 'inProgress':
        return inProgress;
      case 'completed':
        return completed;
      default:
        return [];
    }
  };

  const setColumn = (colId: string, tasks: ITask[]) => {
    switch (colId) {
      case 'todo':
        setIncomplete(tasks);
        break;
      case 'inProgress':
        setInProgress(tasks);
        break;
      case 'completed':
        setCompleted(tasks);
        break;
    }
  };

  const getStage = (colId: string) => {
    switch (colId) {
      case 'todo':
        return 'TODO';
      case 'inProgress':
        return 'IN PROGRESS';
      case 'completed':
        return 'COMPLETED';
      default:
        return '';
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", color:"#161d2f" }}>PROGRESS BOARD</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          margin: "0 auto",
          height: "100%",
          boxSizing: "border-box"
        }}
      >
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Column title="TO DO" tasks={incomplete} id="todo" />
        <Column title="IN PROGRESS" tasks={inProgress} id="inProgress" />
        <Column title="COMPLETED" tasks={completed} id="completed" />
      </div>
    </DragDropContext>
    
      </div>
    
    </div>
  )
}

export default Board