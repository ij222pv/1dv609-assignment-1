import RandomProvider from "./RandomProvider";

export default class Dice {
  private value: number;
  private randomProvider: RandomProvider;

  public constructor(randomProvider: RandomProvider) {
    this.randomProvider = randomProvider;
    this.roll();
  }

  public roll(): void {
    this.value = this.randomProvider.getRandomIntegerInRange(1, 6);
  }

  public getValue(): number {
    return this.value;
  }
}