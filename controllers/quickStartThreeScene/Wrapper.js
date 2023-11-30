import ThreeWrapper from "../../utils/scene/wrappers/threejs/ThreeWrapper";
import Data from "./Data";
import Controller from "./Controller";

export default class Wrapper extends ThreeWrapper {

  storage = new Data();

  static get instance() {
    if (!this._instance) this._instance = new Wrapper();

    // console.log( this._instance)
    // debugger

    return this._instance;
  }

  static _instance = null;

  initController() {
    const {eventBus, storage} = this;

    return new Controller({eventBus, storage});
  }
}
