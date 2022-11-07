import BaseLoader from "../BaseLoader";

export default class TextureLoader extends BaseLoader {

  static name = "ThreeTextureLoader"

  load(settings) {
    const {path, fileName} = settings;
    const url = this.manager.resolveURL(`${path}${fileName}`);

    super.load(url);

    new THREE.TextureLoader(this.manager).load(url, (texture) => {
      this.onLoad(settings, texture);
    })
  }
}
