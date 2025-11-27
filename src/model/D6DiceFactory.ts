import Dice from "./Dice";
import DiceFactory from "./DiceFactory";
import RandomProvider from "./RandomProvider";

export default class D6DiceFactory implements DiceFactory {
  public constructor(private randomProvider: RandomProvider) {}

  public createDice(): Dice {
    return new Dice(this.randomProvider);
  }
}