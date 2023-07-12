"use client";
import React, { useState, ChangeEvent } from "react";
import Board from "./board";
import { SvgBoard } from "../../../public/svg/SvgBoard";
import "./GoGame.sass";
import Image from "next/image";
import { CSSProperties } from "react";
// import internal from "stream";
// import { createUnparsedSourceFile } from "typescript";
// import { group, timeStamp } from "console";
// import { Coordinate } from "./types";
// import React, { Component, ChangeEvent } from 'react';

export type Coordinate = {
  x: number;
  y: number;
};

export enum Color {
  black,
  white,
}

export type UIStone = {
  color: Color;
  libertyCount: number | undefined;
  isLast: boolean;
};

export type UIBoardArray = Array<Array<UIStone | null>>;

type BoardArray = Array<Array<Stone | null>>;

export class Stone {
  constructor(
    public readonly color: Color,
    public readonly coordinate: Coordinate,
    public group: StoneGroup | null
  ) {}

  getUIStone(isLast: boolean): UIStone {
    return {
      color: this.color,
      libertyCount: this.group?.getLibertiesCount(),
      isLast: isLast,
    };
  }

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
  go_game: GoGame;
  static groupCounter: number = 1;
  name: string;
  stones: Stone[];

  liberties: Coordinate[];
  opponent_stones: Stone[];
  color: Color;

