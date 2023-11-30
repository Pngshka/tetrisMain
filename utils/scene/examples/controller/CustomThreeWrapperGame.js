import ThreeWrapper from "../../wrappers/threejs/ThreeWrapper";
import Data from "../data/DataGame";

export default class CustomThreeWrapper extends ThreeWrapper {

  storage = new Data();

  static get instance() {
    if (!this._instance) this._instance = new CustomThreeWrapper();

    return this._instance;
  }

  static _instance = null;
}
