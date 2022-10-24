import Loader from "../loader/Loader";
import AssetsManager from "../loader/plugins/AssetsManager";

export default class SceneController {

  manifest;

  storage;

  eventBus;

  container;

  state;

  constructor({storage, eventBus} = {}) {

    this.onLoad = this.onLoad.bind(this);
    this.onManifestLoaded = this.onManifestLoaded.bind(this);
    this.update = this.update.bind(this);

    this.storage = storage;
    this.eventBus = eventBus;
  }

  appendContainer(container) {
    this.container = container;
    this.eventBus.dispatchEvent({type: "scene-controller:append", data: {container}})
  }

  update() {
  }

  loadSelect() {
    return Loader.load(this.storage.preload, {onLoad: this.onLoad})
  }

  onLoad() {
  }

  loadManifestSelect() {
    return Loader.load([{
      subtype: "base",
      type: "json",
      name: "settings",
      url: this.storage.manifestLink
    }], {onLoad: this.onManifestLoaded})
  }

  onManifestLoaded() {
    this.storage.data = AssetsManager.getAssetFromLib("settings", "json");
  }
}
