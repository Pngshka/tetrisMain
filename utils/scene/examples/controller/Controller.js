import ThreeWrapper from "../../wrappers/threejs/ThreeWrapper";

export default class Controller extends ThreeWrapper {

  static get instance() {
    if (!this._instance) this._instance = new Controller();

    return this._instance;
  }

  static _instance = null;
}
