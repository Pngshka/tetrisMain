import {postprocessingList} from "../plugins/postprocessing/list";

export default class LoadingManager {

  itemsTotal = 0;

  itemsLoaded = 0;

  isLoading = false;

  promise;

  _loadingList = [];

  _loadedList = [];

  _loaders = {};

  _loadResolve;

  constructor({onLoad, onStart, onProgress, onError} = {}) {

    this.onStart = onStart;
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;

    this.promise = new Promise(resolve => this._loadResolve = resolve);
  }

  addLoader(Cls, loader) {
    if (Cls.name)
      this._loaders[Cls.name] = loader
  }

  getLoader(Cls) {
    return Cls?.name ? this._loaders[Cls.name] : null;
  }

  itemStart(url) {
    url = this.resolveURL(url);

    if (url) {
      if (this._loadingList.includes(url)) return;
      this._loadingList.push(url);
      this.itemsTotal++;
    }

    if (!this.isLoading && typeof this.onStart === "function") {
      this.onStart(this.getStatusData());
    }


    this.isLoading = true;
  }

  itemEnd(settings, resource, loader) {

    if (!resource) return;

    this.itemsLoaded++;

    this._loadedList.push({settings, resource, loader});

    if (typeof this.onProgress === "function")
      this.onProgress({itemsLoaded: this.itemsLoaded, itemsTotal: this.itemsTotal});

    if (this.itemsLoaded === this.itemsTotal) {

      this._loadedList.forEach(data => {
        postprocessingList.forEach(postprocessing => {
          if (postprocessing.check(data))
            postprocessing.apply(data);
        });
      });

      this.isLoading = false;

      if (typeof this.onLoad === "function")
        this.onLoad(this.getStatusData());

      this._loadResolve();
    }
  }

  resolveURL(url) {
    return `${url.indexOf(global.ASSETS_PREFIX) !== 0 && global.ASSETS_PREFIX ? global.ASSETS_PREFIX : ""}${url}`;
  }

  itemError(data) {
    if (typeof this.onError === "function")
      this.onError(data);
  }

  getStatusData() {
    return {itemsLoaded: this.itemsLoaded, itemsTotal: this.itemsTotal};
  }
}
