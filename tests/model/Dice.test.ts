import { describe, test, expect, jest } from "@jest/globals";
import Dice from "../../src/model/Dice";
import RandomProvider from "../../src/model/RandomProvider";

class FakeRandomProvider implements RandomProvider {
  public getRandomIntegerInRange = jest.fn((min, max) => 3);
}

describe("Dice", () => {
  test("should call random provider on roll", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    die.roll();
    expect(fakeRandomProvider.getRandomIntegerInRange).toHaveBeenCalled();
  });

  test("should return number retrieved from injected RandomProvider", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    die.roll();
    expect(die.getValue()).toBe(3);
  });

  test("should have a value before rolling", () => {
    const fakeRandomProvider = new FakeRandomProvider();
    const die = new Dice(fakeRandomProvider);
    expect(die.getValue()).toBeDefined();
  });
});
