import { Box, Typography } from "@mui/material";
import React from 'react'
import Link from '@mui/material/Link';
import { Link as RLink } from 'react-router-dom';
import { Avatar } from 'antd';
import Layout from ".";
import "./UserCard.css"
import { IUser } from "../pages/login";
interface UserCardProps {
    id: string;
    keyID: number;
    user: IUser;
  }
const UserCard : React.FC<UserCardProps> = ({id, keyID, user}) => {
    return (
    <RLink 
        key={keyID}
        to={`${id}`}
        state={{ user }}

        // component="button"
        // variant="body2"
        // onClick={() => {
        //     console.info("I'm a button.");
        // }}
        style={{
            textDecoration: "none",
            fontWeight: 500,
            fontFamily: "Poppins",
            fontSize: "1rem",
            color: "#161d2f"
        }}
        >
            <Box sx={{
                // height: "50%",
                minWidth: {
                    lg: "280px",
                    md:"150px"
                },
                border: "0.5px solid #b7b6b6;",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "2px",
                borderRadius: "10px",
                boxShadow: "1px 1px 5px 2px #959595",
                backgroundColor: "#e5eef4",
                cursor:"pointer"
            }}>
                <Box sx={{
                    // height: "30%",
                margin: "10px",
                display: "flex",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "0.5px solid #9c9c9c"
            }}>
                    <div className={user.isActive ? "activeStatus" : "inActiveStatus"} ></div>
                    <Box sx={{
                display: "flex",
                padding: "5px",
                borderRadius: "10px",
                margin: "0",
                gap: 1,
                // alignItems: "end"
            }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                console.info("I'm a button.");
                            }}
                            sx={{
                                textDecoration: "none",
                                fontWeight: 500,
                                fontFamily: "Poppins",
                                fontSize: "1rem",
                                color: "#161d2f"
                            }}
                        >
                            {user.name}
                        </Link>
                        <div style={{border:"0.5px solid #b0a6a6",
                            borderRadius:"50%"
                        }}>
                            <Avatar
                                // onClick={() => console.log(task)}
                                src={"https://joesch.moe/api/v1/random?key="
                                    + user.createdAt
                                }
                            />
                        </div>
                    </Box>
                </Box>
                <Box sx={{
                display: "flex",
                padding: "5px",
                borderRadius: "10px",
                margin: "0 10px",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between"
                
            }}>
                <Typography variant="h6" component="h6" sx={{fontFamily: "Poppins",fontSize:"0.9rem",color: "#003210", margin: "0 auto"}}>
                        {user.email}
                    </Typography>
                    {/* <Typography variant="h6" component="h6" sx={{fontFamily: "Poppins",fontSize:"0.9rem",color: "#003210"}}>
                        Completed Tasks -
                    </Typography> */}
                    {/* <Typography variant="h6" component="h6"  sx={{fontFamily: "Poppins",fontSize:"1rem",color: "#ff001b"}}>
                        {user.tasks.length == 0 ? "0/0" : `${
                            user.tasks.filter(task => task.stage === 'COMPLETED').length} /  
                            ${user.tasks.length}`}
                    </Typography> */}
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "2px",
                    margin: "0 10px 10px 10px",
                    
                }}>
                    <Typography variant="h6" component="h6" sx={{
                    
                        fontWeight: "500",
                        fontFamily: "Poppins",
                                fontSize: "0.7rem",
                                color: "#161d2f"
                    }}>
                        {`-${user.role}`}
                    </Typography>
                </Box>

            </Box>
            </RLink>
    )
}

export default UserCard