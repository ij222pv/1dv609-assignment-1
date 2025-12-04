import EventPublisherImpl from "../EventPublisherImpl";
import type Dice from "./Dice";
import type DiceFactory from "./DiceFactory";
import type GameModel from "./GameModel";
import type Player from "./Player";

type Listener = {
  eventName: string,
  callback: Function,
}

export default class GameModelImpl implements GameModel {
  private players: Player[] = [];
  private activePlayerIndex: number = 0;
  private diceOnTable: Dice[] = [];
  private eventPublisher: EventPublisherImpl = new EventPublisherImpl();

  public constructor(private diceFactory: DiceFactory) {}

  public rollDice(): Dice {
    const dice = this.diceFactory.createDice();
    this.handleRoll(dice);
    this.callListeners("diceRolled");
    return dice;
  }

  private handleRoll(dice: Dice): void {
    this.diceOnTable.push(dice);

    if (dice.getValue() === 1) {
      this.goToNextPlayer();
      this.diceOnTable = [];
      this.callListeners("clearTable");
    }
  }

  private goToNextPlayer(): void {
    this.activePlayerIndex++;
    this.activePlayerIndex %= this.players.length;
    this.callListeners("activePlayerChange");
  }

  private callListeners(eventName: string): void {
    this.eventPublisher.notifySubscribers(eventName);
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

    this.goToNextPlayer();
  }
  
  private calculateTurnScore(): number {
    return this.diceOnTable.reduce((sum, dice) => sum + dice.getValue(), 0);
  }

  public addSubscriber(eventName: string, callback: Function): void {
    this.eventPublisher.addSubscriber(eventName, callback);
  }
}