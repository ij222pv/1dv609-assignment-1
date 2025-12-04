import EventPublisher from "../EventPublisher";
import type Dice from "./Dice";
import type Player from "./Player";

export default interface GameModel extends EventPublisher {
  rollDice(): void;
  addPlayer(player: Player): void;
  getPlayers(): Player[];
  getActivePlayer(): Player;
  endTurn(): void;
}