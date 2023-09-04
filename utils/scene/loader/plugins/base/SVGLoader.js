import BaseLoader from "../BaseLoader";

export default class SVGLoader extends BaseLoader {

  load(settings) {
    const {path, fileName} = settings;
    const url = `${path}${fileName}`;
    super.load(url);
    this.loadSvg(url).then(xhr => this.onLoad(settings, xhr.responseXML.documentElement));
  }

  loadSvg(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", this.manager.resolveURL(url), false);
      xhr.overrideMimeType("image/svg+xml");
      xhr.onload = () => resolve(xhr);
      xhr.send("");
    });
  }
}
