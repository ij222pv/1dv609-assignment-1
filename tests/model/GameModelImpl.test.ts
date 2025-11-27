import { describe, expect, test } from "@jest/globals";
import GameModelImpl from "../../src/model/GameModelImpl";
import D6DiceFactory from "../../src/model/D6DiceFactory";
import Player from "../../src/model/Player";

describe("GameModelImpl", () => {
  test("should return dice with value 3", () => {
    const gameModel = new GameModelImpl(new D6DiceFactory({
      getRandomIntegerInRange: (min: number, max: number): number => 3,
    }));

    const dice = gameModel.rollDice();
    expect(dice.getValue()).toBe(3);
  });

  test("should add a player to the game", () => {
    const gameModel = new GameModelImpl(new D6DiceFactory({
      getRandomIntegerInRange: (min: number, max: number): number => 1,
    }));

    const player = new Player("Alice");
    gameModel.addPlayer(player);

    expect(gameModel.getPlayers()[0]).toBe(player);
  });
});