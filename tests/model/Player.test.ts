import { describe, expect, test } from "@jest/globals";
import Player from "../../src/model/Player";

describe("Player", () => {
  test("should store name", () => {
    const name = "Alice";

    const sut = new Player(name);

    expect(sut.getName()).toBe(name);
  });

  test("should throw error when name is empty", () => {
    const name = "";

    const sut = () => new Player(name);

    expect(sut).toThrow();
  });

  test("should throw error if name contains only whitespaces", () => {
    const name = " \t\v\f\n\r";

    const sut = () => new Player(name);

    expect(sut).toThrow();
  });
});