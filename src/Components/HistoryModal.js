import React  from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
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
    justifyContent: "flex-end",
};
const HistoryModal = (props)=>{

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
                    PlayerOne Wins : {props.playerOne}
                    <br/>
                    PlayerTwo Wins : {props.playerTwo}
                </div>
            </Box>
        </Modal>
    )

}

export default HistoryModal