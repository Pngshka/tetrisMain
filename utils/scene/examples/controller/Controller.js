import ThreeWrapper from "../../wrappers/threejs/ThreeWrapper";
import Data from "../data/Data";

export default class Controller extends ThreeWrapper {

  storage = new Data();

  static get instance() {
    if (!this._instance) this._instance = new Controller();

    return this._instance;
  }

  static _instance = null;
}
