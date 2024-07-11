import React from 'react'
import { ITask } from '../pages/login'
import styled from "styled-components";
import Card from "./Card";
// import "./scroll.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
interface ColProps {
    title: string,
    tasks: ITask[],
    id: string
  }


  const Container = styled.div`
    background-color: #f4f5f7;
    border-radius: 2.5px;
    width: 400px;
    // height: 900px;
    height: -webkit-fill-available;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    // border: 1px solid gray;
`;

const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
`;



const Column  : React.FC<ColProps> = ({ title, tasks, id }) => {
  console.log(id)
  return (
    <Container className="column">
    <Title
        style={{
            backgroundColor: "lightblue",
            position: "sticky",
            top: "0",
            color:"#161d2f"
        }}
    >
        {title}
    </Title>
    
    <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{  padding: '10px', minHeight: '500px', overflowY: 'auto', maxHeight: '500px' }}
          >
            {tasks.map((task : ITask, index) => (
               
              <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: 'none',
                    // padding: '16px',
                    // margin: '0 0 8px 0',
                    // minHeight: '50px',
                    // backgroundColor: '#fff',
                    // color: '#333',
                    // border: '1px solid lightgrey',
                    // borderRadius: '4px',
                    ...provided.draggableProps.style,
                  }}
                >
                  <Card key={index} index={index} task={task} /> 
                </div>
              )}
            </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
</Container>
  )
}

export default Column