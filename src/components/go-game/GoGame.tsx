"use client";
import React, { useState, useEffect } from "react";
import { Board } from "./board";
import { SvgBoard } from "../../../public/svg/SvgBoard";
import "./GoGame.sass";
import Image from "next/image";

type BoardArray = Array<Array<JSX.Element | null>>;

// const makeComputerMove = (board: BoardArray): [number, number] => {
//   const emptyCells: [number, number][] = [];
//   board.forEach((row, rowIndex) => {
//     row.forEach((cell, cellIndex) => {
//       if (!cell) {
//         emptyCells.push([rowIndex, cellIndex]);
//       }
//     });
//   });

//   const randomIndex = Math.floor(Math.random() * emptyCells.length);
//   return emptyCells[randomIndex];
// };

// const checkWinner = (board: BoardArray): string | null => {
//   const lines = [
//     //Rows
//     [board[0][0], board[0][1], board[0][2]],
//     [board[1][0], board[1][1], board[1][2]],
//     [board[2][0], board[2][1], board[2][2]],
//     //columns
//     [board[0][0], board[1][0], board[2][0]],
//     [board[0][1], board[1][1], board[2][1]],
//     [board[0][2], board[1][2], board[2][2]],

//     //Diagonals
//     [board[0][0], board[1][1], board[2][2]],
//     [board[0][2], board[1][1], board[2][0]],
//   ];
//   for (const line of lines) {
//     if (line[0] && line[0] === line[1] && line[1] === line[2]) {
//       return line[0];
//     }
//   }
//   return null;
// };

export const GoGame = () => {
  const boardSize = 19;
  const initialBoard = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => null)
  );
  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [player, setPlayer] = useState<string>("/black.webp");
  const [moveHistory, setMoveHistory] = useState<Array<[number, number]>>([]);
  const [redoMoveHistory, setRedoMoveHistory] = useState<
    Array<[number, number]>
  >([]);

  const handleOnClick = (row: number, col: number) => {
    // if (board[row][col] || winner) {
    if (board[row][col]) {
      return;
    }
    // Update move history
    setMoveHistory([...moveHistory, [row, col]]);
    // Clear redo move history when a new move is made
    setRedoMoveHistory([]);
    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === row && cellIndex === col ? (
          // <div className="relative ">
          <div
            key={cellIndex}
            className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
          >
            <Image src={player} width={20} height={20} alt="img" priority />
          </div>
        ) : (
          // </div>
          cell
        )
      )
    );
    setBoard(updatedPlayerBoard);

    if (player === "/black.webp") {
      setPlayer("/white.webp");
    } else {
      setPlayer("/black.webp");
    }
  };

  const undoMove = () => {
    // Check if there are any moves in the move history
    if (moveHistory.length === 0) {
      return;
    }

    // Get the coordinates of the last move
    const lastMove = moveHistory[moveHistory.length - 1];
    const [lastMoveRow, lastMoveCol] = lastMove;

    // Clear the last move from the board
    const updatedBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, colIndex) =>
        rowIndex === lastMoveRow && colIndex === lastMoveCol ? null : cell
      )
    );
    setBoard(updatedBoard);

    // Remove the last move from the move history
    setMoveHistory(moveHistory.slice(0, -1));

    // Add the last move to the redo move history
    setRedoMoveHistory([...redoMoveHistory, lastMove]);
  };

  const redoMove = () => {
    // Check if there are any moves in the redo move history
    if (redoMoveHistory.length === 0) {
      return;
    }

    // Get the coordinates of the next move to redo
    const nextMove = redoMoveHistory[redoMoveHistory.length - 1];
    const [nextMoveRow, nextMoveCol] = nextMove;

    // Toggle the player's color
    const nextPlayer = player === "/black.webp" ? "/white.webp" : "/black.webp";

    // Set the next move on the board
    const updatedBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, colIndex) =>
        rowIndex === nextMoveRow && colIndex === nextMoveCol ? (
          <div
            key={colIndex}
            className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
          >
            <Image src={nextPlayer} width={20} height={20} alt="img" priority />
          </div>
        ) : (
          cell
        )
      )
    );
    setBoard(updatedBoard);

    // Add the next move to the move history
    setMoveHistory([...moveHistory, nextMove]);

    // Remove the next move from the redo move history
    setRedoMoveHistory(redoMoveHistory.slice(0, -1));

    // Update the player's color
    setPlayer(nextPlayer);
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer("/black.webp");
  };

  return (
    <div className="game">
      <h1 className="text-center mb-6"> Go Game</h1>

      {/* preload */}
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
  );
};
