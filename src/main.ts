import GameController from "./controller/GameController";
import D6DiceFactory from "./model/D6DiceFactory";
import GameModelImpl from "./model/GameModelImpl";
import StandardRandomProvider from "./model/StandardRandomProvider";
import BrowserUI from "./view/BrowserUI";

const gameContainer: HTMLElement | null = document.querySelector("#game");
if (!gameContainer) {
  throw new Error("Game container not found");
}

const diceFactory = new D6DiceFactory(new StandardRandomProvider());
const model = new GameModelImpl(diceFactory);
const view = new BrowserUI(gameContainer);
const controller = new GameController(model, view);

controller.start();