import AbstractPlayerFactory from "./AbstractPlayerFactory";
import Player from "./Player";

export default class PlayerFactory implements AbstractPlayerFactory {
  createPlayer(name: string): Player {
    return new Player(name);
  }
}