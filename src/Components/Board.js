import { Square } from "./Square";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import WinnerModal from "./WinnerModal";
import "./style.css";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import RefreshIcon from "@mui/icons-material/Refresh";
import HistoryIcon from "@mui/icons-material/History";
import HistoryModal from "./HistoryModal";

export const calculateWinner = (squares) => {
    console.log(`squares is ${squares}`);
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] != "" &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
};
const buttonStyle = {
    margin: "5px",
};
const handleArray = (arr) => {
    arr.pop();
    return arr;
};

const Board = () => {
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [isClicked, setIsClicked] = useState(Array(9).fill(false));
    const [playerOne, setPlayerOne] = useState(0);
    const [playerTwo, setPlayerTwo] = useState(0);
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [isX, setIsX] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [winner, setWinner] = useState(null);
    const [history, setHistory] = useState([
        { isClicked, squares, isX, stepNumber, winner },
    ]);
    //console.log("initial history is ", history);
    const [future, setFuture] = useState([
        { isClicked, squares, isX, stepNumber, winner },
    ]);
    //console.log(`squares is ${Array.isArray(squares)}`, squares.slice());
    const handleRewardsModal = () => setShowRewardsModal(!showRewardsModal);
    const handleHistoryModal = () => setShowHistoryModal(!showHistoryModal);
    useEffect(() => {
        //alert("Use Effect triggered!!")
        if (winner) {
            setShowRewardsModal(true);
            handleWinner(winner);
        } else if (stepNumber >= 9) {
            setShowRewardsModal(true);
        }
    }, [winner, stepNumber]);
    const onClick = (i) => {
        //console.log(`history on stepnumber: ${stepNumber} is `, history);
        //console.log("On CLick");
        // checking to see if the block is already clicked
        if (isClicked[i]) return;
        // assign isClicked[i] to true to prevent further clicks
        const newclick = isClicked.slice();
        newclick[i] = true;
        //setIsClicked(newclick);
        // if winner is already there or all blocks on the board is clicked , return;
        if (winner || stepNumber > 9) {
            return;
        }
        //console.log(squares);
        const newSquares = squares.slice();

        newSquares[i] = isX ? "X" : "O";
        // setIsX(!isX); //flipping between X and O

        // setSquares(newSquares); // assigning value to each block
        // setStepNumber(stepNumber + 1); //increasing number of moves
        // setWinner(calculateWinner(newSquares)); //calculating if winner is there after current move or null
        //alert(winner)
        //console.log(`For ${stepNumber}: ${winner}`);

        setHistory([
            ...history,
            { isClicked, squares, isX, stepNumber, winner },
        ]);

        setIsClicked(newclick);
        setIsX(!isX);
        setSquares(newSquares);
        setStepNumber(stepNumber + 1);
        setWinner(calculateWinner(newSquares));
    };

    const handleUndo = () => {
        try {
            if (history[0].isClicked == undefined) return;
            const {
                isClicked: pastClicked,
                squares: pastSquares,
                isX: pastIsX,
                stepNumber: pastStepNumber,
                winner: pastWinner,
            } = history[history.length - 1];
            //console.log("inside future", future);
            setFuture([
                ...future,
                {
                    isClicked,
                    squares,
                    isX,
                    stepNumber,
                    winner,
                },
            ]);
            setIsClicked(pastClicked);
            setIsX(pastIsX);
            setSquares(pastSquares);
            setStepNumber(pastStepNumber);
            setWinner(pastWinner);
            setHistory(handleArray(history));
        } catch (e) {
            alert("No more moves left to Undo");
            console.error(e);
        }
    };
    const handleRedo = () => {
        try {
            if (future[0].isClicked == undefined) return;
            console.log(future[2]);
            const {
                isClicked: futureClicked,
                squares: futureSquares,
                isX: futureIsX,
                stepNumber: futureStepNumber,
                winner: futureWinner,
            } = future[future.length - 1];
            console.log("After future", future);

            setHistory([
                ...history,
                {
                    isClicked,
                    squares,
                    isX,
                    stepNumber,
                    winner,
                },
            ]);
            setIsClicked(futureClicked);
            setIsX(futureIsX);
            setSquares(futureSquares);
            setStepNumber(futureStepNumber);
            setWinner(futureWinner);
            setFuture(handleArray(future));
        } catch (e) {
            console.error(e);
            alert("No more moves left to Redo");
        }
    };

    const handleWinner = (winner) => {
        //alert("inside handleWinner");
        if (winner == "X") setPlayerOne(playerOne + 1);
        else setPlayerTwo(playerTwo + 1);
    };

    const handleReset = () => {
        setSquares(Array(9).fill(""));
        setIsX(true);
        setStepNumber(0);
        setWinner(null);
        setIsClicked(Array(9).fill(false));
        setHistory([{ isClicked, squares, isX, stepNumber, winner }]);
    };
    return (
        <div className="game">
            <h1 className="game-title">Tic Tac Toe !!</h1>
            <div className="board">
                {squares.map((square, i) => {
                    return (
                        <Square
                            key={i}
                            data-key={i}
                            value={square}
                            onClick={() => onClick(i)}
                            className="squares"
                            data-testid="square"
                        />
                    );
                })}
            </div>
            <div className="buttons">
                <Button
                    sx={buttonStyle}
                    variant="contained"
                    onClick={handleUndo}
                    startIcon={<UndoIcon />}
                >
                    Undo
                </Button>
                <Button
                    sx={buttonStyle}
                    variant="contained"
                    onClick={handleRedo}
                    startIcon={<RedoIcon />}
                >
                    Redo
                </Button>
                <Button
                    sx={buttonStyle}
                    variant="contained"
                    onClick={handleReset}
                    startIcon={<RefreshIcon />}
                >
                    Refresh
                </Button>

                <Button
                    sx={buttonStyle}
                    variant="contained"
                    onClick={handleHistoryModal}
                    startIcon={<HistoryIcon />}
                >
                    History
                </Button>
            </div>
            <WinnerModal
                open={showRewardsModal}
                onClose={handleRewardsModal}
                winner={winner}
            />
            <HistoryModal
                playerOne={playerOne}
                playerTwo={playerTwo}
                open={showHistoryModal}
                onClose={handleHistoryModal}
            />
        </div>
    );
};

export default Board;
