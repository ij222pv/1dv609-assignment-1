export default class Player {
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
}
