import Dice from "./Dice";
import DiceFactory from "./DiceFactory";
import GameModel from "./GameModel";

export default class GameModelImpl implements GameModel {
  public constructor(private diceFactory: DiceFactory) {}

  public rollDice(): Dice {
    const dice = this.diceFactory.createDice();
    dice.roll();
    return dice;
  }
}