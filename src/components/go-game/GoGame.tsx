"use client";
import React, { useState } from "react";
import Board from "./board";
import { SvgBoard } from "../../../public/svg/SvgBoard";
import "./GoGame.sass";
import Image from "next/image";

export type Coordinate = {
  x: number;
  y: number;
};

export type Color = "black" | "white";

export class Stone {
  constructor(
    public coordinate: Coordinate,
    public color: Color,
    public group: StoneGroup | null
  ) {}
  getCoordinate() {
    return `Stone coordinates: [${this.coordinate.x + 1}, ${
      this.coordinate.y + 1
    }]`;
  }
}

class VisitedLiberties {
  visited: Set<string>;

  constructor() {
    this.visited = new Set();
  }

  visitLiberty(coordinate: Coordinate) {
    const key = this.getKey(coordinate);
    if (!this.visited.has(key)) {
      this.visited.add(key);
      // console.log("found liberty");
    }
  }

  isVisited(coordinate: Coordinate) {
    const key = this.getKey(coordinate);
    return this.visited.has(key);
  }

  getKey(coordinate: Coordinate) {
    return `${coordinate.x},${coordinate.y}`;
  }

  getLibertiesCount() {
    return this.visited.size;
  }
}

export class StoneGroup {
  static groupCounter: number = 1;
  name: string;
  stones: Stone[];
  liberties: number;
  color: Color;

  constructor(color: Color) {
    this.name = `Group ${StoneGroup.groupCounter++}`;
    this.stones = [];
    this.liberties = 0;
    this.color = color;
  }

  addStone(stone: Stone) {
    this.stones.push(stone);
    stone.group = this;
    // this.liberties -= 1;
  }

  countLiberties(board: BoardArray) {
    const visitedLiberties = new VisitedLiberties();

    this.stones.forEach((stone) => {
      const { x, y } = stone.coordinate;

      // Check the adjacent sides of the stone for open liberties
      this.checkLiberty(x - 1, y, board, visitedLiberties);
      this.checkLiberty(x + 1, y, board, visitedLiberties);
      this.checkLiberty(x, y - 1, board, visitedLiberties);
      this.checkLiberty(x, y + 1, board, visitedLiberties);
    });

    // Set the liberty count for the group
    this.liberties = visitedLiberties.getLibertiesCount();
  }

  checkLiberty(
    row: number,
    col: number,
    board: BoardArray,
    visitedLiberties: VisitedLiberties
  ) {
    if (row >= 0 && row < board.length && col >= 0 && col < board[row].length) {
      const adjacentStone = board[row][col];
      if (adjacentStone == null) {
        // Found an open liberty, add it to visited liberties
        // console.log("found liberty");
        visitedLiberties.visitLiberty({ x: col, y: row });
      } else if (adjacentStone.color !== this.color) {
        return;
      }
    }
  }
}

type BoardArray = Array<Array<Stone | null>>;

class GoGame extends React.Component<
  {},
  {
    board: BoardArray;
    groups: StoneGroup[];
    player: string;
    boardSize: number;
  }
