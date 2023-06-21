"use client";
import React, { useState } from "react";
import { Board } from "./board";
import { SvgBoard } from "../../../public/svg/SvgBoard";
import "./GoGame.sass";
import Image from "next/image";

type BoardArray = Array<Array<JSX.Element | null>>;

export const GoGame = () => {
  const boardSize = 19;
  const initialBoard = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => null)
  );
  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [player, setPlayer] = useState<string>("/black.webp");
  const [moveHistory, setMoveHistory] = useState<
    Array<[number, number, string]>
  >([]);
  const [redoMoveHistory, setRedoMoveHistory] = useState<
    Array<[number, number, string]>
  >([]);

  const getAdjacentSides = (row: number, col: number): number => {
    let count = 0;

    // Check if the neighboring cells are within the board bounds and are empty
    if (row > 0 && !board[row - 1][col]) {
      count++;
    }
    if (row < boardSize - 1 && !board[row + 1][col]) {
      count++;
    }
    if (col > 0 && !board[row][col - 1]) {
      count++;
    }
    if (col < boardSize - 1 && !board[row][col + 1]) {
      count++;
    }

    return count;
  };

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col]) {
      return;
    }

    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) => {
        if (rowIndex === row && cellIndex === col) {
          const adjacentSides = getAdjacentSides(row, col);
          return (
            <div
              key={cellIndex}
              className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
            >
              <div className="stone-content relative ">
                <Image src={player} width={20} height={20} alt="img" priority />
                <div className="adjacent-sides absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-blue-600">
                  {adjacentSides}
                </div>
              </div>
            </div>
          );
        } else {
          return cell;
        }
      })
    );
    const nextPlayer = player === "/black.webp" ? "/white.webp" : "/black.webp";

    setBoard(updatedPlayerBoard);
    setMoveHistory([...moveHistory, [row, col, player]]);
    setRedoMoveHistory([]); // Clear redo move history
    setPlayer(nextPlayer);
  };

  const undoMove = () => {
    if (moveHistory.length === 0) {
      return;
    }

    const lastMove = moveHistory[moveHistory.length - 1];
    const [lastMoveRow, lastMoveCol, lastMoveColor] = lastMove;

    const updatedBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, colIndex) =>
        rowIndex === lastMoveRow && colIndex === lastMoveCol ? null : cell
      )
    );
    const updatedRedoMoveHistory = [...redoMoveHistory, lastMove];
    setBoard(updatedBoard);
    setMoveHistory(moveHistory.slice(0, -1));
    setRedoMoveHistory(updatedRedoMoveHistory);
    setPlayer(lastMoveColor);
  };

  const redoMove = () => {
    if (redoMoveHistory.length === 0) {
      return;
    }
    const [nextMoveRow, nextMoveCol] =
      redoMoveHistory[redoMoveHistory.length - 1];

    const nextMoveColor =
      player === "/black.webp" ? "/white.webp" : "/black.webp";

    const updatedBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) => {
        if (rowIndex === nextMoveRow && cellIndex === nextMoveCol) {
          const adjacentSides = getAdjacentSides(nextMoveRow, nextMoveCol);
          return (
            <div
              key={cellIndex}
              className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
            >
              <div className="stone-content relative ">
                <Image src={player} width={20} height={20} alt="img" priority />
                <div className="adjacent-sides absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-blue-600">
                  {adjacentSides}
                </div>
              </div>
            </div>
          );
        } else {
          return cell;
        }
      })
    );
    setBoard(updatedBoard);
    setMoveHistory([...moveHistory, [nextMoveRow, nextMoveCol, player]]);
    setRedoMoveHistory(redoMoveHistory.slice(0, -1));
    setPlayer(nextMoveColor);
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer("/black.webp");
    setMoveHistory([]);
    setRedoMoveHistory([]);
  };

  return (
    <div className="game">
      <h1 className="text-center mb-6"> </h1>

      {/* preload images lol*/}
      <Image
        src="/black.webp"
        width={20}
        height={20}
        alt="img"
        priority
        className="hidden"
      />
      <Image
        src="/white.webp"
        width={20}
        height={20}
        alt="img"
        priority
        className="hidden"
      />

      {/* container */}
      <div className="flex">
        <div className="mr-6 outline p-4 w-[350px]">
          <div className="text-center mb-4">Analytics</div>
          <div className="flex justify-around">
            <div className="flex flex-col ">
              <div>Stats</div>
              <div>Number of Groups...........</div>
              <div>Total Liberty Count..........</div>
              <div>Stones on Goban...........</div>
              <div>Tenuki Quadrant...........</div>
              <div>1st line moves...........</div>
              <div>2nd line moves...........</div>
              <div>3rd line moves...........</div>
              <div>4th line moves...........</div>
              <div>5th line moves...........</div>
              <div>6th line moves...........</div>
              <div>7th line moves...........</div>
              <div>8th line moves...........</div>
              <div>9th line moves...........</div>
              <div>Tengen...........</div>
            </div>
            <div className="flex justify-end  space-x-4">
              <div className="">
                <div>Black</div>
                <div>3</div>
                <div>100</div>
                <div>92</div>
                <div>1</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>Carlos</div>
              </div>
              <div>
                <div>White</div>
                <div>4</div>
                <div>85</div>
                <div>94</div>
                <div>2</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>10</div>
                <div>lol</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* board */}
          <div className="flex justify-center items-center relative w-[380px] h-[380px] ">
            {/* Board */}
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0 ">
              <SvgBoard />
            </div>

            {/* Stones */}
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
              <Board board={board} handleClick={handleOnClick} />
            </div>
          </div>
          {/* buttons */}
          <div className="flex justify-around items-center outline mt-4  p-4">
            <button
              className="hover:underline"
              type="button"
              onClick={() => restartGame()}
            >
              Clear Board
            </button>
            <button className="undo" type="button" onClick={undoMove}>
              <Image
                src="/right-arrow.png"
                alt="img"
                width={20}
                height={20}
                className="transform rotate-180"
              />
            </button>
            <button className="redo" type="button" onClick={redoMove}>
              <Image src="/right-arrow.png" alt="img" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className=" ml-6 outline w-[380px] p-4 ">
          <div className="text-center mb-4">Game Information</div>
          <div className=" ">
            <div>Name: Hiro vs Daniel</div>
            <div>Black: Daniel</div>
            <div>White: Hiro</div>
            <div>Moves: 186</div>
            <div>Rules: AGA</div>
            <div>Komi: 6.5</div>
            <div>Handicaps: 2</div>
            <div>Time: May 5, 2023 5:00 PM</div>
            <div>Setting: 5th Street Market Ave. Club Game</div>
            <div>Result: ?</div>
            <div>Comments: hahahahaha</div>
          </div>
        </div>
      </div>
    </div>
  );
};
