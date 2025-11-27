import type Dice from "./Dice";
import type DiceFactory from "./DiceFactory";
import type GameModel from "./GameModel";
import type Player from "./Player";

export default class GameModelImpl implements GameModel {
  private players: Player[] = [];
  private activePlayerIndex: number = 0;
  private diceOnTable: Dice[] = [];

  public constructor(private diceFactory: DiceFactory) {}

  public rollDice(): Dice {
    const dice = this.diceFactory.createDice();
    this.handleRoll(dice);
    
    return dice;
  }

  private handleRoll(dice: Dice): void {
    this.diceOnTable.push(dice);

    this.activePlayerIndex++;
    this.activePlayerIndex %= this.players.length;
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getActivePlayer(): Player {
    if (this.players.length === 0) {
      throw new Error("there are no players");
    }

    return this.players[this.activePlayerIndex];
  }

  public endTurn(): void {
    const activePlayer = this.getActivePlayer();
    const score = this.calculateTurnScore();
    activePlayer.addScore(score);
  }
  
  private calculateTurnScore(): number {
    return this.diceOnTable.reduce((sum, dice) => sum + dice.getValue(), 0);
  }
}