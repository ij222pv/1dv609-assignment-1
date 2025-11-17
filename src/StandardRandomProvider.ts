import RandomProvider from "./RandomProvider";

export default class StandardRandomProvider implements RandomProvider {
  public getRandomIntegerInRange(min: number, max: number): number {
    return this.getRandomIntegerUpTo(max - min) + min;
  }

  private getRandomIntegerUpTo(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }
}