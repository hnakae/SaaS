import { Coordinate, Color, Stone, StoneGroup } from "./StoneGroup";

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

type BoardArray = Array<Array<Stone | null>>;

export class Board {
  static boardSize: number = 19;
  private captured_black_stones: number;
  private captured_white_stones: number;
  private stone_steps: Coordinate[]; // this will be kept while back and forth
  private history: StoneAction[];

  //
  private board: BoardArray;
  private groups: StoneGroup[];
  private game_info: Map<string, string>;

  constructor() {
    this.captured_black_stones = 0;
    this.captured_white_stones = 0;
    this.stone_steps = [];
    this.history = [];
    this.board = this.initialBoard();
    this.groups = [];
    this.game_info = new Map<string, string>();
  }

  getBoardArray() {
    return this.board;
  }

  getTopStep(): number {
    return this.stone_steps.length;
  }

  getCuurentStoneAction(): StoneAction {
    return this.history[this.history.length - 1];
  }

  initialBoard(): BoardArray {
    return Array.from({ length: Board.boardSize }, () =>
      Array.from({ length: Board.boardSize }, () => null)
    );
  }

  getStoneGroups(): StoneGroup[] {
    return this.groups;
  }

  show() {
    for (const sg of this.getStoneGroups()) {
      sg.show();
    }
  }

  getCurrentColor() {
    return this.history.length % 2 == 0 ? Color.black : Color.white;
  }

  getStoneFromBoard(c: Coordinate): Stone | null {
    return this.board[c.x][c.y];
  }

  getCapcureBlackCount(): number {
    return this.captured_black_stones;
  }

  getCapcureWhiteCount(): number {
    return this.captured_white_stones;
  }

  getGameInfo(): Map<string, string> {
    return this.game_info;
  }

  //
  // History related
  //
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

  private addHistory(stone: Stone, captured_stones: Stone[]) {
    const step = this.getCurrentHistoryIndex();
    const sa = new StoneAction(step, stone, captured_stones);
    this.history.push(sa);
  }

  is_explore_mode(): boolean {
    return this.history.length < this.stone_steps.length;
  }

  isLast(x: number, y: number): boolean {
    return !this.is_explore_mode();
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
  //
  //
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

  private merge(stone: Stone, sgroups: StoneGroup[]): StoneGroup {
    const sg = new StoneGroup(stone, this, sgroups);

    sgroups.forEach((group) => {
      this.removeGroup(group);
    });
    this.addGroup(sg);

    return sg;
  }

  private createNewStone(row: number, col: number): Stone | null {
    // check coordinate is already opupied or not.
    const board = this.board;
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

  //
  // #### main entry point #########
  //
  placeStone(row: number, col: number): Stone | null {
    this.log_step("placeStone");
    return this._placeStone(row, col);
  }

  exploreStone(row: number, col: number): Stone | null {
    this.log_step("exploreStone");
    return this._placeStone(row, col, true);
  }

  private fillStone(row: number, col: number): Stone | null {
    this.log_step("fillStone");
    return this._placeStone(row, col, true, false);
  }

  private _placeStone(
    row: number,
    col: number,
    auto_mode: boolean = false,
    update_history: boolean = true
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
    // if (!no_ui_update) {
    //   this.updateUI();
    // }
    return stone;
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
      sg = this.merge(stone, asgroups);
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

    const board = this.board;
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

  stepForward(): Stone | null {
    this.log_step("stepForward");
    if (!this.is_explore_mode()) {
      //alert("this is the last step..");
      return null;
    }
    const idx = this.history.length;
    const coodinate = this.stone_steps[idx];
    const stone = this.exploreStone(coodinate.x, coodinate.y);
    // if (!stone) {
    //   throw new Error("step forward failed ");
    // }
    return stone;
  }

  undoStone(): boolean {
    this.log_step("undoStone");
    return this._stepBack(true);
  }

  stepBack(): boolean {
    this.log_step("stepBack");
    return this._stepBack(false);
  }

  private _stepBack(is_undo: boolean = false): boolean {
    if (this.history.length == 0) {
      //alert("cannot step beck anymore!");
      return false;
    }
    if (is_undo && this.is_explore_mode()) {
      console.log("cannot undo while it is not in the last step.");
      return false;
    }
    const sa = this.lastStoneAction();
    if (!sa) {
      console.log("bug? no last stone found in history.");
      return false;
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
    return true;
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
  //
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
      const sg = this.merge(stone, adj_groups);

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
    const board = this.board;
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

  //
  //
  //
  restartGame() {
    this._restartGame();
    console.log("Game restarted");
  }

  _restartGame(
    game_info: Map<string, string> = new Map<string, string>(),
    stone_steps: Coordinate[] = []
  ) {
    this.captured_black_stones = 0;
    this.captured_white_stones = 0;
    this.stone_steps = [];
    this.history = [];
    this.board = this.initialBoard();
    this.groups = [];
    this.game_info = game_info;
    this.stone_steps = stone_steps;
    StoneGroup.groupCounter = 1; // [nn] groupCounter should be instance property of GoGame!
  }

  loadSGF(sgf_input: string) {
    //console.log("loadSGF:", this.state.sgf_input);
    const sgf = sgf_input.substring(2, sgf_input.length - 1);
    const tokens = sgf.split(";");

    let game_info: Map<string, string> = new Map();
    const stone_steps = [];
    for (const [index, token] of tokens.entries()) {
      console.log(`    [${index}]: ${token}`);
      if (index === 0) {
        game_info = Board.createGameInfo(token);
      } else {
        const color = token[0];
        const coordinate = this.getCoordinateFromToken(token);
        console.log(`    ${color} (${coordinate.x}, ${coordinate.y})`);
        stone_steps.push(coordinate);
      }
    }
    this._restartGame(game_info, stone_steps);
    console.log("SGF loaded");
    // console.log("loaded file, use play button.");
  }

  static createGameInfo(token: string): Map<string, string> {
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

  moveToFirst(): boolean {
    return this.moveTo(0);
  }

  moveToLast(): boolean {
    const last_idx = this.stone_steps.length;
    return this.moveTo(last_idx);
  }

  moveTo(target_idx: number): boolean {
    const last_idx = this.stone_steps.length;
    if (last_idx === 0) {
      return false;
    }

    let cidx = this.getCurrentHistoryIndex();
    if (cidx < target_idx) {
      console.log("1 _moveTo");
      target_idx = target_idx > last_idx ? last_idx : target_idx;
      while (cidx < target_idx) {
        const { x, y } = this.stone_steps[cidx++];
        // this.rapidMoveStone(x, y);
        this.exploreStone(x, y);
      }
    } else if (target_idx < cidx) {
      console.log("2 _moveTo");
      while (target_idx < cidx) {
        cidx--;
        this.stepBack();
      }
    } else {
      console.log("2 _moveTo");
      return false;
    }
    // this.updateUI();
    return true;
  }
}

export default Board;
