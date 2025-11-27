import { describe, expect, test } from "@jest/globals";
import GameModelImpl from "../../src/model/GameModelImpl";
import D6DiceFactory from "../../src/model/D6DiceFactory";

describe("GameModelImpl", () => {
  test("should return dice with value 3", () => {
    const gameModel = new GameModelImpl(new D6DiceFactory({
      getRandomIntegerInRange: (min: number, max: number): number => 3,
    }));

    const dice = gameModel.rollDice();
    expect(dice.getValue()).toBe(3);
  });
});