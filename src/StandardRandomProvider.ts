import RandomProvider from "./RandomProvider";

export default class StandardRandomProvider implements RandomProvider {
  public getRandomIntegerInRange(min: number, max: number): number {
    if (max <= min) {
      throw new Error("Max must be greater than min");
    }
    return this.getRandomIntegerUpTo(max - min) + min;
  }

  private getRandomIntegerUpTo(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }
}