import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from 'antd';
import { ITask } from "../pages/login";
import "./card.css"
import { Typography } from '@mui/material';

const Container = styled.div`
    border-radius: 10px;
    box-shadow: 3px 2px 13px 1px grey;
    padding: 8px;
    color: #000;
    margin-bottom: 8px;
    min-height: 120px;
    margin-left: 10px;
    margin-right: 10px;
    // cursor: pointer;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;

const TextContent = styled.div``;

const Icons = styled.div`
    display: flex;
    justify-content: end;
    padding: 2px;
`;
// function bgcolorChange(props) { --> ${(props) => bgcolorChange(props)};
//     return props.isDragging
//         ? "lightgreen"
//         : props.isDraggable
//             ? props.isBacklog
//                 ? "#F2D7D5"
//                 : "#DCDCDC"
//             : props.isBacklog
//                 ? "#F2D7D5"
//                 : "#EAF4FC";
// }

interface CardProps {
    task: ITask,
    index: number
  }
const Card : React.FC<CardProps> = ({ task, index }) => {
  return (
    // <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
    //          {(provided, snapshot) => (
                <Container
                className={
                    task.priority === 'HIGH'
                      ? 'highPriority'
                      : task.priority === 'MEDIUM'
                      ? 'mediumPriority'
                      : task.priority === 'LOW'
                      ? 'lowPriority'
                      : 'normalPriority'
                  }

                    // {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                    // ref={provided.innerRef}
                    // isDragging={snapshot.isDragging}
                >
                    <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              {/* <small style={{
                fontSize:"10px"
              }}>
                #{task._id}
                  {"  "}
              </small> */}
            </span>
                    </div>
                    <div
                        style={{ display: "flex",flexDirection: "column", justifyContent: "center", padding: 2 }}
                    >
                        {/* <TextContent>{task.title}</TextContent> */}
                        <Typography variant="h6" component="h6" 
                        sx={{
                          fontSize:"0.9rem",
                          fontWeight: "600",
                          fontFamily: "Inter"
                        }}
                        >{task.title}</Typography>
                       
                        <Typography variant="h6" component="h6" 
                        sx={{
                          fontSize:"0.8rem",
                          fontWeight: "500",
                          fontFamily: "Inter"
                        }}
                        >{task.desc}</Typography>
                        <Typography variant="h6" component="h6" 
                        sx={{
                          fontSize:"0.6rem",
                          fontWeight: "500",
                          fontFamily: "Inter",
                          color: "#471b1b",
                          backgroundColor: "#ffe9cd",
                          padding: "1px 6px",
                          width: "fit-content",
                          borderRadius: "13px",
                          border: "0.5px solid #ffd094",
                        }}
                        >Est. Time : {task.estTime} hrs.</Typography>
                    </div>
                    {/* <Icons>
                        <div>
                            <Avatar
                                onClick={() => console.log(task)}
                                src={"https://joesch.moe/api/v1/random?key=" + task._id}
                            />
                        </div>
                    </Icons> */}
                    {/* {provided.placeholder} */}
                </Container>
        //      )}
        // </Draggable>
  )
}

export default Card