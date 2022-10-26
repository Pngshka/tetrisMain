import PixiWrapper from "../../wrappers/pixi/PixiWrapper";
import Data from "../data/Data";

export default class PixiController extends PixiWrapper {

  storage = new Data();

  static get instance() {
    if (!this._instance) this._instance = new PixiController();

    return this._instance;
  }

  static _instance = null;

}
