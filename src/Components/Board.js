import { Square } from "./Square";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import WinnerModal from "./Modal";
import "./style.css";
const calculateWinner = (squares) => {
    console.log(squares);
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
const tt = "Hello from test";
const test = () => {
    console.log(tt);
};
const Board = () => {
    const [showModal, setShowModal] = useState(false);
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
    const [future, setFuture] = useState([{}]);
    //console.log(`squares is ${Array.isArray(squares)}`, squares.slice());
    const handleModal = () => setShowModal(!showModal);
    useEffect(() => {
        //alert("Use Effect triggered!!")
        if (winner) {
            setShowModal(true);
            handleWinner(winner);
        } else if (stepNumber >= 9) {
            setShowModal(true);
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
    const handleArray = (arr) => {
        arr.pop();
        return arr;
    };
    const handleUndo = () => {
        try {
            console.log("inside Undo", history[2]);
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
            const {
                isClicked: futureClicked,
                squares: futureSquares,
                isX: futureIsX,
                stepNumber: futureStepNumber,
                winner: futureWinner,
            } = future[future.length - 1];
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
        <>
            <div className="board">
                {squares.map((square, i) => {
                    return (
                        <Square
                            key={i}
                            data-key={i}
                            value={square}
                            onClick={() => onClick(i)}
                        />
                    );
                })}
            </div>
            <Button onClick={handleReset}>Reset Game</Button>
            <Button onClick={handleUndo}>Undo Game</Button>
            <Button onClick={handleRedo}>Redo Game</Button>
            <Button onClick={test}>test Game</Button>
            <div className="playerOne">
                PlayerOne = {playerOne}
                <br />
                PlayerTwo = {playerTwo}
            </div>
            <WinnerModal
                open={showModal}
                onClose={handleModal}
                winner={winner}
            />
        </>
    );
};

export default Board;
