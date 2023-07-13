// "use client";
import { Board } from "./Board";

export type Coordinate = {
  x: number;
  y: number;
};

export enum Color {
  black,
  white,
}

export class Stone {
  constructor(
    public readonly color: Color,
    public readonly coordinate: Coordinate,
    public group: StoneGroup | null
  ) {}

  toString() {
    return `${
      this.color == 1 ? String.fromCharCode(9898) : String.fromCharCode(9899)
    }: (${this.coordinate.x}, ${this.coordinate.y})`;
  }

  getGroup(): StoneGroup {
    if (!this.group) {
      throw new Error("group is not set for stone");
    } else {
      return this.group;
    }
  }
}

export class StoneGroup {
  static groupCounter: number = 1;
  name: string;
  color: Color;
  stones: Stone[];

  // inner data
  private board: Board;
  private liberties: Coordinate[];
  private opponent_stones: Stone[];

  // if stone is isolated, use this method.
  constructor(stone: Stone, board: Board, sgroups: StoneGroup[] = []) {
    this.board = board;
    stone.group = this;

    this.name = `Group ${StoneGroup.groupCounter++}`;
    // this.name = String.fromCharCode(
    //   "A".charCodeAt(0) + StoneGroup.groupCounter++
    // );
    this.stones = [stone];
    this.liberties = []; // temp, need to initialize
    this.opponent_stones = []; // temp, need to initialize
    this.color = stone.color;
    // console.trace("StoneGroup() this.name: " + this.name);
    this.updateBoundaries(stone);

    if (sgroups.length > 0) {
      this.merge(stone, sgroups);
    }
  }

  //
  // public methods
  //
  getLibertiesCount() {
    return this.liberties.length;
  }

  // has a bug, need to check more conditions
  isCaptured(): boolean {
    return this.getLibertiesCount() == 0;
  }

  isAdjacent(coordinate: Coordinate): boolean {
    // Check the adjacent sides of the stone for open liberties
    const { x, y } = coordinate;
    return (
      this._isAdjacent(x - 1, y) ||
      this._isAdjacent(x + 1, y) ||
      this._isAdjacent(x, y - 1) ||
      this._isAdjacent(x, y + 1)
    );
  }

  private _isAdjacent(row: number, col: number): boolean {
    const board = this.board.getBoardArray();
    if (row >= 0 && row < board.length && col >= 0 && col < board[row].length) {
      const adjacentStone = board[row][col];
      if (adjacentStone) {
        return adjacentStone.group == this;
      }
    }
    return false;
  }

  // if stone is adjacent, use this method.
  addStone(stone: Stone) {
    if (stone.color != this.color) {
      throw new Error("addStone: not the same color.");
    }
    stone.group = this;
    this.stones.push(stone);
    this.updateBoundaries(stone);
  }

  // this is for undo/back operation
  deleteStone(stone: Stone): Stone[] {
    if (stone.color != this.color) {
      throw new Error("removeStone: not the same color.");
    }
    const { x, y } = stone.coordinate;
    const board = this.board.getBoardArray();
    board[x][y] = null;
    stone.group = null;

    // update adjacents opponent's boundary.
    const opponentGroups = this.board.findOpponentStoneGroups(stone);
    for (const osg of opponentGroups) {
      osg.removeFromOpponentStones(stone);
      osg.addToLiberties(stone.coordinate);
    }
    return this.stones;
  }

  // this must be called immediately after StoneGroup was created with stone!
  private merge(stone: Stone, sgroups: StoneGroup[]) {
    for (const sg1 of sgroups) {
      if (stone.color != sg1.color) {
        throw new Error("not the same color.");
      }
      sg1.stones.forEach((stone1: Stone) => {
        stone1.group = this;
        // console.log("@@ " + stone1.toString());
      });

      this.stones.push(...sg1.stones);

      sg1.liberties.forEach((coordinate: Coordinate) => {
        this.addToLiberties(coordinate);
      });
      sg1.opponent_stones.forEach((stone: Stone) => {
        this.addToOpponentStones(stone);
      });
    }

    this.removeFromLiberties(stone.coordinate);
  }

