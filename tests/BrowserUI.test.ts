/*
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import BrowserUI from "../src/view/BrowserUI";
import Dice from "../src/Dice";

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

      ui.addListener("roll", mockCallback);
      gameDiv.querySelector("#roll-button")?.dispatchEvent(new MouseEvent("click"));

      expect(mockCallback).toHaveBeenCalled();
    });
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
});
