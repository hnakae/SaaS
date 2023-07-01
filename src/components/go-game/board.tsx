// import React from "react";
// // import "./tic-tac-toe.sass";

// type BoardProps = {
//   board: Array<Array<JSX.Element | null>>;
//   handleClick: (row: number, col: number) => void;
// };

// export const Board = ({ board, handleClick }: BoardProps) => {
//   return (
//     <div className="board ">
//       {board.map((row, rowIndex) => (
//         <div key={rowIndex} className="board_row">
//           {row.map((cell, cellIndex) => (
//             <button
//               key={cellIndex}
//               // className={`cell ${cell ? `cell_${cell.toLowerCase()}` : ""}`}
//               className="cell"
//               onClick={() => handleClick(rowIndex, cellIndex)}
//             >
//               {cell}
//             </button>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };
import Image from "next/image";
import React from "react";

type Coordinate = {
  x: number;
  y: number;
};

type Color = "black" | "white";

type Stone = {
  coordinate: Coordinate;
  color: Color;
};

type BoardProps = {
  board: Array<Array<Stone | null>>;
  handleClick: (row: number, col: number) => void;
};

export const Board = ({ board, handleClick }: BoardProps) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board_row">
          {row.map((cell, cellIndex) => (
            <button
              key={cellIndex}
              className="cell"
              onClick={() => handleClick(rowIndex, cellIndex)}
            >
              {cell ? (
                <div
                  className={`shadow-sm shadow-dark rounded-full w-[20px] h-[20px]`}
                >
                  <div className="stone-content relative ">
                    <Image
                      src={
                        cell.color === "black" ? "/black.webp" : "/white.webp"
                      }
                      width={20}
                      height={20}
                      alt="img"
                    />
                  </div>
                </div>
              ) : null}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
