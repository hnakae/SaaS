//FUNCTIONAL APPROACH
// import React, { useState } from "react";
// import { Board } from "./board";
// import { SvgBoard } from "../../../public/svg/SvgBoard";
// import "./GoGame.sass";
// import Image from "next/image";

// type Coordinate = {
//   x: number;
//   y: number;
// };

// type Color = "black" | "white";

// type Stone = {
//   coordinate: Coordinate;
//   color: Color;
//   group: StoneGroup | null;
// };

// type StoneGroup = {
//   stones: Stone[];
//   libertyCount: number;
// };

// type BoardArray = Array<Array<Stone | null>>;

// export const GoGame = () => {
//   const boardSize = 19;
//   const initialBoard = Array.from({ length: boardSize }, () =>
//     Array.from({ length: boardSize }, () => null)
//   );
//   const [board, setBoard] = useState<BoardArray>(initialBoard);
//   const [groups, setGroups] = useState<StoneGroup[]>([]);
//   const [player, setPlayer] = useState<string>("/black.webp");

//   const placeStone = (row: number, col: number) => {
//     if (board[row][col]) {
//       return;
//     }
//     const color: Color = player === "/black.webp" ? "black" : "white";

//     const stone: Stone = {
//       coordinate: { x: col + 1, y: row + 1 },
//       color,
//       group: null,
//     };

//     const newGroup: StoneGroup = {
//       stones: [stone],
//       libertyCount: 4,
//     };
//     stone.group = newGroup;
//     setGroups([...groups, newGroup]);

//     const updatedPlayerBoard: BoardArray = board.map((newRow, rowIndex) =>
//       newRow.map((cell, cellIndex) => {
//         if (rowIndex === row && cellIndex === col) {
//           return stone;
//         } else {
//           return cell;
//         }
//       })
//     );
//     const nextPlayer = player === "/black.webp" ? "/white.webp" : "/black.webp";
//     setPlayer(nextPlayer);
//     setBoard(updatedPlayerBoard);

//     console.log("Stone placed:", stone);
//     console.log("New group created:", newGroup);
//     console.log("Updated board:", updatedPlayerBoard);
//     console.log("Next player:", nextPlayer);
//   };

//   const restartGame = () => {
//     setBoard(initialBoard);
//     setPlayer("/black.webp");

//     console.log("Game restarted");
//   };

//   return (
//     <div className="game">
//       <Image
//         src="/black.webp"
//         width={20}
//         height={20}
//         alt="img"
//         priority
//         className="hidden"
//       />
//       <Image
//         src="/white.webp"
//         width={20}
//         height={20}
//         alt="img"
//         priority
//         className="hidden"
//       />

//       <div className="flex">
//         <div>
//           <div className="flex justify-center items-center relative w-[380px] h-[380px] ">
//             <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0 ">
//               <SvgBoard />
//             </div>

//             <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
//               <Board board={board} handleClick={placeStone} />
//             </div>
//           </div>
//           <div className="flex justify-around items-center outline mt-4  p-4">
//             <button
//               className="hover:underline"
//               type="button"
//               onClick={() => restartGame()}
//             >
//               Clear Board
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
