import { Box, Typography } from "@mui/material";
import React from 'react'
import Link from '@mui/material/Link';
import { Avatar } from 'antd';
import Layout from ".";
import "./UserCard.css"
const UserCard = () => {
    return (
            <Box sx={{
                // height: "50%",
                minWidth: {
                    lg: "280px",
                    md:"150px"
                },
                border: "1px solid black",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "2px",
                borderRadius: "10px"
            }}>
                <Box sx={{
                    // height: "30%",
                margin: "10px",
                display: "flex",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid black"
            }}>
                    <div className="status"></div>
                    <Box sx={{
                display: "flex",
                padding: "5px",
                borderRadius: "10px",
                margin: "0",
                gap: 1,
                alignItems: "end"
            }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                console.info("I'm a button.");
                            }}
                            sx={{
                                textDecoration: "none",
                                fontWeight: 600,
                                fontFamily: "inherit",
                                fontSize: "1.2rem",
                                color: "#161d2f"
                            }}
                        >
                            Sachin Kadian
                        </Link>
                        <div>
                            <Avatar
                                // onClick={() => console.log(task)}
                                src={"https://joesch.moe/api/v1/random?key=1"
                                    // + task.id
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
                    <Typography variant="h6" component="h6" sx={{fontFamily: "inherit"}}>
                        Completed Tasks -
                    </Typography>
                    <Typography variant="h6" component="h6"  sx={{fontFamily: "inherit"}}>
                        8/10
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "2px",
                    margin: "0 10px 10px 10px",
                }}>
                    <Typography variant="h6" component="h6" sx={{
                        fontSize: "0.8rem",
                        color: "#161d2f",
                        fontWeight: "700"
                    }}>
                        ~ ADMIN
                    </Typography>
                </Box>

            </Box>
    )
}

export default UserCard