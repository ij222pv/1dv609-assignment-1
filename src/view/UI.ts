import EventPublisher from "../EventPublisher";
import Dice from "../model/Dice";

export default interface UI extends EventPublisher {
  showDice(dice: Dice): void;
  setActivePlayer(playerName: string): void;
}
