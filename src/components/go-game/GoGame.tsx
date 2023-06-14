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

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col]) {
      return;
    }

    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === row && cellIndex === col ? (
          <div
            key={cellIndex}
            className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
          >
            <Image src={player} width={20} height={20} alt="img" priority />
          </div>
        ) : (
          cell
        )
      )
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
      newRow.map((cell, colIndex) =>
        rowIndex === nextMoveRow && colIndex === nextMoveCol ? (
          <div
            key={colIndex}
            className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
          >
            <Image src={player} width={20} height={20} alt="img" priority />
          </div>
        ) : (
          cell
        )
      )
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
