import State from "../decorators/state/State";
import {EventDispatcher} from "../events/EventDispatcher";
import SceneController from "../containers/SceneController";
import {CustomData} from "../data/CustomData";

export default class BaseWrapper {

  decorators = [State];

  eventBus = new EventDispatcher();

  storage = new CustomData();

  constructor() {

    this.readyPromise = new Promise(resolve => this.readyResolver = resolve);
  }

  init() {
    this.controller = this.initController();

    this.decorators.forEach((Decorator) => new Decorator(this));
    this.readyResolver({
      events: this.eventBus
    });

    this.controller.init();
  }


  appendContainer(container) {
    this.controller.appendContainer?.(container);
  }

  initController() {
    const {eventBus, storage} = this;

    return new SceneController({eventBus, storage});
  }
}