> {
  boardSize: number;
  initialBoard: BoardArray;

  constructor(props: {}) {
    super(props);

    this.boardSize = 19;
    this.initialBoard = Array.from({ length: this.boardSize }, () =>
      Array.from({ length: this.boardSize }, () => null)
    );

    this.state = {
      board: this.initialBoard,
      groups: [],
      player: "/black.webp",
      boardSize: this.boardSize,
    };
  }

  //FUNCTIONS
  placeStone(row: number, col: number) {
    if (this.state.board[row][col]) {
      return;
    }
    const color: Color =
      this.state.player === "/black.webp" ? "black" : "white";
    const stone: Stone = new Stone({ x: col, y: row }, color, null);
    // const newGroup: StoneGroup = new StoneGroup(color);
    // newGroup.addStone(stone);
    // stone.group = newGroup;
    const adjacentStones: Stone[] = [];
    const visitedGroups: Set<StoneGroup> = new Set();
    this.checkAdjacentSides(row, col, color, adjacentStones, visitedGroups);
    if (adjacentStones.length === 0) {
      console.log("no connected stones");
      const newGroup: StoneGroup = new StoneGroup(color);
      newGroup.addStone(stone);
      stone.group = newGroup;
      newGroup.countLiberties(this.state.board);
      console.log("new group: ", newGroup.name);
    } else {
      // Adjacent stones found, put current stone into adjacent group
      adjacentStones.forEach((adjacentStone) => {
        const adjacentGroup = adjacentStone.group;
        console.log("adjacent group: ", adjacentGroup);
        console.log("connected stones: ", adjacentStone.getCoordinate());
        if (adjacentGroup !== null) {
          newGroup.stones.push(...adjacentGroup.stones);
          visitedGroups.add(adjacentGroup);
          this.removeGroup(adjacentGroup);
          console.log("removed: ", adjacentGroup.name);
          console.log("merged group: ", newGroup.name);
        }
      });
      newGroup.addStone(stone);
      // newGroup.countLiberties(this.state.board);
    }
    this.setState((prevState) => ({
      groups: [...prevState.groups, newGroup],
      player:
        prevState.player === "/black.webp" ? "/white.webp" : "/black.webp",
      board: prevState.board.map((newRow, rowIndex) =>
        newRow.map((cell, cellIndex) => {
          if (rowIndex === row && cellIndex === col) {
            return stone;
          } else {
            return cell;
          }
        })
      ),
    }));
    // Update liberties for all groups
    this.state.groups.forEach((group) => {
      group.countLiberties(this.state.board);
    });
    console.log("Color:", color);
    console.log(stone.getCoordinate());
    console.log("Liberties: ", stone.group.liberties);
    // console.log("New group created:", newGroup.name);
    console.log("--------");
  }

  checkAdjacentSides(
    row: number,
    col: number,
    color: Color,
    adjacentStones: Stone[],
    visitedGroups: Set<StoneGroup>
  ) {
    const adjacentCoordinates: Coordinate[] = [
      { x: col - 1, y: row },
      { x: col + 1, y: row },
      { x: col, y: row - 1 },
      { x: col, y: row + 1 },
    ];

    for (const coordinate of adjacentCoordinates) {
      const { x, y } = coordinate;
      if (
        x >= 0 &&
        x < this.state.boardSize &&
        y >= 0 &&
        y < this.state.boardSize
      ) {
        const adjacentStone = this.state.board[y][x];
        if (adjacentStone && adjacentStone.color === color) {
          const adjacentGroup = adjacentStone.group;
          if (adjacentGroup && !visitedGroups.has(adjacentGroup)) {
            adjacentStones.push(adjacentStone); //push to array
            visitedGroups.add(adjacentGroup); //add to set
            // console.log(visitedGroups.size);
            this.checkAdjacentSides(y, x, color, adjacentStones, visitedGroups);
          }
        }
      }
    }
  }

  removeGroup(group: StoneGroup) {
    this.setState((prevState) => ({
      groups: prevState.groups.filter((g) => g !== group),
    }));
  }

  restartGame() {
    this.setState({
      board: this.initialBoard,
      player: "/black.webp",
      groups: [],
    });

    StoneGroup.groupCounter = 1;

    console.log("Game restarted");
    console.log("---");
  }

  render() {
    return (
      <div className="game">
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

        <div className="flex">
          <div>
            <div className="flex justify-center items-center relative w-[380px] h-[380px] ">
              <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0 ">
                <SvgBoard />
              </div>

              <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
                <Board
                  board={this.state.board}
                  handleClick={this.placeStone.bind(this)}
                />
              </div>
            </div>
            <div className="flex justify-around items-center outline mt-4  p-4">
              <button
                className="hover:underline"
                type="button"
                onClick={this.restartGame.bind(this)}
              >
                Clear Board
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoGame;
