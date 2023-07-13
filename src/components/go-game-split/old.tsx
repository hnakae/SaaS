// "use client";
// import React, { useState, useEffect } from "react";
// import { Board } from "./board";
// import { SvgBoard } from "../../../public/svg/SvgBoard";
// import "./GoGame.sass";
// import Image from "next/image";

// type BoardArray = Array<Array<JSX.Element | null>>;

// export const GoGame = () => {
//   const boardSize = 19;
//   const initialBoard = Array.from({ length: boardSize }, () =>
//     Array.from({ length: boardSize }, () => null)
//   );
//   const [board, setBoard] = useState<BoardArray>(initialBoard);

//   const [groups, setGroups] = useState<Group[]>([]);

//   const [player, setPlayer] = useState<string>("/black.webp");
//   const [moveHistory, setMoveHistory] = useState<
//     Array<[number, number, string]>
//   >([]);
//   const [redoMoveHistory, setRedoMoveHistory] = useState<
//     Array<[number, number, string]>
//   >([]);
//   const [blackMoves, setBlackMoves] = useState<number>(0);
//   const [whiteMoves, setWhiteMoves] = useState<number>(0);
//   const [blackLineCounts, setBlackLineCounts] = useState<number[]>(
//     Array.from({ length: boardSize }, () => 0)
//   );
//   const [whiteLineCounts, setWhiteLineCounts] = useState<number[]>(
//     Array.from({ length: boardSize }, () => 0)
//   );

//   type Coordinate = {
//     x: number;
//     y: number;
//   };

//   type Color = "black" | "white";

//   type Stone = {
//     coordinate: Coordinate;
//     color: Color;
//   };

//   type Group = {
//     stones: Stone[];
//   };

//   //USE USESTATE HERE
//   // let coordinates: [Coordinate, Color][] = [];

//   // function isCoordinateInArray(coordinate: Coordinate): boolean {
//   //   return coordinates.some(
//   //     ([coord, _]) => coord.x === coordinate.x && coord.y === coordinate.y
//   //   );
//   // }

//   // const [coordinates, setCoordinates] = useState<[Coordinate, Color][]>([]);

//   // const getAdjacentSides = (row: number, col: number): number => {
//   //   let count = 0;

//   //   // Check if the neighboring cells are within the board bounds and are empty
//   //   if (row > 0 && !board[row - 1][col]) {
//   //     count++;
//   //   }
//   //   if (row < boardSize - 1 && !board[row + 1][col]) {
//   //     count++;
//   //   }
//   //   if (col > 0 && !board[row][col - 1]) {
//   //     count++;
//   //   }
//   //   if (col < boardSize - 1 && !board[row][col + 1]) {
//   //     count++;
//   //   }

//   //   return count;
//   // };

//   // const getColorForCoordinate = (coordinate: Coordinate): Color | undefined => {
//   //   const pair = coordinates.find(
//   //     ([coord]) => coord.x === coordinate.x && coord.y === coordinate.y
//   //   );
//   //   return pair ? pair[1] : undefined;
//   // };

//   // const isVisited = () => {
//   //   return true;
//   // };

//   // const setVisited = () => {};

//   // const visitedNodes = new Set<string>();
//   // const [liberties, setLiberties] = useState<number>(0);
//   // const [libertyCount, setLibertyCount] = useState<number>(0);
//   // const useEffect(() => {

//   // }, [liberties])

//   // type GroupsMap = Map<number, Coordinate[]>;

//   // class Stone {
//   //   constructor(public x: number, public y: number, public color: string) {}
//   // }

//   // // Group.ts
//   // class Group {
//   //   constructor(public coordinates: [number, number][] = []) {}

//   //   addStone(stone: Stone) {
//   //     this.coordinates.push([stone.x, stone.y]);
//   //   }
//   // }

//   // let libertyCount: number = 0;
//   // const count = (coordinate: Coordinate, color: Color) => {
//   //   let pieceColor = getColorForCoordinate(coordinate);

//   //   let north = { x: coordinate.x, y: coordinate.y - 1 };
//   //   let east = { x: coordinate.x + 1, y: coordinate.y };
//   //   let south = { x: coordinate.x, y: coordinate.y + 1 };
//   //   let west = { x: coordinate.x - 1, y: coordinate.y };

//   //   const nodeId = `${coordinate.x}-${coordinate.y}`;
//   //   console.log(nodeId);
//   //   // Check if the coordinate is found inside the coordinates array
//   //   const coordinateFound = isCoordinateInArray(coordinate);

