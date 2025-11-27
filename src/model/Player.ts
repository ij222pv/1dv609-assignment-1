export default class Player {
  public constructor(private name: string) {
    if (name === "") {
      throw new Error("Player name cannot be empty");
    }
  }

  public getName(): string {
    return this.name;
  }
}
