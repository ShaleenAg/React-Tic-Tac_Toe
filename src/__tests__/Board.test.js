import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import Board, { calculateWinner } from "../Components/Board";

describe("Components should render", () => {
    const board = render(<Board />);

    test("The game board shoule be rendered", () => {
        expect(board).toBeDefined();
    });
});