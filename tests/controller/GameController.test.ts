import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import GameController from "../../src/controller/GameController";
import UI from "../../src/view/UI";
import Dice from "../../src/model/Dice";
import GameModel from "../../src/model/GameModel";
import Player from "../../src/model/Player";
import PlayerFactory from "../../src/model/PlayerFactory";

const PLAYER_NAME = "Player Name";

class FakeUI implements UI {
  addSubscriber = jest.fn((eventName: string, callback: Function): void => {});

  showDice = jest.fn((dice: Dice): void => {});

  dispatchEvent(eventName: string, ...args: any[]): void {
    const filteredListeners = this.addSubscriber.mock.calls.filter(l => l[0] === eventName);
    for (const listener of filteredListeners) {
      // Call the callback
      listener[1](...args);
    }
  }

  setActivePlayer = jest.fn((playerName: string): void => {});
  clearDice = jest.fn((): void => {});
}

class MockGameModel implements GameModel {
  rollDice = jest.fn((): Dice => {
    return new Dice({
      getRandomIntegerInRange: (min: number, max: number): number => 1,
    });
  });

  addPlayer = jest.fn((player: Player): void => {});
  getPlayers(): Player[] { return []; }
  getActivePlayer(): Player { return new Player(PLAYER_NAME);}
  endTurn(): void {}
  addSubscriber = jest.fn((eventName: string, callback: Function) => {});

  dispatchEvent(eventName: string, ...args: any[]): void {
    const filteredListeners = this.addSubscriber.mock.calls.filter(l => l[0] === eventName);
    for (const listener of filteredListeners) {
      // Call the callback
      listener[1](...args);
    }
  }
}

describe("GameController", () => {
  let model: MockGameModel;
  let view: FakeUI;
  let controller: GameController;
  
  beforeEach(() => {
    model = new MockGameModel();
    view = new FakeUI();
    controller = new GameController(model, view, new PlayerFactory());

    controller.start();
  });

  test("should add roll listener", () => {
    expect(view.addSubscriber).toHaveBeenCalledWith("roll", expect.any(Function));
  });

  test("should add activePlayerChange listener", () => {
    expect(model.addSubscriber).toHaveBeenCalledWith("activePlayerChange", expect.any(Function));
  });

  describe("roll event", () => {
    beforeEach(() => {
      // Simulate the roll event being triggered
      view.dispatchEvent("roll");
    });

    test("should call model.rollDice when roll event is triggered", () => {
      expect(model.rollDice).toHaveBeenCalled();
    });

    test("should bind the correct this context for model.rollDice", () => {
      expect(model.rollDice.mock.contexts).toContain(model);
    });
  });

  describe("activePlayerChange event", () => {
    test("should call view.setActivePlayer when active player changes", () => {
      // Simulate the activePlayerChange event being triggered
      model.dispatchEvent("activePlayerChange");

      expect(view.setActivePlayer).toHaveBeenCalledWith(PLAYER_NAME);
    });
  });

  describe("clearTable event", () => {
    test("should call view.clearDice when clearTable event is triggered", () => {
      model.dispatchEvent("clearTable");

      expect(view.clearDice).toHaveBeenCalled();
    });
  });

  describe("diceRolled event", () => {
    test("should run view.showDice when diceRolled event is triggered", () => {
      model.dispatchEvent("diceRolled");

      expect(view.showDice).toHaveBeenCalled();
    });
  });

  describe("addPlayer event", () => {
    test("should call model.addPlayer when addPlayer event is triggered", () => {
      view.dispatchEvent("addPlayer", PLAYER_NAME);

      const namePassedToModel = model.addPlayer.mock.calls[0][0].getName();
      expect(model.addPlayer).toHaveBeenCalled();
      expect(namePassedToModel).toBe(PLAYER_NAME);
    });

    test("should call mocked player factory to create player", () => {
      const mockPlayerFactory = {
        createPlayer: jest.fn((name: string) => new Player(name))
      };
      controller = new GameController(model, view, mockPlayerFactory);
      controller.start();

      view.dispatchEvent("addPlayer", PLAYER_NAME);

      expect(mockPlayerFactory).toHaveBeenCalledWith(PLAYER_NAME);
    });
  });
});