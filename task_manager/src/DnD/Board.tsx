import React, { useEffect, useState } from 'react'
import { ITask } from '../pages/login';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Column from "./Column";

interface TasksProps {
    tasks: ITask[];
  }
const Board : React.FC<TasksProps>  = ({tasks}) => {
    const [completed, setCompleted] = useState<ITask[]>([]);
    const [incomplete, setIncomplete] = useState<ITask[]>([]);
    const [inProgress, setInProgress] = useState<ITask[]>([]);

    useEffect(() => {
        setCompleted(tasks.filter((task) => task.stage === "COMPLETED"));
        setIncomplete(tasks.filter((task) => task.stage === "TODO"));
        setInProgress(tasks.filter((task) => task.stage === "IN_PROGRESS"));
      }, [tasks]);

      const handleDragEnd = () => {
        // const { destination, source, draggableId } = result;

        // if (!destination || source.droppableId === destination.droppableId) return;

        // deletePreviousState(source.droppableId, draggableId);

        // const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

        // setNewState(destination.droppableId, task);

    };
  return (
    <DragDropContext 
    onDragEnd={handleDragEnd}
    >
            <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>

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
                <Column title={"TO DO"} tasks={incomplete} id={"1"} />
                <Column title={"IN PROGRESS"} tasks={inProgress} id={"2"} />
                <Column title={"DONE"} tasks={completed} id={"3"} />
            </div>
        </DragDropContext>
  )
}

export default Board