import Dice from "../model/Dice";
import UI from "./UI";
import gameTemplate from "./gameTemplate.html.ts";

type Listener = {
  eventName: string,
  callback: Function,
}

export default class BrowserUI implements UI {
  private gameContainer: HTMLElement;
  private listeners: Listener[] = [];
  private static readonly DICE_IMAGE_PATH = "images/dice{value}.png";

  public constructor(gameContainer: HTMLElement) {
    this.gameContainer = gameContainer;
    this.initGameContainer();
  }

  private initGameContainer(): void {
    this.writeTemplateStringToContainer(gameTemplate);
    this.bindRollButton();
  }

  private writeTemplateStringToContainer(templateString: string): void {
    // This is fine because the template is static and doesn't contain any user-provided data
    this.gameContainer.innerHTML = templateString;
  }

  private bindRollButton(): void {
    const rollButton = this.gameContainer.querySelector("#roll-button") as HTMLButtonElement;
    rollButton.addEventListener("click", this.callListener.bind(this, "roll"));
  }

  private callListener(eventName: string) {
    for (const listener of this.listeners) {
      if (listener.eventName !== eventName) {
        return;
      }

      listener.callback();
    }
  }
  
  public addListener(eventName: string, callback: Function) {
    this.listeners.push({eventName, callback});
  }

  public showDice(dice: Dice) {
    const diceImage = document.createElement("img");
    diceImage.setAttribute("class", "dice");
    diceImage.setAttribute("src", BrowserUI.DICE_IMAGE_PATH.replace("{value}", dice.getValue().toString()));
    this.gameContainer.querySelector('#dice-container')!.appendChild(diceImage);
  }

  public setActivePlayer(playerName: string): void {
    const activePlayerText = this.gameContainer.querySelector("#active-player") as HTMLParagraphElement;
    activePlayerText.textContent = `Current player: ${playerName}`;
  }r
}
