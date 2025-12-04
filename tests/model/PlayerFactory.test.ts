import { beforeEach, describe, expect, test } from "@jest/globals";
import PlayerFactory from "../../src/model/PlayerFactory";

const PLAYER_NAME = "Alice";

describe("PlayerFactory", () => {
  let factory: PlayerFactory;

  beforeEach(() => {
    factory = new PlayerFactory();
  });

  test("should create player with given name", () => {
    const player = factory.createPlayer(PLAYER_NAME);
    expect(player.getName()).toBe(PLAYER_NAME);
  });
});
