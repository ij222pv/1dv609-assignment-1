import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import GameController from "../../src/controller/GameController";
import UI from "../../src/view/UI";
import Dice from "../../src/model/Dice";
import GameModel from "../../src/model/GameModel";
import RandomProvider from "../../src/model/RandomProvider";

class FakeUI implements UI {
  private listeners: { eventName: string; callback: Function }[] = [];

  public addListener = jest.fn((eventName: string, callback: Function): void => {
    this.listeners.push({ eventName, callback });
  });

  public showDice = jest.fn((dice: Dice): void => {});

  public callRollListeners(): void {
    const rollListeners = this.listeners.filter(l => l.eventName === "roll");
    for (const listener of rollListeners) {
      listener.callback();
    }
  }
}

class MockGameModel implements GameModel {
  rollDice = jest.fn((): Dice => {
    return new Dice({
      getRandomIntegerInRange: (min: number, max: number): number => 1,
    });
  });
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
    expect(view.addListener).toHaveBeenCalledWith("roll", expect.any(Function));
  });

  test("should call model.rollDice when roll event is triggered", () => {
    // Simulate the roll event being triggered
    view.callRollListeners();

    expect(model.rollDice).toHaveBeenCalled();
  });

  test("should bind the correct this context for model.rollDice", () => {
    // Simulate the roll event being triggered
    view.callRollListeners();

    expect(model.rollDice.mock.contexts).toContain(model);
  });
});