  //
  show() {
    console.log("---- Stone Group: " + this.name + " -----");
    console.log("  [connected stones]");
    for (const [index, stone] of this.stones.entries()) {
      console.log(`    [${index}]: ${stone.toString()}`);
    }
    console.log("  [liberties]");
    for (const [index, coordinate] of this.liberties.entries()) {
      console.log(`    [${index}]: (${coordinate.x}, ${coordinate.y})`);
    }
    console.log("  [opponent_stones]");
    for (const [index, stone] of this.opponent_stones.entries()) {
      console.log(`    [${index}]: ${stone.toString()}`);
    }
    // console.log("  [board]");
    // const board = this.go_game.getBoard();
    // for (const [ridx, row] of board.entries()) {
    //   for (const [cidx, cell] of row.entries()) {
    //     if (cell != null) {
    //       console.log(`    ${cell.toString()}`);
    //     }
    //   }
    // }
    // console.log("------------");
  }

  //
  // hepler methods for liberties, opponent_stones
  //
  addToLiberties(coordinate: Coordinate): boolean {
    if (!this.isInLiberty(coordinate)) {
      this.liberties.push(coordinate);
      return true;
    }
    return false;
  }
  removeFromLiberties(coordinate: Coordinate): boolean {
    for (const [idx, co] of this.liberties.entries()) {
      if (co.x == coordinate.x && co.y == coordinate.y) {
        this.liberties.splice(idx, 1);
        return true;
      }
    }
    return false;
  }

  //
  addToOpponentStones(stone: Stone): boolean {
    if (!this.isInOpponentStones(stone)) {
      this.opponent_stones.push(stone);
      return true;
    }
    return false;
  }

  removeFromOpponentStones(stone: Stone): boolean {
    for (const [idx, st] of this.opponent_stones.entries()) {
      if (st === stone) {
        this.opponent_stones.splice(idx, 1);
        return true;
      }
    }
    return false;
  }

  private isInLiberty(coordinate: Coordinate) {
    return (
      null !=
      this.liberties.find((co) => co.x == coordinate.x && co.y == coordinate.y)
    );
  }

  private isInOpponentStones(stone: Stone) {
    return null != this.opponent_stones.find((_stone) => _stone === stone);
  }

  //
  // updating methods for aj
  //
  private updateBoundaries(stone: Stone) {
    const { x, y } = stone.coordinate;
    // console.log("updateBoundaryInfo x: " + x + ", y: " + y);

    // remove liberty position since the place is occupied.
    this.removeFromLiberties(stone.coordinate);

    // update self boundary
    this.updateSelfBoundary(stone.coordinate);

    // opponents
    const opponentGroups = this.board.findOpponentStoneGroups(stone);
    for (const osg of opponentGroups) {
      osg._updateOpponentBoundary(stone);
    }
  }

  updateSelfBoundary(coordinate: Coordinate) {
    // Check the adjacent sides of the stone for open liberties
    const { x, y } = coordinate;
    this._updateBoundary(x - 1, y);
    this._updateBoundary(x + 1, y);
    this._updateBoundary(x, y - 1);
    this._updateBoundary(x, y + 1);
  }

  private _updateBoundary(row: number, col: number) {
    const board = this.board.getBoardArray();
    if (row >= 0 && row < board.length && col >= 0 && col < board[row].length) {
      const adjacentStone = board[row][col];
      if (adjacentStone == null) {
        this.addToLiberties({ x: row, y: col });
      } else if (adjacentStone.color !== this.color) {
        this.addToOpponentStones(adjacentStone);
      }
    }
  }

  // here it is meant to be opponet stone group..
  private _updateOpponentBoundary(stone: Stone) {
    if (stone.color == this.color) {
      throw new Error("must not have the same color.");
    }
    const removed = this.removeFromLiberties(stone.coordinate);
    if (removed) {
      this.addToOpponentStones(stone);
    }
  }

  getOpponentGroups(): Set<StoneGroup> {
    const oppo_groups = new Set<StoneGroup>();
    for (const oppo_stone of this.opponent_stones) {
      if (oppo_stone.group !== null) {
        oppo_groups.add(oppo_stone.group);
      } else {
        throw new Error(
          "uninitialize stone for stonegroup. oppo_stone: " +
            oppo_stone.toString()
        );
      }
    }
    return oppo_groups;
  }

  // opponent stone group
  captureCheck(): boolean {
    if (this.getLibertiesCount() > 0) {
      return false;
    }
    // this group is captured!

    // update adjacent opponent groups accordingly
    const oppo_groups = this.getOpponentGroups();
    for (const stone of this.stones) {
      for (const oppo_group of oppo_groups) {
        const removed = oppo_group.removeFromOpponentStones(stone);
        if (removed) {
          oppo_group.addToLiberties(stone.coordinate);
        }
      }
    }
    return true;
  }
}

export default StoneGroup;
