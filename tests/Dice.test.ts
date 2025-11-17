import { describe, test, expect } from "@jest/globals";
import Dice from "../src/Dice";
import RandomProvider from "../src/RandomProvider";

class FakeRandomProvider implements RandomProvider {
  public getRandomIntegerInRange(min: number, max: number): number {
    expect(min).toBe(1);
    expect(max).toBe(6);
    return 3;
  }
}

describe("Dice", () => {
  test("should call random provider with correct range", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    die.roll();
  });

  test("should return correct random number", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    die.roll();
    expect(die.getValue()).toBe(3);
  })
});
