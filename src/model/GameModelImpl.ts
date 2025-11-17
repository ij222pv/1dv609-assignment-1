import Dice from "./Dice";
import GameModel from "./GameModel";
import RandomProvider from "./RandomProvider";

export default class GameModelImpl implements GameModel {
  public constructor(private randomProvider: RandomProvider) {}

  public rollDice(): Dice {
    return new Dice(this.randomProvider);
  }
}