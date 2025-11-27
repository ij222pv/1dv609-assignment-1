import type Dice from "./Dice";
import type Player from "./Player";

export default interface GameModel {
  rollDice(): Dice;
  addPlayer(player: Player): void;
  getPlayers(): Player[];
  getActivePlayer(): Player;
}