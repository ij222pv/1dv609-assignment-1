/*
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import BrowserUI from "../../src/view/BrowserUI";
import Dice from "../../src/model/Dice";

describe("BrowserUI", () => {
  let gameDiv: HTMLElement;
  let ui: BrowserUI;

  beforeEach(() => {
    gameDiv = document.createElement("div");
    ui = new BrowserUI(gameDiv);
  });

  describe("roll button", () => {
    test('should call callback when clicking roll button', () => {
      const mockCallback = jest.fn();

      ui.addSubscriber("roll", mockCallback);
      gameDiv.querySelector("#roll-button")?.dispatchEvent(new MouseEvent("click"));

      expect(mockCallback).toHaveBeenCalled();
    });

    test('should contain a text', () => {
      const rollButton = gameDiv.querySelector("#roll-button");
      expect(rollButton?.textContent).not.toBe("");
    })
  });

  describe("showDice", () => {
    test('should show image with "dice" class', () => {
      showDiceWithValue(1);
      expect(gameDiv.querySelectorAll("img[class='dice']").length).toBe(1);
    });

    test('should show correct image for dice value', () => {
      showDiceWithValue(4);
      expect(gameDiv.querySelector(`img[src='images/dice4.png']`)).not.toBeNull();
    });
  });

  function showDiceWithValue(value: number): void {
    const dice = new Dice({ getRandomIntegerInRange: () => value });
    ui.showDice(dice);
  }

  test("should not call listener for different event", () => {
    const mockCallback = jest.fn();

    ui.addSubscriber("someOtherEvent", mockCallback);
    // This will trigger the "roll" event
    gameDiv.querySelector("#roll-button")?.dispatchEvent(new MouseEvent("click"));

    expect(mockCallback).not.toHaveBeenCalled();
  });

  test("should display current active player", () => {
    const playerName = "Alice";
    ui.setActivePlayer(playerName);

    const activePlayerDiv = gameDiv.querySelector("#active-player");
    expect(activePlayerDiv?.textContent).toContain(playerName);
  });
});
