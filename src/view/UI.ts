import Dice from "../model/Dice";

export default interface UI {
  addListener(eventName: string, listener: Function): void;
  showDice(dice: Dice): void;
  setActivePlayer(playerName: string): void;
}
