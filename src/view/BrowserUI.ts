import UI from "./UI";

type Listener = {
  eventName: string,
  callback: Function,
}

export default class BrowserUI implements UI {
  private listeners: Listener[] = [];

  constructor(gameContainer: HTMLElement) {
    this.initGameContainer(gameContainer);
  }

  private initGameContainer(gameContainer: HTMLElement) {
    const rollButton = document.createElement("button");
    rollButton.setAttribute("id", "roll-button");
    rollButton.addEventListener("click", this.callListener.bind(this, "roll"));
    gameContainer.appendChild(rollButton);
  }
  
  public addListener(eventName: string, callback: Function) {
    this.listeners.push({eventName, callback});
  }

  public callListener(eventName: string) {
    for (const listener of this.listeners) {
      if (listener.eventName !== eventName) {
        return;
      }

      listener.callback();
    }
  }
}