//   //   console.log(coordinates);

//   //   if (coordinateFound && pieceColor == color && !visitedNodes.has(nodeId)) {
//   //     visitedNodes.add(nodeId);
//   //     // console.log(visitedNodes);
//   //     count(north, pieceColor);
//   //     count(east, pieceColor);
//   //     count(south, pieceColor);
//   //     count(west, pieceColor);
//   //   } else if (!coordinateFound) {
//   //     console.log("found open adjacent side");
//   //     // setLibertyCount((prevCount) => prevCount + 1);
//   //     libertyCount++;
//   //     console.log(libertyCount);
//   //     // console.log(libertyCount);
//   //     // libertyCount++;
//   //   }
//   // };

//   /*
//     on click(row, col),
//     we take row,col and put it in an array to say it's there. (coordinates.push)
//     then we call count(row,col), to count the liberties of the move we placed.

//   */

//   const findAdjacentGroups = (stone: Stone): Group[] => {
//     const { x, y } = stone.coordinate;
//     const adjacentGroups: Group[] = [];

//     const adjacentCoordinates: Coordinate[] = [
//       { x: x - 1, y },
//       { x: x + 1, y },
//       { x, y: y - 1 },
//       { x, y: y + 1 },
//     ];

//     for (const group of groups) {
//       for (const adjacentCoord of adjacentCoordinates) {
//         const { x: adjX, y: adjY } = adjacentCoord;

//         const adjacentStone = board[adjX]?.[adjY];
//         // if (
//         //   adjacentStone &&
//         // //   adjacentStone.color === stone.color &&
//         // //   group.stones.includes(adjacentStone)
//         // ) {
//         //   adjacentGroups.push(group);
//         //   break;
//         // }
//       }
//     }

//     return adjacentGroups;
//   };

//   const handleOnClick = (row: number, col: number) => {
//     //if not null, exit.
//     if (board[row][col]) {
//       return;
//     }

//     let currentColor: Color = player == "/black.webp" ? "black" : "white";
//     let coordinate: Coordinate = { x: col, y: row };
//     const stone: Stone = {
//       coordinate: { x: col, y: row },
//       color: currentColor,
//     };
//     const adjacentGroups = findAdjacentGroups(stone);

//     if (adjacentGroups.length > 0) {
//       const groupIndex = groups.indexOf(adjacentGroups[0]);
//       const updatedGroups = [...groups];
//       updatedGroups[groupIndex].stones.push(stone);
//       setGroups(updatedGroups);
//     } else {
//       const newGroup: Group = {
//         stones: [stone],
//       };
//       setGroups([...groups, newGroup]);
//     }
//     const updatedPlayerBoard = board.map((newRow, rowIndex) =>
//       newRow.map((cell, cellIndex) => {
//         if (rowIndex === row && cellIndex === col) {
//           return (
//             <div
//               key={cellIndex}
//               className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
//             >
//               <div className="stone-content relative ">
//                 <Image src={player} width={20} height={20} alt="img" priority />
//                 <div className="adjacent-sides absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-blue-600">
//                   {/* {adjacentSides} */}
//                   {/* {libertyCount} */}
//                   {/* {libertyCount} */}
//                 </div>
//               </div>
//             </div>
//           );
//         } else {
//           return cell;
//         }
//       })
//     );
//     const line =
//       Math.min(row, col, boardSize - row - 1, boardSize - col - 1) + 1;

//     const nextPlayer = player === "/black.webp" ? "/white.webp" : "/black.webp";

//     setBoard(updatedPlayerBoard);
//     setMoveHistory([...moveHistory, [row, col, player]]);
//     setRedoMoveHistory([]); // Clear redo move history

//     setPlayer(nextPlayer);
//     if (player === "/black.webp") {
//       setBlackMoves(blackMoves + 1);
//       setBlackLineCounts((prevCounts) => {
//         const updatedCounts = [...prevCounts];
//         updatedCounts[line - 1]++;
//         return updatedCounts;
//       });
//     } else {
//       setWhiteMoves(whiteMoves + 1);
//       setWhiteLineCounts((prevCounts) => {
//         const updatedCounts = [...prevCounts];
//         updatedCounts[line - 1]++;
//         return updatedCounts;
//       });
//     }
//   };

//   const undoMove = () => {
//     if (moveHistory.length === 0) {
//       return;
//     }

