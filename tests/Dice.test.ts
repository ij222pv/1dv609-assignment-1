import { describe, test, expect } from "@jest/globals";
import Dice from "../src/Dice";
import RandomProvider from "../src/RandomProvider";

class FakeRandomProvider implements RandomProvider {
  private hasBeenCalled = false;

  public getRandomIntegerInRange(min: number, max: number): number {
    this.hasBeenCalled = true;
    return 3;
  }

  public verify(): void {
    expect(this.hasBeenCalled).toBeTruthy();
  }
}

describe("Dice", () => {
  test("should call random provider", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    die.roll();
    fakeRandomProvider.verify();
  });

  test("should return correct random number", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    die.roll();
    expect(die.getValue()).toBe(3);
  });
});