  // if stone is isolated, use this method.
  constructor(stone: Stone, go_game: GoGame) {
    this.go_game = go_game;
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
    const board = this.go_game.getBoard();
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
    const board = this.go_game.getBoard();
    board[x][y] = null;
    stone.group = null;

    // update adjacents opponent's boundary.
    const opponentGroups = this.go_game.findOpponentStoneGroups(stone);
    for (const osg of opponentGroups) {
      osg.removeFromOpponentStones(stone);
      osg.addToLiberties(stone.coordinate);
    }
    return this.stones;
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
    const opponentGroups = this.go_game.findOpponentStoneGroups(stone);
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
    const board = this.go_game.getBoard();
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

class StoneAction {
  step: number;
  color: Color;
  coordinate: Coordinate;
  capturedStones: Stone[];

  constructor(step: number, stone: Stone, capturedStones: Stone[] = []) {
    this.step = step;
    this.color = stone.color;
    this.coordinate = stone.coordinate;
    this.capturedStones = capturedStones;
  }

  toString(): string {
    return (
      "StoneAction step: " +
      this.step +
      ", (" +
      this.coordinate.x +
      ", " +
      this.coordinate.y +
      "), capturedStones.length: " +
      this.capturedStones.length
    );
  }
}
export class GoGame extends React.Component<
  {},
  {
    board: UIBoardArray;
    player: string;

    // [nn]
    sgf_input: string;
    black_player: string;
    white_player: string;
    step: number;
    top_step: number;

    captured_black_stones: number;
    captured_white_stones: number;
  }
> {
  static boardSize: number = 19;
  captured_black_stones: number;
  captured_white_stones: number;
  stone_steps: Coordinate[]; // this will be kept while back and forth

  history: StoneAction[];

  //
  board: BoardArray;
  groups: StoneGroup[];
  game_info: Map<string, string>;

  // sample SGF file
  static sample_sfg =
    "(;GM[1]FF[4]SZ[19]PB[朴泰姬]BR[三段]PW[姜多情]WR[三段]KM[6.5]RE[W+R]DT[2023-07-09]GN[2023韓国女子囲碁リーグ];B[pd];W[dp];B[qp];W[dc];B[ce];W[oq];B[ed];W[ec];B[fd];W[gc];B[po];W[cn];B[lq];W[np];B[pq];W[nn];B[pl];W[kp];B[kq];W[jp];B[jq];W[ip];B[hq];W[lp];B[mq];W[cg];B[eg];W[di];B[ei];W[ej];B[fi];W[dh];B[fj];W[ek];B[fk];W[fl];B[gl];W[fm];B[he];W[qf];B[qh];W[ph];B[qi];W[nc];B[pc];W[oe];B[nd];W[rd];B[rc];W[ld];B[ne];W[nf];B[mc];W[mf];B[nb];W[pi];B[pj];W[oj];B[pk];W[qg];B[dr];W[dq];B[er];W[cr];B[br];W[cs];B[ep];W[cd];B[do];W[co];B[eq];W[bq];B[bd];W[bc];B[dd];W[cc];B[or];W[hk];B[gk];W[cf];B[nl];W[mk];B[ml];W[lk];B[mp];W[ll];B[lm];W[mo];B[km];W[im];B[jk];W[ik];B[jj];W[hp];B[gq];W[ii];B[hm];W[in];B[il];W[hl];B[jl];W[gm];B[ij];W[hj];B[hi];W[hn];B[hh];W[ki];B[ji];W[kh];B[be];W[ef];B[de];W[ih];B[jh];W[ig];B[jg];W[if];B[ff];W[gg];B[fg];W[gd];B[gj];W[hm];B[gh];W[eh];B[fh];W[ge];B[df];W[mm];B[ke];W[je];B[mi];W[ni];B[nh];W[mj];B[nm];W[mn];B[kf];W[kd];B[me];W[le];B[lf];W[jd];B[og];W[of];B[pg];W[mh];B[mg];W[ng];B[lh];W[pf];B[kj];W[oh];B[kg];W[mh];B[lo];W[ln];B[nh];W[rb];B[mh];W[qc];B[qd];W[sc];B[qb];W[rc];B[kb];W[jb];B[kc];W[jc];B[pb];W[od];B[oc];W[lb];B[lc];W[ka];B[kn];W[ko];B[en];W[em];B[dj];W[cj];B[dk];W[el];B[dg];W[bh];B[bf];W[bg];B[on];W[md];B[mb];W[la];B[ma];W[ja];B[oa];W[rg];B[ri];W[nq];B[nr];W[gf];B[re];W[qe];B[ra];W[se];B[no];W[oo];B[op];W[pp];B[fc];W[fb];B[op];W[iq])";

  constructor(props: {}) {
    super(props);

    this.captured_black_stones = 0;
    this.captured_white_stones = 0;
    this.stone_steps = [];
    this.history = [];
    this.board = this.initialBoard();
    this.groups = [];
    this.game_info = new Map<string, string>();

    this.state = {
      board: this.initialUIBoard(),

      player: "/black.webp",
      sgf_input: GoGame.sample_sfg,
      black_player: "",
      white_player: "",
      step: 0,
      top_step: 0,
      captured_black_stones: 0,
      captured_white_stones: 0,
    };
  }

  getBoard() {
    return this.board;
  }

  getCuurentStoneAction(): StoneAction {
    return this.history[this.history.length - 1];
  }

  initialBoard(): BoardArray {
    return Array.from({ length: GoGame.boardSize }, () =>
      Array.from({ length: GoGame.boardSize }, () => null)
    );
  }

  initialUIBoard(): UIBoardArray {
    return Array.from({ length: GoGame.boardSize }, () =>
      Array.from({ length: GoGame.boardSize }, () => null)
    );
  }

  getStoneGroups(): StoneGroup[] {
    return this.groups;
    // return this.state.groups;
  }

  show() {
    for (const sg of this.getStoneGroups()) {
      sg.show();
    }
  }

  getCurrentColor() {
    return this.history.length % 2 == 0 ? Color.black : Color.white;
  }

  addGroup(group: StoneGroup) {
    const groups = this.getStoneGroups();
    let idx = groups.indexOf(group);
    if (idx < 0) {
      groups.push(group);
    }
  }

  removeGroup(group: StoneGroup) {
    const groups = this.getStoneGroups();
    let idx = groups.indexOf(group);
    if (idx >= 0) {
      groups.splice(idx, 1);
    }
  }

  findAdjacentStoneGroups(stone: Stone): StoneGroup[] {
    const groups = this.getStoneGroups();
    return groups.filter(
      (group) =>
        group.color == stone.color && group.isAdjacent(stone.coordinate)
    );
  }

  findOpponentStoneGroups(stone: Stone): StoneGroup[] {
    // console.log("stone.color: " + stone.color);
    const groups = this.getStoneGroups();
    return groups.filter((group) => {
      const adj = group.isAdjacent(stone.coordinate);
      // console.log(
      //   "gname: " +
      //     group.name +
      //     ", group.color: " +
      //     group.color +
      //     ", adj: " +
      //     adj +
      //     ", stone: " +
      //     stone.toString()
      // );
      //group.show();
      return group.color != stone.color && adj;
    });
  }

  merge(stone: Stone, ...sgroups: StoneGroup[]): StoneGroup {
    const sg = new StoneGroup(stone, this);

    for (const sg1 of sgroups) {
      if (stone.color != sg1.color) {
        throw new Error("not the same color.");
      }
      sg1.stones.forEach((stone1) => {
        stone1.group = sg;
        // console.log("@@ " + stone1.toString());
      });

      sg.stones.push(...sg1.stones);

      sg1.liberties.forEach((item) => {
        sg.addToLiberties(item);
      });
      sg1.opponent_stones.forEach((item) => {
        sg.addToOpponentStones(item);
      });
    }

    sg.removeFromLiberties(stone.coordinate);

    sgroups.forEach((group) => {
      this.removeGroup(group);
    });
    this.addGroup(sg);

    return sg;
  }

  createNewStone(row: number, col: number): Stone | null {
    // check coordinate is already opupied or not.
    const board = this.getBoard();
    if (board[row][col]) {
      //throw new Error("already occupied.");
      console.log("already occupied.");
      return null;
    }

    // create new stone.
    const color: Color = this.getCurrentColor();
    const coordinate = { x: row, y: col };
    const stone = new Stone(color, coordinate, null);
    board[row][col] = stone;

    return stone;
  }

  getStoneFromBoard(c: Coordinate): Stone | null {
    return this.getBoard()[c.x][c.y];
  }

  getCurrentHistoryIndex(): number {
    return this.history.length;
  }

  lastStoneAction(): StoneAction | null {
    const idx = this.getCurrentHistoryIndex();
    if (idx === 0) {
      return null;
    }
    return this.history[idx - 1];
  }

  addHistory(stone: Stone, captured_stones: Stone[]) {
    const step = this.getCurrentHistoryIndex();
    const sa = new StoneAction(step, stone, captured_stones);
    this.history.push(sa);
  }

  is_explore_mode(): boolean {
    return this.history.length < this.stone_steps.length;
  }

  log_step(method_name: string) {
    if (1 === 1) {
      return; // turn off logging
    }
    console.log(
      ">> " +
        method_name +
        " history: " +
        this.history.length +
        ", stone_steps: " +
        this.stone_steps.length
    );
  }

  //
  // #### main entry point #########
  //
  placeStone(row: number, col: number): Stone | null {
    this.log_step("placeStone");
    return this._placeStone(row, col);
  }

  private exploreStone(row: number, col: number): Stone | null {
    this.log_step("exploreStone");
    return this._placeStone(row, col, true);
  }

  private fillStone(row: number, col: number): Stone | null {
    this.log_step("fillStone");
    return this._placeStone(row, col, true, false);
  }

  private rapidMoveStone(row: number, col: number): Stone | null {
    this.log_step("exploreStone");
    return this._placeStone(row, col, true, true, true);
  }

  private _placeStone(
    row: number,
    col: number,
    auto_mode: boolean = false,
    update_history: boolean = true,
    no_ui_update: boolean = false
  ): Stone | null {
    if (!auto_mode && this.is_explore_mode()) {
      alert("cannot make new stone move during explore mode..");
      return null;
    }
    const stone = this.createNewStone(row, col);
    if (!stone) {
      return null;
    }

    const sg = this.getStoneGroup(stone); // when StoneGroup was allocated or updated, check whether it captured opponent stones!!

    const captured_stones = this.getCapturedStones(stone);

    if (!auto_mode) {
      sg.show();
    }
    if (update_history) {
      if (!this.is_explore_mode()) {
        this.stone_steps.push(stone.coordinate);
      }

      this.addHistory(stone, captured_stones);
    }

    // this has bug. need to consider more. [nn]
    // if (sg.isCaptured()) {
    //   alert(
    //     "cannot place a stone where it makes capture your stone by the opponent."
    //   );
    //   this.undoStone();
    //   return null;
    // }
    if (!no_ui_update) {
      this.updateUI();
    }
    return stone;
  }

  isLast(x: number, y: number): boolean {
    return !this.is_explore_mode();
  }

  updateUI() {
    const board = this.board;
    const self = this;
    const saction = this.history[this.history.length - 1];
    const { x, y } = saction ? saction.coordinate : { x: -1, y: -1 };
    const black_player = this.game_info.get("PB");
    const white_player = this.game_info.get("PW");
    const step = this.getCurrentHistoryIndex();
    const top_step = this.stone_steps.length;

    this.setState((prevState) => ({
      player:
        prevState.player === "/black.webp" ? "/white.webp" : "/black.webp",
      board: board.map((newRow, rowIndex) =>
        newRow.map((stone, cellIndex) => {
          if (stone) {
            const isLast = rowIndex == x && cellIndex == y;
            return stone.getUIStone(isLast);
          } else {
            return null;
          }
        })
      ),
      black_player: black_player ? black_player : "",
      white_player: white_player ? white_player : "",
      step: step,
      top_step: top_step,
      captured_black_stones: self.captured_black_stones,
      captured_white_stones: self.captured_white_stones,
    }));
  }

  private getStoneGroup(stone: Stone): StoneGroup {
    // find adjacent groups of the same Color
    const asgroups = this.findAdjacentStoneGroups(stone);
    let sg: StoneGroup;
    if (asgroups == null || asgroups.length == 0) {
      console.log("[new group] " + stone.toString());
      sg = new StoneGroup(stone, this);
      this.addGroup(sg); // update state.groups!
    } else if (asgroups.length == 1) {
      console.log("[add stone] " + stone.toString());
      sg = asgroups[0];
      sg.addStone(stone);
    } else {
      // asgroups.length > 1
      console.log("[merge groups] " + stone.toString());
      for (const sg of asgroups) {
        console.log("  sg: " + sg.name);
      }

      sg = this.merge(stone, ...asgroups);
    }
    stone.group = sg;
    return sg;
  }

  private getCapturedStones(stone: Stone): Stone[] {
    const captured_stones: Stone[] = [];
    const opponentGroups = this.findOpponentStoneGroups(stone);
    for (const osg of opponentGroups) {
      const is_captured = osg.captureCheck();

      if (!is_captured) {
        continue;
      }

      this.captureStoneGroup(osg, captured_stones);
    }
    return captured_stones;
  }

  private captureStoneGroup(osg: StoneGroup, captured_stones: Stone[]) {
    // remoe this group from manager
    this.removeGroup(osg);

    const s_count = osg.stones.length;
    if (s_count === 0) {
      return;
    }

    const board = this.getBoard();
    for (const ostone of osg.stones) {
      if (!board[ostone.coordinate.x][ostone.coordinate.y]) {
        continue;
      }
      board[ostone.coordinate.x][ostone.coordinate.y] = null;
      ostone.group = null;
      captured_stones.push(ostone);
    }

    if (osg.color == Color.white) {
      this.captured_white_stones += s_count;
    } else {
      this.captured_black_stones += s_count;
    }
  }

  getLastStone(): Stone | null {
    const sa = this.lastStoneAction();
    if (!sa) {
      //alert("bug? no last stone found in history.");
      return null;
    }
    const last_stone = this.getStoneFromBoard(sa.coordinate);
    return last_stone;
  }

  //
  // #### main entry point #########
  //
  stepForward() {
    this.log_step("stepForward");
    if (!this.is_explore_mode()) {
      //alert("this is the last step..");
      return;
    }
    const idx = this.history.length;
    const coodinate = this.stone_steps[idx];
    const stone = this.exploreStone(coodinate.x, coodinate.y);
    if (!stone) {
      throw new Error("step forward failed ");
    }
  }

  //
  // #### main entry point #########
  //
  undoStone() {
    this.log_step("undoStone");
    this._stepBack(true);
  }

  //
  // #### main entry point #########
  //
  stepBack() {
    this.log_step("stepBack");
    this._stepBack();
  }

  private rapidStepBack() {
    this._stepBack(false, true);
  }

  private _stepBack(is_undo: boolean = false, no_ui_update: boolean = false) {
    if (this.history.length == 0) {
      //alert("cannot step beck anymore!");
      return;
    }
    if (is_undo && this.is_explore_mode()) {
      alert("cannot undo while it is not in the last step.");
      return;
    }
    const sa = this.lastStoneAction();
    if (!sa) {
      alert("bug? no last stone found in history.");
      return;
    }
    const last_stone = this.getStoneFromBoard(sa.coordinate);
    if (!last_stone) {
      throw new Error(
        "stepBack: not found stone at (" +
          sa.coordinate.x +
          ", " +
          sa.coordinate.x +
          ")"
      );
    }
    // remove last stone
    this.removeStone(last_stone);

    // recover captured stones
    const c_count = sa.capturedStones.length;
    if (c_count > 0) {
      for (const cstone of sa.capturedStones) {
        const { x, y } = cstone.coordinate;
        this.fillStone(x, y);
      }

      const color = sa.capturedStones[0].color;
      if (color == Color.white) {
        this.captured_white_stones -= c_count;
      } else {
        this.captured_black_stones -= c_count;
      }
    }

    // step info updates
    if (is_undo) {
      this.stone_steps.pop();
    }
    this.history.pop();

    if (!no_ui_update) {
      this.updateUI();
    }
  }

  //
  // just single stone restore step without capturing recovering.
  //
  private removeStone(stone: Stone) {
    const sg = stone.group;
    if (!sg) {
      return;
    }

    // there is side-effects for neibouring groups, so this is required!
    const stones = sg.deleteStone(stone);

    // since in general it is required to recreate groups, we always remove the current group!
    this.removeGroup(sg);

    // already the stone is removed by sg.removeStone(stone).
    this.updateBoundaryOfRemovedStones(stones);
  }

  //
  private updateBoundaryOfRemovedStones(stones: Stone[]) {
    if (stones.length == 0) {
      return [];
    }
    const unused_stones: Stone[] = [...stones];
    const used_stones: Stone[] = [];
    const groups: StoneGroup[] = [];

    let stone: Stone = unused_stones[0];
    if (!stone) {
      return [];
    }
    const stack: Stone[] = [stone];
    while (true) {
      let stone = stack.pop();
      if (!stone) {
        stone = unused_stones.pop();
        if (!stone) {
          break;
        }
      } else {
        const idx1 = unused_stones.indexOf(stone);
        if (idx1 >= 0) {
          unused_stones.splice(idx1, 1);
        }
      }
      used_stones.push(stone);

      this.update_adjacent_group(stone, groups);

      // prepare for the next loop selecting adjacent stones as the next candidate!
      const adj_stones = this.get_adjacent_stones(
        stone.coordinate,
        used_stones,
        unused_stones
      );
      stack.push(...adj_stones);
    }
    return groups;
  }

  private update_adjacent_group(stone: Stone, groups: StoneGroup[]) {
    const adj_groups = [];
    for (const group of groups) {
      if (group.isAdjacent(stone.coordinate)) {
        adj_groups.push(group);
      }
    }
    if (adj_groups.length === 0) {
    } else if (adj_groups.length === 1) {
      const sg = adj_groups[0];
      sg.addStone(stone);
    } else {
      const sg = this.merge(stone, ...adj_groups);

      // remove old adj_groups from groups and add new onw to groups
      for (const adj_group of adj_groups) {
        let index = groups.indexOf(adj_group);
        if (index >= 0) {
          groups.splice(index, 1);
        }
      }
      groups.push(sg);
      console.log("@3 update_adjacent_group");
    }
  }

  private get_adjacent_stones(
    coordinate: Coordinate,
    used_stones: Stone[],
    unused_stones: Stone[]
  ): Stone[] {
    const adj_stones: Stone[] = [];
    const { x, y } = coordinate;

    // Check the adjacent sides of the stone for open liberties
    this.updateAdjacentStones(x - 1, y, used_stones, unused_stones, adj_stones);
    this.updateAdjacentStones(x + 1, y, used_stones, unused_stones, adj_stones);
    this.updateAdjacentStones(x, y - 1, used_stones, unused_stones, adj_stones);
    this.updateAdjacentStones(x, y + 1, used_stones, unused_stones, adj_stones);

    return adj_stones;
  }

  private updateAdjacentStones(
    row: number,
    col: number,
    used_stones: Stone[],
    unused_stones: Stone[],
    adj_stones: Stone[]
  ) {
    const board = this.getBoard();
    if (row >= 0 && row < board.length && col >= 0 && col < board[row].length) {
      const stone = board[row][col];
      if (stone) {
        const idx0 = used_stones.indexOf(stone);
        if (idx0 >= 0) {
          return;
        }

        const idx1 = unused_stones.indexOf(stone);
        if (idx1 >= 0) {
          if (adj_stones.indexOf(stone) < 0) {
            adj_stones.push(stone);
          }
        }
      }
    }
  }

  handleDoubleClick(row: number, col: number) {
    this.showStoneGroup(row, col);
  }

  showStoneGroup(row: number, col: number) {
    const stone = this.getBoard()[row][col];
    if (!stone) {
      return;
    }
    if (stone.group) {
      stone.group.show();
    }
  }

  //
  // #### main entry point #########
  //

  restartGame() {
    this._restartGame();
    console.log("Game restarted");
    console.log("---");
  }

  _restartGame(game_info: Map<string, string> = new Map<string, string>()) {
    const black_player = game_info.get("PB");
    const white_player = game_info.get("PW");
    this.setState({
      board: this.initialUIBoard(),
      player: "/black.webp",
      sgf_input: "",
      black_player: black_player ? black_player : "",
      white_player: white_player ? white_player : "",
      step: 0,
      top_step: 0,
      captured_black_stones: 0,
      captured_white_stones: 0,
    });
    this.captured_black_stones = 0;
    this.captured_white_stones = 0;
    this.stone_steps = [];
    this.history = [];
    this.board = this.initialBoard();
    this.groups = [];
    this.game_info = game_info;
    StoneGroup.groupCounter = 1; // [nn] groupCounter should be instance property of GoGame!
  }

  ///
  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ sgf_input: event.target.value });
  }
  handleStepInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target_step = Number(event.target.value);
    this.setState({ step: target_step });
    this._moveTo(target_step);
  }

  // handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   // Do something with the submitted value
  //   console.log("Submitted value:", this.state.sgf_input);
  // }

  loadSGF() {
    console.log("loadSGF:", this.state.sgf_input);
    const sgf = this.state.sgf_input.substring(
      2,
      this.state.sgf_input.length - 1
    );
    const tokens = sgf.split(";");
    for (const [index, token] of tokens.entries()) {
      console.log(`    [${index}]: ${token}`);
      if (index === 0) {
        this.game_info = this.getGameInfo(token);
        break;
      }
    }
    this._restartGame(this.game_info);

    for (const [index, token] of tokens.entries()) {
      console.log(`    [${index}]: ${token}`);
      if (index === 0) {
        continue;
      }
      const color = token[0];
      const coordinate = this.getCoordinateFromToken(token);
      console.log(`    ${color} (${coordinate.x}, ${coordinate.y})`);
      this.stone_steps.push(coordinate);
    }
    console.log("loaded file, use play button.");
  }

  getGameInfo(token: string): Map<string, string> {
    const info = new Map<string, string>();
    const items = token.split("]");
    for (const item of items) {
      const pair = item.split("[");
      const key = pair[0];
      const value = pair[1];
      info.set(key, value);
    }
    return info;
  }

  getCoordinateFromToken(token: string): Coordinate {
    const baseCode = "a".charCodeAt(0);
    const x = token.charCodeAt(3) - baseCode;
    const y = token.charCodeAt(2) - baseCode;

    return { x: x, y: y };
  }

  moveToFirst() {
    this._moveTo(0);
  }

  moveToLast() {
    const last_idx = this.stone_steps.length;
    this._moveTo(last_idx);
  }

  moveTo() {
    const target_idx = this.state.step;
    this._moveTo(target_idx);
  }

  _moveTo(target_idx: number) {
    const last_idx = this.stone_steps.length;
    if (last_idx === 0) {
      return;
    }

    let cidx = this.getCurrentHistoryIndex();
    if (cidx < target_idx) {
      console.log("1 _moveTo");
      target_idx = target_idx > last_idx ? last_idx : target_idx;
      while (cidx < target_idx) {
        const { x, y } = this.stone_steps[cidx++];
        this.rapidMoveStone(x, y);
      }
    } else if (target_idx < cidx) {
      console.log("2 _moveTo");
      while (target_idx < cidx) {
        cidx--;
        this.rapidStepBack();
      }
    } else {
      console.log("2 _moveTo");
      return;
    }
    this.updateUI();
  }

  render() {
    const BoardStyle: CSSProperties = {
      marginTop: "10px",
    };
    const ControlPanelStyle: CSSProperties = {
      marginBottom: "10px",
    };
    const inputStyle: CSSProperties = {
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "8px",
      width: "380px",
    };
    const buttonStyle: CSSProperties = {
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "8px",
      marginLeft: "20px",
      width: "100px",
    };
    const numberInputStyle: CSSProperties = {
      border: "1px solid #ccc",
      textAlign: "center",
      width: "40px",
    };
    const symbolInputStyle: CSSProperties = {
      border: "1px solid #ccc",
      textAlign: "center",
      width: "40px",
    };
    const labelStyle: CSSProperties = {
      marginRight: "20px",
      width: "120px",
    };

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
          src="/black_latest.png"
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
        <Image
          src="/white_latest.png"
          width={20}
          height={20}
          alt="img"
          priority
          className="hidden"
        />

        <div className="flex">
          <div>
            <div>
              <div>
                <span>
                  <label style={labelStyle}>Black</label>
                </span>
                <span>{this.state.black_player}</span>
              </div>
              <div>
                <span>
                  <label style={labelStyle}>White</label>
                </span>
                <span>{this.state.white_player}</span>
              </div>
            </div>

            <div
              style={ControlPanelStyle}
              className="flex justify-around items-center outline mt-4  p-4"
            >
              <label>B Stones: </label>
              <span>{this.state.captured_black_stones}</span>

              <span>
                <Image
                  hidden={this.state.player == "/black.webp"}
                  width={20}
                  height={20}
                  src="/white.webp"
                  alt=""
                />
                <Image
                  hidden={this.state.player != "/black.webp"}
                  width={20}
                  height={20}
                  src="/black.webp"
                  alt=""
                />
              </span>

              <label>W Stones: </label>
              <span>{this.state.captured_white_stones}</span>
            </div>

            <div
              style={BoardStyle}
              className="flex justify-center items-center relative w-[380px] h-[380px] "
            >
              <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-0 ">
                <SvgBoard />
              </div>

              <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
                <Board
                  board={this.state.board}
                  handleClick={this.placeStone.bind(this)}
                  handleDoubleClick={this.handleDoubleClick.bind(this)}
                />
              </div>
            </div>

            <div
              style={ControlPanelStyle}
              className="flex justify-around items-center outline mt-4  p-4"
            >
              <button
                className="hover:underline"
                type="button"
                style={symbolInputStyle}
                onClick={this.moveToFirst.bind(this)}
              >
                &#10703;
              </button>
              <button
                className="hover:underline"
                type="button"
                style={symbolInputStyle}
                onClick={this.stepBack.bind(this)}
              >
                &#9668;
              </button>
              <div>
                <span>
                  <input
                    type="text"
                    value={this.state.step}
                    onChange={this.handleStepInputChange.bind(this)}
                    style={numberInputStyle}
                    placeholder="Enter Step Number"
                  />
                </span>
              </div>
              <button
                className="hover:underline"
                type="button"
                style={symbolInputStyle}
                onClick={this.stepForward.bind(this)}
              >
                &#9658;
              </button>
              <button
                className="hover:underline"
                type="button"
                style={symbolInputStyle}
                onClick={this.moveToLast.bind(this)}
              >
                &#10704;
              </button>
            </div>

            <div>
              <button
                className="hover:underline"
                type="button"
                style={buttonStyle}
                onClick={this.loadSGF.bind(this)}
              >
                Load SGF
              </button>
              <button
                className="hover:underline"
                type="button"
                style={buttonStyle}
                onClick={this.restartGame.bind(this)}
              >
                Clear Board
              </button>
              <button
                hidden={this.state.step != this.state.top_step}
                className="hover:underline"
                type="button"
                style={buttonStyle}
                onClick={this.undoStone.bind(this)}
              >
                Undo
              </button>
            </div>

            <div>
              <input
                type="text"
                value={this.state.sgf_input}
                onChange={this.handleInputChange.bind(this)}
                style={inputStyle}
                placeholder="Enter SGF file"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoGame;
