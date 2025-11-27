import type Dice from "./Dice";
import type DiceFactory from "./DiceFactory";
import type GameModel from "./GameModel";
import type Player from "./Player";

export default class GameModelImpl implements GameModel {
  private players: Player[] = [];
  private activePlayerIndex: number = 0;

  public constructor(private diceFactory: DiceFactory) {}

  public rollDice(): Dice {
    const dice = this.diceFactory.createDice();
    dice.roll();
    this.activePlayerIndex = 1;
    return dice;
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getActivePlayer(): Player {
    return this.players[this.activePlayerIndex];
  }
}