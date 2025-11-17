import { describe, test, expect, jest } from "@jest/globals";
import Dice from "../src/Dice";
import RandomProvider from "../src/RandomProvider";

class FakeRandomProvider implements RandomProvider {
  public getRandomIntegerInRange = jest.fn((min, max) => 3);
}

describe("Dice", () => {
  test("should call random provider", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    die.roll();
    expect(fakeRandomProvider.getRandomIntegerInRange).toHaveBeenCalled();
  });

  test("should return correct random number", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    die.roll();
    expect(die.getValue()).toBe(3);
  });

  test("should have a value even before rolling", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    expect(die.getValue()).toBeDefined();
  });
});
