import { beforeEach, describe, expect, test } from "@jest/globals";
import GameModelImpl from "../../src/model/GameModelImpl";
import D6DiceFactory from "../../src/model/D6DiceFactory";
import Player from "../../src/model/Player";
import type GameModel from "../../src/model/GameModel";

describe("GameModelImpl", () => {
  let gameModel: GameModel;

  beforeEach(() => {
    gameModel = new GameModelImpl(new D6DiceFactory({
      getRandomIntegerInRange: (min: number, max: number): number => 3,
    }));
  });

  test("should return dice with value 3", () => {
    const dice = gameModel.rollDice();
    expect(dice.getValue()).toBe(3);
  });

  test("should add a player to the game", () => {
    const player = new Player("Alice");
    gameModel.addPlayer(player);

    expect(gameModel.getPlayers()[0]).toBe(player);
  });

  test("should return a player who is playing the game", () => {
    const bob = new Player("Bob");
    const alice = new Player("Alice");
    gameModel.addPlayer(bob);
    gameModel.addPlayer(alice);

    const activePlayer = gameModel.getActivePlayer();

    expect([bob, alice]).toContain(activePlayer);
  });

  test("should change active player when 1 is rolled", () => {
    gameModel = new GameModelImpl(new D6DiceFactory({
      getRandomIntegerInRange: (min: number, max: number): number => 1,
    }));
    const bob = new Player("Bob");
    const alice = new Player("Alice");
    gameModel.addPlayer(bob);
    gameModel.addPlayer(alice);
    const activePlayerBefore = gameModel.getActivePlayer();

    // Roll a 1
    gameModel.rollDice();

    const activePlayerAfter = gameModel.getActivePlayer();
    expect(activePlayerBefore).not.toBe(activePlayerAfter);
  });
});