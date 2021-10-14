import  React, {useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import CloseIcon from "@mui/icons-material/Close";
import  IconButton  from '@mui/material/IconButton';
import "./style.css"
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
const closeStyle = {
    display: "flex",
    justifyContent:"flex-end"
}
const WinnerModal = (props)=>{
    const handlePlayer = ()=>{
        if(props.winner=="X") return "PlayerOne"
        else return "PlayerTwo"
    }
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Box sx={style}>
                <div style={closeStyle}>
                    <IconButton
                        aria-label="Close"
                        onClick={props.onClose}
                        className="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="modal">
                    Game Over!!{" "}
                    {props.winner
                        ? "Winner is " + handlePlayer()
                        : "No Winner was found :("}
                </div>
            </Box>
        </Modal>
    );

}

export default WinnerModal