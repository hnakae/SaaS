export class Coordinate {
  constructor(public x: number, public y: number) {}
}

export enum Color {
  black,
  white,
}

export class GoGame {}
export class StoneGroup {
  constructor(stone: Stone, go_game: GoGame) {}
}

export class Stone {
  constructor(
    public color: Color,
    public coordinate: Coordinate,
    public group: StoneGroup | null
  ) {}
}
