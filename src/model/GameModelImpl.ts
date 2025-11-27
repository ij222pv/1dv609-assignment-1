import type Dice from "./Dice";
import type DiceFactory from "./DiceFactory";
import type GameModel from "./GameModel";
import Player from "./Player";

export default class GameModelImpl implements GameModel {
  private players: Player[] = [];

  public constructor(private diceFactory: DiceFactory) {}

  public rollDice(): Dice {
    const dice = this.diceFactory.createDice();
    dice.roll();
    return dice;
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public getPlayers(): Player[] {
    return this.players;
  }
}