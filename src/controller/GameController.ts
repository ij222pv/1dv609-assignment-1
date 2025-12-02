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
  }
}