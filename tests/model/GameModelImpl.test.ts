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

  test("should not change active player when there is only one player", () => {
    gameModel = createMockedGameModel([1], [new Player("Solo")]);
    const activePlayerBefore = gameModel.getActivePlayer();

    // Roll a 1
    gameModel.rollDice();

    expect(gameModel.getActivePlayer()).toBe(activePlayerBefore);
  });

  test("rolling any number other than 1 should not change the active player", () => {
    gameModel = createMockedGameModel([2, 3, 4, 5, 6], [new Player("Player1"), new Player("Player2")]);
    const activePlayerBefore = gameModel.getActivePlayer();

    for (let i = 0; i < 5; i++) {
      gameModel.rollDice();
      expect(gameModel.getActivePlayer()).toBe(activePlayerBefore);
    }
  });

  test("should change active player when a 1 is rolled and there are three players", () => {
    gameModel = createMockedGameModel([1], [new Player("Player1"), new Player("Player2"), new Player("Player3")]);
    const listOfActivePlayerEachRound: Player[] = [];

    for (let i = 0; i < 3; i++) {
      gameModel.rollDice();
      listOfActivePlayerEachRound.push(gameModel.getActivePlayer());
    }

    // We expect that all three players have been active at least once after three rounds.
    expect(new Set(listOfActivePlayerEachRound).size).toBe(3);
  });

  test("should add the sum of the dice rolls this turn to the player's score", () => {
    gameModel = createMockedGameModel([2, 4], [new Player("Player1"), new Player("Player2")]);
    const activePlayerBefore = gameModel.getActivePlayer();

    gameModel.rollDice();
    gameModel.rollDice();
    gameModel.endTurn();

    expect(activePlayerBefore.getScore()).toBe(6);
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
