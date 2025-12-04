import { beforeEach, describe, expect, jest, test } from "@jest/globals";
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

    test("should throw error when there are no players", () => {
      gameModel = createMockedGameModel([1], []);

      expect(() => {
        gameModel.getActivePlayer();
      }).toThrow();
    });

    test("should not change active player when there is only one player", () => {
      gameModel = createMockedGameModel([1], createPlayerArray(1));
      const activePlayerBefore = gameModel.getActivePlayer();

      // Roll a 1
      gameModel.rollDice();

      expect(gameModel.getActivePlayer()).toBe(activePlayerBefore);
    });

    test("rolling any number other than 1 should not change the active player", () => {
      gameModel = createMockedGameModel([2, 3, 4, 5, 6], createPlayerArray(2));
      const activePlayerBefore = gameModel.getActivePlayer();

      for (let i = 0; i < 5; i++) {
        gameModel.rollDice();
        expect(gameModel.getActivePlayer()).toBe(activePlayerBefore);
      }
    });

    test("should change active player when a 1 is rolled and there are three players", () => {
      gameModel = createMockedGameModel([1], createPlayerArray(3));
      const listOfActivePlayerEachRound: Player[] = [];

      for (let i = 0; i < 3; i++) {
        gameModel.rollDice();
        listOfActivePlayerEachRound.push(gameModel.getActivePlayer());
      }

      // We expect that all three players have been active at least once after three rounds.
      expect(new Set(listOfActivePlayerEachRound).size).toBe(3);
    });

    test("should go to next player when ending turn", () => {
      gameModel = createMockedGameModel([2], createPlayerArray(2));
      const activePlayerBefore = gameModel.getActivePlayer();

      gameModel.rollDice();
      gameModel.endTurn();

      expect(gameModel.getActivePlayer()).not.toBe(activePlayerBefore);
    });
  });

  describe("score calculation", () => {
    test("should add the sum of the dice rolls this turn to the player's score", () => {
      gameModel = createMockedGameModel([2, 4], createPlayerArray(2));
      const activePlayerBefore = gameModel.getActivePlayer();

      gameModel.rollDice();
      gameModel.rollDice();
      gameModel.endTurn();

      expect(activePlayerBefore.getScore()).toBe(6);
    });

    test("rolling a 1, then rolling a 3, then ending turn should add only 3 to the player's score", () => {
      const player1 = new Player("Player1");
      const player2 = new Player("Player2");
      gameModel = createMockedGameModel([1, 3], [player1, player2]);

      // Roll 1. This ends Player1's turn.
      gameModel.rollDice();
      // Roll 3 for Player2.
      gameModel.rollDice();
      gameModel.endTurn();

      expect(player2.getScore()).toBe(3);
    });
  });

  describe("event listeners", () => {
    let mockListener: jest.Mock;

    beforeEach(() => {
      gameModel = createMockedGameModel([1], createPlayerArray(2));
      mockListener = jest.fn();

      gameModel.addSubscriber("activePlayerChange", mockListener);
    });

    test("should call activePlayerChange event when changing active player", () => {
      // Roll a 1 to change active player
      gameModel.rollDice();

      expect(mockListener).toHaveBeenCalled();
    });

    test("should not call activePlayerChange unless player changes", () => {
      expect(mockListener).not.toHaveBeenCalled();
    });

    test("should not call other event when changing active player", () => {
      const otherMockListener = jest.fn();
      gameModel.addSubscriber("someOtherEvent", otherMockListener);

      // Roll a 1 to change active player
      gameModel.rollDice();

      expect(otherMockListener).not.toHaveBeenCalled();
    });

    test("should call clearTable event rolling a 1", () => {
      const clearTableListener = jest.fn();
      gameModel.addSubscriber("clearTable", clearTableListener);

      // Roll a 1 to change active player
      gameModel.rollDice();

      expect(clearTableListener).toHaveBeenCalled();
    });

    test("should not call clearTable event rolling a non-1", () => {
      const clearTableListener = jest.fn();
      // Roll a non-1 to not change active player
      gameModel = createMockedGameModel([4], createPlayerArray(2));
      gameModel.addSubscriber("clearTable", clearTableListener);

      gameModel.rollDice();

      expect(clearTableListener).not.toHaveBeenCalled();
    });
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

function createPlayerArray(howMany: number): Player[] {
  const players: Player[] = [];
  for (let i = 0; i < howMany; i++) {
    players.push(new Player(`Player ${i + 1}`));
  }
  return players;
}
