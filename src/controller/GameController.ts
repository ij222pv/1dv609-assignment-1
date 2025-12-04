import Dice from "../model/Dice";
import GameModel from "../model/GameModel";
import UI from "../view/UI";

export default class GameController {
  public constructor(private model: GameModel, private view: UI) {}

  public start() {
    this.view.addSubscriber("roll", () => {
      const dice = this.model.rollDice.bind(this.model)();
      this.view.showDice(dice);
    });

    this.model.addSubscriber("activePlayerChange", () => {
      this.view.setActivePlayer(this.model.getActivePlayer().getName());
    });

    this.model.addSubscriber("clearTable", () => {
      this.view.clearDice();
    });

    this.model.addSubscriber("rollDice", (dice: Dice) => {
      this.view.showDice(dice);
    });
  }
}