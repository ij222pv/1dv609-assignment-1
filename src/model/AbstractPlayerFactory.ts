import Player from "./Player";

export default interface AbstractPlayerFactory {
  createPlayer(name: string): Player;
}
