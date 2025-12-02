import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import GameController from "../../src/controller/GameController";
import UI from "../../src/view/UI";
import Dice from "../../src/model/Dice";
import GameModel from "../../src/model/GameModel";
import Player from "../../src/model/Player";

const PLAYER_NAME = "Player Name";

class FakeUI implements UI {
  public addSubscriber = jest.fn((eventName: string, callback: Function): void => {});

  public showDice = jest.fn((dice: Dice): void => {});

  public callRollListeners(): void {
    const rollListeners = this.addSubscriber.mock.calls.filter(l => l[0] === "roll");
    for (const listener of rollListeners) {
      // Call the callback
      listener[1]();
    }
  }

  public setActivePlayer = jest.fn((playerName: string): void => {});
}

class MockGameModel implements GameModel {
  rollDice = jest.fn((): Dice => {
    return new Dice({
      getRandomIntegerInRange: (min: number, max: number): number => 1,
    });
  });

  addPlayer(player: Player): void {}
  getPlayers(): Player[] { return []; }
  getActivePlayer(): Player { return new Player(PLAYER_NAME);}
  endTurn(): void {}
  addSubscriber = jest.fn((eventName: string, callback: Function) => {});

  callActivePlayerChangeListeners(): void {
    const filteredListeners = this.addSubscriber.mock.calls.filter(l => l[0] === "activePlayerChange");
    for (const listener of filteredListeners) {
      // Call the callback
      listener[1]();
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
    controller = new GameController(model, view);

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
      view.callRollListeners();
    });

    test("should call model.rollDice when roll event is triggered", () => {
      expect(model.rollDice).toHaveBeenCalled();
    });

    test("should bind the correct this context for model.rollDice", () => {
      expect(model.rollDice.mock.contexts).toContain(model);
    });

    test("should call UI.showDice with the Dice returned from model.rollDice", () => {
      const returnedDice = model.rollDice.mock.results[0].value as Dice;
      expect(view.showDice).toHaveBeenCalledWith(returnedDice);
    });
  });

  describe("activePlayerChange event", () => {
    test("should call view.setActivePlayer when active player changes", () => {
      // Simulate the activePlayerChange event being triggered
      model.callActivePlayerChangeListeners();

      expect(view.setActivePlayer).toHaveBeenCalledWith(PLAYER_NAME);
    });
  });
});