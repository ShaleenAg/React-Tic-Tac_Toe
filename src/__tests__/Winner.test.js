import {expect, test} from "@jest/globals"
import { render } from "@testing-library/react"
import Board , {calculateWinner}  from "../Components/Board"

describe("Calculate winner", ()=>{
    const X = "X"
    const O = "O"

 test("Winner should be O", ()=>{
 const squares = [X, X, O, null, O, X, O, null, X];

 const winner = calculateWinner(squares);
 expect(winner).toEqual(O);
 })
 
 test("Winner should be X", ()=>{
     const squares = [null, O, X, null, O, O, X, X, X];
      const winner = calculateWinner(squares);
      expect(winner).toEqual(X);
 })
test("There should be no winner", ()=>{
const squares = [O, X, X, X, O, O, X, O, X];
const winner = calculateWinner(squares)
expect(winner).toBeFalsy()
})
})


