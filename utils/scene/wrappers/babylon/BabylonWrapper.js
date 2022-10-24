import State from "../../decorators/state/State";
import BabylonResize from "../../decorators/resize/BabylonResize";
import BaseWrapper from "../BaseWrapper";
import ThreeController from "../../containers/ThreeController";

export default class BabylonWrapper extends BaseWrapper {

  decorators = [State, BabylonResize];

  initController() {
    const {eventBus, storage} = this;

    return new ThreeController({eventBus, storage});
  }
}
