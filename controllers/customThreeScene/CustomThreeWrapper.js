import ThreeWrapper from "../../utils/scene/wrappers/threejs/ThreeWrapper";
import Data from "./Data";
import CustomThreeScene from "./CustomThreeScene";

export default class CustomThreeWrapper extends ThreeWrapper {

  storage = new Data();

  static get instance() {
    if (!this._instance) this._instance = new CustomThreeWrapper();

    return this._instance;
  }

  static _instance = null;

  initController() {
    const {eventBus, storage} = this;

    return new CustomThreeScene({eventBus, storage});
  }
}
