import {ActivWithKeyCode} from "./plugins/ActivWithKeyCode";
import {InputController} from "./input-controller";
import {KeyboardPlugin} from "./plugins/KeyboardPlugin";

export default function initializationController(gameControllerTetris){
  const topAktiv = new ActivWithKeyCode("top", true, [38]);
  const leftAktiv = new ActivWithKeyCode("left", true, [37, 65]);
  const rightAktiv = new ActivWithKeyCode("right", true, [39, 68]);
  const downAktiv = new ActivWithKeyCode("down", true, [40]);

  const inputController = new InputController();

  const keyboardPlugin = new KeyboardPlugin(inputController, gameControllerTetris);

  inputController.addPlugin(keyboardPlugin);

  inputController.bindActions(topAktiv);
  inputController.bindActions(leftAktiv);
  inputController.bindActions(rightAktiv);
  inputController.bindActions(downAktiv);

  inputController.attach(document);

}
