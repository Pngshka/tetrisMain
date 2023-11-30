import { InputController } from './input-controller.js';
import { KeyboardPlugin } from './plugins/KeyboardPlugin.js';
//import { MousePlugin } from './plugins/MousePlugin.js';
import { ActivWithKeyCode } from './plugins/ActivWithKeyCode.js';
//import { ActivWithMouseCode } from './plugins/ActivWithMouseCode.js';
import GameControllerTetris from './Tetris/GameControllerTetris.js'

let topAktiv = new ActivWithKeyCode("top", true, [38]);
let leftAktiv = new ActivWithKeyCode("left", true, [37, 65]);
let rightAktiv = new ActivWithKeyCode("right", true, [39, 68]);
let downAktiv = new ActivWithKeyCode("down", true, [40]);
// let jumpSecondAktiv = new ActivWithMouseCode("jump", true, [2]);
// let leftSecondAktiv = new ActivWithMouseCode("left", true, [1]);
// let rightSecondAktiv = new ActivWithMouseCode("right", true, [3]);

let inputController = new InputController();

let keyboardPlugin = new KeyboardPlugin(inputController);
//let mousePlugin = new MousePlugin(inputController);

inputController.addPlugin(keyboardPlugin);
//inputController.addPlugin(mousePlugin);

inputController.bindActions(topAktiv);
inputController.bindActions(leftAktiv);
inputController.bindActions(rightAktiv);
inputController.bindActions(downAktiv);
// inputController.bindActions(jumpSecondAktiv);
// inputController.bindActions(leftSecondAktiv);
// inputController.bindActions(rightSecondAktiv);

inputController.attach(document);