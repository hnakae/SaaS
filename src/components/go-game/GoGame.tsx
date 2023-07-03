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
}

export class StoneGroup {
  constructor(public stones: Stone[], public libertyCount: number) {}
}

type BoardArray = Array<Array<Stone | null>>;

class GoGame extends React.Component<
  {},
  {
    board: BoardArray;
    groups: StoneGroup[];
    player: string;
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
    };
  }

  placeStone(row: number, col: number) {
    if (this.state.board[row][col]) {
      return;
    }

    const color: Color =
      this.state.player === "/black.webp" ? "black" : "white";
    const stone: Stone = new Stone({ x: col + 1, y: row + 1 }, color, null);

    const newGroup: StoneGroup = new StoneGroup([stone], 4);
    stone.group = newGroup;

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

    console.log("Stone placed:", stone);
    console.log("New group created:", newGroup);
    console.log("Updated board:", this.state.board);
    console.log("Next player:", this.state.player);
  }

  restartGame() {
    this.setState({
      board: this.initialBoard,
      player: "/black.webp",
      groups: [],
    });

    console.log("Game restarted");
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
