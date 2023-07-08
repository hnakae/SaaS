// "use client";
import Image from "next/image";
import React from "react";

import { Coordinate, Color, Stone, StoneGroup } from "./GoGame";

// export type Coordinate = {
//   x: number;
//   y: number;
// };

// export type Color = "black" | "white";

// export class Stone {
//   constructor(
//     public coordinate: Coordinate,
//     public color: Color,
//     public group: StoneGroup | null
//   ) {}
// }

// export class StoneGroup {
//   constructor(public stones: Stone[], public libertyCount: number) {}
// }

type BoardProps = {
  board: (Stone | null)[][];
  handleClick: (row: number, col: number) => void;
};

class Board extends React.Component<BoardProps> {
  render() {
    const { board, handleClick } = this.props;

    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board_row">
            {row.map((stone, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className="cell"
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {stone ? (
                  <div
                    className={`shadow-sm shadow-dark rounded-full w-[20px] h-[20px]`}
                  >
                    <div className="stone-content relative ">
                      <Image
                        src={
                          stone.color === "black"
                            ? "/black.webp"
                            : "/white.webp"
                        }
                        width={20}
                        height={20}
                        alt="img"
                      />
                      <div className="adjacent-sides absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-blue-600">
                        {stone.group?.liberties}
                      </div>
                    </div>
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Board;
