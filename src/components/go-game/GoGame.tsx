"use client";
import React, { useState } from "react";
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

  const handleOnClick = (row: number, col: number) => {
    // if (board[row][col] || winner) {
    if (board[row][col]) {
      return;
    }

    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === row && cellIndex === col ? (
          // <div className="relative ">
          <div
            key={cellIndex}
            className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
          >
            <Image src={player} width={20} height={20} alt="img" />
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

  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer("/black.webp");
  };

  return (
    <div className="game">
      {/* <h1> Go Game</h1> */}
      <div className="flex justify-center items-center relative w-[380px] h-[380px]">
        <div className="absolute top-0 left-0 z-0 ">
          <SvgBoard />
        </div>
        <div className="absolute top-0 left-0">
          <Board board={board} handleClick={handleOnClick} />
        </div>
      </div>
      <button
        className="reset outline"
        type="button"
        onClick={() => restartGame()}
      >
        Clear Board
      </button>
    </div>
  );
};
