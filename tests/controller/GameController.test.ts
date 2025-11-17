import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import GameController from "../../src/controller/GameController";
import UI from "../../src/view/UI";
import Dice from "../../src/model/Dice";
import GameModel from "../../src/model/GameModel";

class MockUI implements UI {
  public addListener = jest.fn((eventName: string, listener: Function): void => {});
  public showDice = jest.fn((dice: Dice): void => {});
}

class MockGameModel implements GameModel {
  rollDice = jest.fn((): Dice => new Dice({ getRandomIntegerInRange: (min: number, max: number): number => 1 }));
}

describe("GameController", () => {
  test("should add roll listener", () => {
    const model = new MockGameModel();
    const view = new MockUI();
    const controller = new GameController(model, view);

    controller.start();

    expect(view.addListener).toHaveBeenCalledWith("roll", expect.any(Function));
  });
});