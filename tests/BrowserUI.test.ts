/*
 * @jest-environment jsdom
 */

import { describe, expect, jest, test } from "@jest/globals";
import BrowserUI from "../src/view/BrowserUI";
import Dice from "../src/Dice";

describe("BrowserUI", () => {
  test('should call callback when clicking roll button', () => {
    const gameDiv = document.createElement("div");
    const ui = new BrowserUI(gameDiv);
    const mockCallback = jest.fn();

    ui.addListener("roll", mockCallback);
    gameDiv.querySelector("#roll-button")?.dispatchEvent(new MouseEvent("click"));

    expect(mockCallback).toHaveBeenCalled();
  });

  test('should show dice', () => {
    const gameDiv = document.createElement("div");
    const ui = new BrowserUI(gameDiv);
    const dice = new Dice({ getRandomIntegerInRange: () => 1 });

    dice.roll();
    ui.showDice(dice);

    expect(gameDiv.querySelectorAll("img[class='dice']").length).toBe(1);
  });

  test('should show correct image for dice value', () => {
    const gameDiv = document.createElement("div");
    const ui = new BrowserUI(gameDiv);
    const dice = new Dice({ getRandomIntegerInRange: () => 4 });

    dice.roll();
    ui.showDice(dice);

    expect(gameDiv.querySelector(`img[src='images/dice4.png']`)).not.toBeNull();
  });
});
