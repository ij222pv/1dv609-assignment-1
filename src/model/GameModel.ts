import Dice from "./Dice";

export default interface GameModel {
  rollDice(): Dice;
}