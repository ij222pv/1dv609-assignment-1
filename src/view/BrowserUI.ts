import UI from "./UI";

type Listener = {
  eventName: string,
  callback: Function,
}

export default class BrowserUI implements UI {
  private gameContainer: HTMLElement;
  private listeners: Listener[] = [];

  public constructor(gameContainer: HTMLElement) {
    this.gameContainer = gameContainer;
    this.initGameContainer();
  }

  private initGameContainer() {
    this.gameContainer.appendChild(this.createRollButton());
  }

  private createRollButton(): HTMLElement {
    const rollButton = document.createElement("button");
    rollButton.setAttribute("id", "roll-button");
    rollButton.addEventListener("click", this.callListener.bind(this, "roll"));
    return rollButton;
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

  public showDice(value: number) {
    const diceImage = document.createElement("img");
    diceImage.setAttribute("class", "dice");
    this.gameContainer.appendChild(diceImage);
  }
}
