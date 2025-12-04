import EventPublisherImpl from "../EventPublisherImpl.ts";
import Dice from "../model/Dice";
import UI from "./UI";
import gameTemplate from "./gameTemplate.html.ts";

export default class BrowserUI implements UI {
  private gameContainer: HTMLElement;
  private eventPublisher = new EventPublisherImpl();
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
    rollButton.addEventListener("click", this.notifySubscribers.bind(this, "roll"));
  }

  private notifySubscribers(eventName: string) {
    this.eventPublisher.notifySubscribers(eventName);
  }
  
  public addSubscriber(eventName: string, callback: Function) {
    this.eventPublisher.addSubscriber(eventName, callback);
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
  }

  public clearDice(): void {
    this.gameContainer.querySelector('#dice-container')!.innerHTML = '';
  }
}
