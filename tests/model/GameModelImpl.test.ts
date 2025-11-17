import { describe, expect, test } from "@jest/globals";
import GameModelImpl from "../../src/model/GameModelImpl";

describe("GameModelImpl", () => {
  test("should return dice with value 3", () => {
    const gameModel = new GameModelImpl({
      getRandomIntegerInRange: (min: number, max: number): number => 3,
    });

    const dice = gameModel.rollDice();
    expect(dice.getValue()).toBe(3);
  });
});