//     const lastMove = moveHistory[moveHistory.length - 1];
//     const [lastMoveRow, lastMoveCol, lastMoveColor] = lastMove;

//     const updatedBoard = board.map((newRow, rowIndex) =>
//       newRow.map((cell, colIndex) =>
//         rowIndex === lastMoveRow && colIndex === lastMoveCol ? null : cell
//       )
//     );
//     const updatedRedoMoveHistory = [...redoMoveHistory, lastMove];
//     setBoard(updatedBoard);
//     setMoveHistory(moveHistory.slice(0, -1));
//     setRedoMoveHistory(updatedRedoMoveHistory);
//     setPlayer(lastMoveColor);
//     if (lastMoveColor === "/black.webp") {
//       setBlackMoves(blackMoves - 1);
//       setBlackLineCounts((prevCounts) => {
//         const updatedCounts = [...prevCounts];
//         const line =
//           Math.min(
//             lastMoveRow,
//             lastMoveCol,
//             boardSize - lastMoveRow - 1,
//             boardSize - lastMoveCol - 1
//           ) + 1;
//         updatedCounts[line - 1]--;
//         return updatedCounts;
//       });
//     } else {
//       setWhiteMoves(whiteMoves - 1);
//       setWhiteLineCounts((prevCounts) => {
//         const updatedCounts = [...prevCounts];
//         const line =
//           Math.min(
//             lastMoveRow,
//             lastMoveCol,
//             boardSize - lastMoveRow - 1,
//             boardSize - lastMoveCol - 1
//           ) + 1;
//         updatedCounts[line - 1]--;
//         return updatedCounts;
//       });
//     }
//   };

//   const redoMove = () => {
//     if (redoMoveHistory.length === 0) {
//       return;
//     }
//     const [nextMoveRow, nextMoveCol] =
//       redoMoveHistory[redoMoveHistory.length - 1];

//     const nextMoveColor =
//       player === "/black.webp" ? "/white.webp" : "/black.webp";

//     const updatedBoard = board.map((newRow, rowIndex) =>
//       newRow.map((cell, cellIndex) => {
//         if (rowIndex === nextMoveRow && cellIndex === nextMoveCol) {
//           const adjacentSides = getAdjacentSides(nextMoveRow, nextMoveCol);
//           return (
//             <div
//               key={cellIndex}
//               className="shadow-sm shadow-dark rounded-full w-[20px] h-[20px]"
//             >
//               <div className="stone-content relative ">
//                 <Image src={player} width={20} height={20} alt="img" priority />
//                 <div className="adjacent-sides absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-blue-600">
//                   {/* {adjacentSides} */}
//                   {/* {libertyCount} */}
//                 </div>
//               </div>
//             </div>
//           );
//         } else {
//           return cell;
//         }
//       })
//     );
//     const line = Math.min(
//       nextMoveRow,
//       nextMoveCol,
//       boardSize - nextMoveRow - 1,
//       boardSize - nextMoveCol - 1
//     );
//     setBoard(updatedBoard);
//     setMoveHistory([...moveHistory, [nextMoveRow, nextMoveCol, player]]);
//     setRedoMoveHistory(redoMoveHistory.slice(0, -1));
//     setPlayer(nextMoveColor);
//     if (player === "/black.webp") {
//       setBlackMoves(blackMoves + 1);
//       const updatedBlackLineCounts = [
//         ...blackLineCounts.slice(0, line),
//         blackLineCounts[line] + 1,
//       ];
//       for (let i = line + 1; i < blackLineCounts.length; i++) {
//         updatedBlackLineCounts.push(blackLineCounts[i]);
//       }
//       setBlackLineCounts(updatedBlackLineCounts);
//     } else {
//       setWhiteMoves(whiteMoves + 1);
//       const updatedWhiteLineCounts = [
//         ...whiteLineCounts.slice(0, line),
//         whiteLineCounts[line] + 1,
//       ];
//       for (let i = line + 1; i < whiteLineCounts.length; i++) {
//         updatedWhiteLineCounts.push(whiteLineCounts[i]);
//       }
//       setWhiteLineCounts(updatedWhiteLineCounts);
//     }
//   };

//   const restartGame = () => {
//     setBoard(initialBoard);
//     setPlayer("/black.webp");
//     setMoveHistory([]);
//     setRedoMoveHistory([]);
//     setBlackMoves(0);
//     setWhiteMoves(0);
//     setBlackLineCounts(new Array(boardSize).fill(0));
//     setWhiteLineCounts(new Array(boardSize).fill(0));
//     // coordinates = [];
//     // libertyCount = 0;
//   };

