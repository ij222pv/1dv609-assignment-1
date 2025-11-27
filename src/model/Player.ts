export default class Player {
  private score: number = 0;

  public constructor(private name: string) {
    if (name === "") {
      throw new Error("Player name cannot be empty");
    }

    if (name.match(/^\s+$/)) {
      throw new Error("Player name cannot be only whitespaces");
    }
  }

  public getName(): string {
    return this.name;
  }

  public addScore(score: number): void {
    this.score += score;
  }

  public getScore(): number {
    return this.score;
  }
}
