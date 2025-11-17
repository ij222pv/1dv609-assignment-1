import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import Dice from "../../src/model/Dice";
import RandomProvider from "../../src/model/RandomProvider";

class MockRandomProvider implements RandomProvider {
  public getRandomIntegerInRange = jest.fn((min, max) => 3);
}

describe("Dice", () => {
  let mockRandomProvider: MockRandomProvider;
  let die: Dice;

  beforeEach(() => {
    mockRandomProvider = new MockRandomProvider();
    die = new Dice(mockRandomProvider);
  });

  test("should call random provider on roll", () => {
    die.roll();
    expect(mockRandomProvider.getRandomIntegerInRange).toHaveBeenCalled();
  });

  test("should return number retrieved from injected RandomProvider", () => {
    die.roll();
    expect(die.getValue()).toBe(3);
  });

  test("should have a value before rolling", () => {
    expect(die.getValue()).toBeDefined();
  });
});
