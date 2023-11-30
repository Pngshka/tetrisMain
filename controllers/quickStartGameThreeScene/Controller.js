import ThreeController from "../../utils/scene/containers/ThreeController";
import { InputController } from '../../utils/scene/containers/controllers/counter/input-controller';
import { KeyboardPlugin } from '../../utils/scene/containers/controllers/counter/plugins/KeyboardPlugin';
import { ActivWithKeyCode } from '../../utils/scene/containers/controllers/counter/plugins/ActivWithKeyCode.js';
export default class Controller extends ThreeController {
  constructor(data) {
    super(data);
    let topAktiv = new ActivWithKeyCode("top", true, [38]);
    let leftAktiv = new ActivWithKeyCode("left", true, [37, 65]);
    let rightAktiv = new ActivWithKeyCode("right", true, [39, 68]);
    let downAktiv = new ActivWithKeyCode("down", true, [40]);

    let inputController = new InputController();

    let keyboardPlugin = new KeyboardPlugin(inputController);

    inputController.addPlugin(keyboardPlugin);

    inputController.bindActions(topAktiv);
    inputController.bindActions(leftAktiv);
    inputController.bindActions(rightAktiv);
    inputController.bindActions(downAktiv);

    inputController.attach(document);
  }

}
