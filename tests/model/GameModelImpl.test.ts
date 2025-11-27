import { beforeEach, describe, expect, test } from "@jest/globals";
import GameModelImpl from "../../src/model/GameModelImpl";
import D6DiceFactory from "../../src/model/D6DiceFactory";
import Player from "../../src/model/Player";
import type GameModel from "../../src/model/GameModel";

describe("GameModelImpl", () => {
  let gameModel: GameModel;

  beforeEach(() => {
    gameModel = createMockedGameModel([3]);
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

  describe("active player", () => {
    let bob = new Player("Bob");
    let alice = new Player("Alice");
    let activePlayerBefore: Player;

    beforeEach(() => {
      gameModel = createMockedGameModel([1], [bob, alice]);
      activePlayerBefore = gameModel.getActivePlayer();
    });

    test("should return a player who is playing the game", () => {
      expect([bob, alice]).toContain(activePlayerBefore);
    });

    test("should change active player when 1 is rolled", () => {
      // Roll a 1
      gameModel.rollDice();

      const activePlayerAfter = gameModel.getActivePlayer();
      expect(activePlayerBefore).not.toBe(activePlayerAfter);
    });

    test("should change active player every time when 1 is rolled multiple times in a row", () => {
      let lastActivePlayer = activePlayerBefore;

      for (let i = 0; i < 10; i++) {
        // Roll a 1
        gameModel.rollDice();
        const currentActivePlayer = gameModel.getActivePlayer();

        expect(currentActivePlayer).not.toBe(lastActivePlayer);
        lastActivePlayer = currentActivePlayer;
      }
    });
  });

  test("should throw error when there are no players", () => {
    expect(() => {
      gameModel.getActivePlayer();
    }).toThrow();
  });
});

function createMockedGameModel(diceResults: number[], players?: Player[]): GameModel {
  let currentDiceIndex = 0;
  const game = new GameModelImpl(new D6DiceFactory({
    getRandomIntegerInRange: (min: number, max: number): number => {
      return diceResults[currentDiceIndex++ % diceResults.length]
    },
  }));

  players?.forEach(player =>
    game.addPlayer(player)
  );

  return game;
}
