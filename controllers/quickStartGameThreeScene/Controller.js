import ThreeController from "../../utils/scene/containers/ThreeController";
import { InputController } from '../../utils/scene/containers/controllers/counter/input-controller';
import { KeyboardPlugin } from '../../utils/scene/containers/controllers/counter/plugins/KeyboardPlugin';
import { ActivWithKeyCode } from '../../utils/scene/containers/controllers/counter/plugins/ActivWithKeyCode.js';
export default class Controller extends ThreeController {

  loadingManifest() { }

  initialization() {
    const topAktiv = new ActivWithKeyCode("top", true, [38]);
    const leftAktiv = new ActivWithKeyCode("left", true, [37, 65]);
    const rightAktiv = new ActivWithKeyCode("right", true, [39, 68]);
    const downAktiv = new ActivWithKeyCode("down", true, [40]);

    const inputController = new InputController();

    const keyboardPlugin = new KeyboardPlugin(inputController, this.renderer);

    inputController.addPlugin(keyboardPlugin);

    inputController.bindActions(topAktiv);
    inputController.bindActions(leftAktiv);
    inputController.bindActions(rightAktiv);
    inputController.bindActions(downAktiv);

    inputController.attach(document);
  }

  initLevel() {
  }

  playing() {

  }

}
