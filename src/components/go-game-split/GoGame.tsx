"use client";

import React, { useState, ChangeEvent } from "react";
import { SvgBoard } from "../../../public/svg/SvgBoard";
import "./GoGame.sass";
import Image from "next/image";
import { CSSProperties } from "react";

import UIBoard from "./UIBoard";
import { Color, Stone } from "./StoneGroup";
import { Board } from "./Board";

export type UIStone = {
  color: Color;
  libertyCount: number | undefined;
  isLast: boolean;
};

export type UIBoardArray = Array<Array<UIStone | null>>;

function getUIStone(stone: Stone, isLast: boolean): UIStone {
  return {
    color: stone.color,
    libertyCount: stone.group?.getLibertiesCount(),
    isLast: isLast,
  };
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
  board: Board;

  // sample SGF file
  static sample_sfg =
    "(;GM[1]FF[4]SZ[19]PB[朴泰姬]BR[三段]PW[姜多情]WR[三段]KM[6.5]RE[W+R]DT[2023-07-09]GN[2023韓国女子囲碁リーグ];B[pd];W[dp];B[qp];W[dc];B[ce];W[oq];B[ed];W[ec];B[fd];W[gc];B[po];W[cn];B[lq];W[np];B[pq];W[nn];B[pl];W[kp];B[kq];W[jp];B[jq];W[ip];B[hq];W[lp];B[mq];W[cg];B[eg];W[di];B[ei];W[ej];B[fi];W[dh];B[fj];W[ek];B[fk];W[fl];B[gl];W[fm];B[he];W[qf];B[qh];W[ph];B[qi];W[nc];B[pc];W[oe];B[nd];W[rd];B[rc];W[ld];B[ne];W[nf];B[mc];W[mf];B[nb];W[pi];B[pj];W[oj];B[pk];W[qg];B[dr];W[dq];B[er];W[cr];B[br];W[cs];B[ep];W[cd];B[do];W[co];B[eq];W[bq];B[bd];W[bc];B[dd];W[cc];B[or];W[hk];B[gk];W[cf];B[nl];W[mk];B[ml];W[lk];B[mp];W[ll];B[lm];W[mo];B[km];W[im];B[jk];W[ik];B[jj];W[hp];B[gq];W[ii];B[hm];W[in];B[il];W[hl];B[jl];W[gm];B[ij];W[hj];B[hi];W[hn];B[hh];W[ki];B[ji];W[kh];B[be];W[ef];B[de];W[ih];B[jh];W[ig];B[jg];W[if];B[ff];W[gg];B[fg];W[gd];B[gj];W[hm];B[gh];W[eh];B[fh];W[ge];B[df];W[mm];B[ke];W[je];B[mi];W[ni];B[nh];W[mj];B[nm];W[mn];B[kf];W[kd];B[me];W[le];B[lf];W[jd];B[og];W[of];B[pg];W[mh];B[mg];W[ng];B[lh];W[pf];B[kj];W[oh];B[kg];W[mh];B[lo];W[ln];B[nh];W[rb];B[mh];W[qc];B[qd];W[sc];B[qb];W[rc];B[kb];W[jb];B[kc];W[jc];B[pb];W[od];B[oc];W[lb];B[lc];W[ka];B[kn];W[ko];B[en];W[em];B[dj];W[cj];B[dk];W[el];B[dg];W[bh];B[bf];W[bg];B[on];W[md];B[mb];W[la];B[ma];W[ja];B[oa];W[rg];B[ri];W[nq];B[nr];W[gf];B[re];W[qe];B[ra];W[se];B[no];W[oo];B[op];W[pp];B[fc];W[fb];B[op];W[iq])";

  constructor(props: {}) {
    super(props);
    this.board = new Board();
    this.state = GoGame.createGameState();
  }

  restartGame() {
    this.board.restartGame();
    this.initGameState();
  }

  loadSGF() {
    this.board.loadSGF(this.state.sgf_input);

    // const game_info = this.board.game_info;
    this.initGameState(this.board.getGameInfo());
  }

  //
  //
  placeStone(row: number, col: number) {
    const exploreMode = this.board.is_explore_mode();
    const stone = exploreMode
      ? this.board.exploreStone(row, col)
      : this.board.placeStone(row, col);
    if (stone) {
      this.updateGameState();
    }
  }

  stepForward() {
    const stone = this.board.stepForward();
    if (stone) {
      this.updateGameState();
    }
  }

  undoStone() {
    const ok = this.board.undoStone();
    if (ok) {
      this.updateGameState();
    }
  }

  stepBack() {
    const ok = this.board.stepBack();
    if (ok) {
      this.updateGameState();
    }
  }

  moveToFirst() {
    this._moveTo(0);
  }

  moveToLast() {
    this._moveTo(this.board.getTopStep());
  }

  moveTo() {
    this._moveTo(this.state.step);
  }

  _moveTo(target_idx: number) {
    const ok = this.board.moveTo(target_idx);
    if (ok) {
      this.updateGameState();
    }
  }

  ///
  ///
  ///

  private initGameState(game_info: Map<string, string> | null = null) {
    const state = GoGame.createGameState();
    if (game_info) {
      const black_player = game_info.get("PB");
      const white_player = game_info.get("PW");
      state.black_player = black_player ? black_player : "";
      state.white_player = white_player ? white_player : "";
    }
    this.setState(state);
  }

  static createGameState() {
    return {
      board: GoGame.initialUIBoard(),
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

  static initialUIBoard(): UIBoardArray {
    return Array.from({ length: Board.boardSize }, () =>
      Array.from({ length: Board.boardSize }, () => null)
    );
  }

  updateGameState() {
    const boardArray = this.board.getBoardArray();
    const board = this.board;
    const saction = board.getCuurentStoneAction();
    const game_info = board.getGameInfo();
    const { x, y } = saction ? saction.coordinate : { x: -1, y: -1 };
    const black_player = game_info.get("PB");
    const white_player = game_info.get("PW");
    const step = board.getCurrentHistoryIndex();
    const top_step = board.getTopStep();

    this.setState((prevState) => ({
      player:
        prevState.player === "/black.webp" ? "/white.webp" : "/black.webp",
      board: boardArray.map((newRow, rowIndex) =>
        newRow.map((stone, cellIndex) => {
          if (stone) {
            const isLast = rowIndex == x && cellIndex == y;
            return getUIStone(stone, isLast);
          } else {
            return null;
          }
        })
      ),
      black_player: black_player ? black_player : "",
      white_player: white_player ? white_player : "",
      step: step,
      top_step: top_step,
      captured_black_stones: board.getCapcureBlackCount(),
      captured_white_stones: board.getCapcureWhiteCount(),
    }));
  }

  //
  // UI
  //
  handleDoubleClick(row: number, col: number) {
    this.showStoneGroup(row, col);
  }

  showStoneGroup(row: number, col: number) {
    const stone = this.board.getBoardArray()[row][col];
    if (!stone) {
      return;
    }
    if (stone.group) {
      stone.group.show();
    }
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ sgf_input: event.target.value });
  }

  handleStepInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target_step = Number(event.target.value);
    this.setState({ step: target_step });
    this._moveTo(target_step);
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
                <UIBoard
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
