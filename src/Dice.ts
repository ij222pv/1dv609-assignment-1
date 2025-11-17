import RandomProvider from "./RandomProvider";

export default class Dice {
  private randomProvider: RandomProvider;

  public constructor(randomProvider: RandomProvider) {
    this.randomProvider = randomProvider;
  }

  public roll(): void {
    this.randomProvider.getRandomIntegerInRange(1, 6);
  }
}