//   return (
//     <div className="game">
//       <h1 className="text-center mb-6"> </h1>

//       {/* preload images lol*/}
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

//       {/* container */}
//       <div className="flex">
//         <div className="mr-6 outline p-4 w-[350px]">
//           <div className="text-center mb-4">Analytics</div>
//           <div className="flex justify-around">
//             <div className="flex flex-col ">
//               <div>Stats</div>
//               <div>Stones on Goban...........</div>
//               {/* <div>Number of Groups...........</div>
//               <div>Total Liberty Count..........</div>
//               <div>Tenuki Quadrant...........</div> */}
//               <div>1st line moves...........</div>
//               <div>2nd line moves...........</div>
//               <div>3rd line moves...........</div>
//               <div>4th line moves...........</div>
//               <div>5th line moves...........</div>
//               <div>6th line moves...........</div>
//               <div>7th line moves...........</div>
//               <div>8th line moves...........</div>
//               <div>9th line moves...........</div>
//               <div>Tengen...........</div>
//             </div>
//             <div className="flex justify-end  space-x-4">
//               <div className="">
//                 <div>Black</div>
//                 <div>{blackMoves}</div>
//                 {/* <div>100</div>
//                 <div>92</div>
//                 <div>1</div> */}
//                 <div>{blackLineCounts[0]}</div>
//                 <div>{blackLineCounts[1]}</div>
//                 <div>{blackLineCounts[2]}</div>
//                 <div>{blackLineCounts[3]}</div>
//                 <div>{blackLineCounts[4]}</div>
//                 <div>{blackLineCounts[5]}</div>
//                 <div>{blackLineCounts[6]}</div>
//                 <div>{blackLineCounts[7]}</div>
//                 <div>{blackLineCounts[8]}</div>
//                 <div>{blackLineCounts[9]}</div>
//               </div>
//               <div>
//                 <div>White</div>
//                 <div>{whiteMoves}</div>
//                 {/* <div>85</div>
//                 <div>94</div>
//                 <div>2</div> */}
//                 <div>{whiteLineCounts[0]}</div>
//                 <div>{whiteLineCounts[1]}</div>
//                 <div>{whiteLineCounts[2]}</div>
//                 <div>{whiteLineCounts[3]}</div>
//                 <div>{whiteLineCounts[4]}</div>
//                 <div>{whiteLineCounts[5]}</div>
//                 <div>{whiteLineCounts[6]}</div>
//                 <div>{whiteLineCounts[7]}</div>
//                 <div>{whiteLineCounts[8]}</div>
//                 <div>{whiteLineCounts[9]}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div>
//           {/* board */}
//           <div className="flex justify-center items-center relative w-[380px] h-[380px] ">
//             {/* Board */}
//             <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0 ">
//               <SvgBoard />
//             </div>

//             {/* Stones */}
//             <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
//               <Board board={board} handleClick={handleOnClick} />
//             </div>
//           </div>
//           {/* buttons */}
//           <div className="flex justify-around items-center outline mt-4  p-4">
//             <button
//               className="hover:underline"
//               type="button"
//               onClick={() => restartGame()}
//             >
//               Clear Board
//             </button>
//             <button className="undo" type="button" onClick={undoMove}>
//               <Image
//                 src="/right-arrow.png"
//                 alt="img"
//                 width={20}
//                 height={20}
//                 className="transform rotate-180"
//               />
//             </button>
//             <button className="redo" type="button" onClick={redoMove}>
//               <Image src="/right-arrow.png" alt="img" width={20} height={20} />
//             </button>
//           </div>
//         </div>
//         <div className=" ml-6 outline w-[380px] p-4 ">
//           <div className="text-center mb-4">Game Information</div>
//           <div className=" ">
//             <div>Name: Hiro vs Daniel</div>
//             <div>Black: Daniel</div>
//             <div>White: Hiro</div>
//             <div>Moves: 186</div>
//             <div>Rules: AGA</div>
//             <div>Komi: 6.5</div>
//             <div>Handicaps: 2</div>
//             <div>Time: May 5, 2023 5:00 PM</div>
//             <div>Setting: 5th Street Market Ave. Club Game</div>
//             <div>Result: ?</div>
//             <div>Comments: hahahahaha</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
