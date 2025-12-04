import Dice from "../model/Dice";
import GameModel from "../model/GameModel";
import Player from "../model/Player";
import UI from "../view/UI";

export default class GameController {
  public constructor(private model: GameModel, private view: UI) {}

  public start() {
    this.view.addSubscriber("roll", () => {
      this.model.rollDice.bind(this.model)();
    });

    this.model.addSubscriber("activePlayerChange", () => {
      this.view.setActivePlayer(this.model.getActivePlayer().getName());
    });

    this.model.addSubscriber("clearTable", () => {
      this.view.clearDice();
    });

    this.model.addSubscriber("diceRolled", (dice: Dice) => {
      this.view.showDice(dice);
    });

    this.view.addSubscriber("addPlayer", (name: string) => {
      this.model.addPlayer(new Player(name));
    });
  }
}