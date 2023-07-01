"use client";
import React, { useState, useEffect } from "react";
import { Board } from "./board";
import { SvgBoard } from "../../../public/svg/SvgBoard";
import "./GoGame.sass";
import Image from "next/image";

type Coordinate = {
  x: number;
  y: number;
};

type Color = "black" | "white";

type Stone = {
  coordinate: Coordinate;
  color: Color;
};

type Group = {
  stones: Stone[];
};

// type BoardArray = Array<Array<JSX.Element | null>>;
type BoardArray = Array<Array<Stone | null>>;

export const GoGame = () => {
  const boardSize = 19;
  const initialBoard = Array.from(
    { length: boardSize },
    () => Array.from({ length: boardSize }, () => null) //initialize with nulls
  );
  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [groups, setGroups] = useState<Group[]>([]);
  const [player, setPlayer] = useState<string>("/black.webp");

  const placeStone = (row: number, col: number) => {
    if (board[row][col]) {
      return;
    }
    const color: Color = player === "/black.webp" ? "black" : "white";

    const stone: Stone = {
      coordinate: { x: col+1, y: row+1 },
      color,
    };

    const adjacentGroups = findAdjacentGroups(stone);

    if (adjacentGroups.length > 0) {
      // Add stone to the first adjacent group
      const groupIndex = groups.indexOf(adjacentGroups[0]);
      const updatedGroups = [...groups];
      updatedGroups[groupIndex].stones.push(stone);
      setGroups(updatedGroups);

      console.log("Added stone to existing group:", stone);
      console.log("Updated groups:", updatedGroups);
    } else {
      // Create a new group
      const newGroup: Group = {
        stones: [stone],
      };
      setGroups([...groups, newGroup]);
      console.log("Created new group with stone:", stone);
      console.log("Updated groups:", [...groups, newGroup]);
    }

    console.log("Placed stone at coordinates:", col + 1, row + 1);

    // render stone
    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) => {
        if (rowIndex === row && cellIndex === col) {
          return stone;
        } else {
          return cell;
        }
      })
    );
    const nextPlayer = player === "/black.webp" ? "/white.webp" : "/black.webp";
    setPlayer(nextPlayer);
    setBoard(updatedPlayerBoard);
  };

  const findAdjacentGroups = (stone: Stone): Group[] => {
    const { x, y } = stone.coordinate;
    const adjacentGroups: Group[] = [];

    const adjacentCoordinates: Coordinate[] = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];

    for (const group of groups) {
      for (const adjacentCoord of adjacentCoordinates) {
        const { x: adjX, y: adjY } = adjacentCoord;

        const adjacentStone = board[adjX]?.[adjY];
        console.log("adjacent stone: ", adjacentStone);
        if (
          adjacentStone &&
          adjacentStone.color === stone.color &&
          group.stones.includes(adjacentStone)
        ) {
          adjacentGroups.push(group);
          break;
        }
      }
    }

    return adjacentGroups;
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer("/black.webp");
  };

  return (
    <div className="game">
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
        <div>
          {/* board */}
          <div className="flex justify-center items-center relative w-[380px] h-[380px] ">
            {/* Board */}
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0 ">
              <SvgBoard />
            </div>

            {/* Stones */}
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
              <Board board={board} handleClick={placeStone} />
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
          </div>
        </div>
      </div>
    </div>
  );
};
