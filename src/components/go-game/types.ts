export class Coordinate {
  constructor(public x: number, public y: number) {}
}

export type Color = "black" | "white";

export class StoneGroup {
  constructor(public stones: Stone[], public libertyCount: number) {}
}

export class Stone {
  constructor(
    public coordinate: Coordinate,
    public color: Color,
    public group: StoneGroup | null
  ) {}
}
