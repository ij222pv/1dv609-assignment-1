/*
 * @jest-environment jsdom
 */

import { describe, expect, jest, test } from "@jest/globals";
import BrowserUI from "../src/view/BrowserUI";

describe("BrowserUI", () => {
  test('should call callback when clicking roll button', () => {
    const gameDiv = document.createElement("div");
    const ui = new BrowserUI(gameDiv);
    const mockCallback = jest.fn();

    ui.addListener("roll", mockCallback);
    gameDiv.querySelector("#roll-button")?.dispatchEvent(new MouseEvent("click"));

    expect(mockCallback).toHaveBeenCalled();
  });
});
