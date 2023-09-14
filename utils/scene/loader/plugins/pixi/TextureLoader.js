import BaseLoader from "../BaseLoader";

/**
 *   {
 *     "subtype": "pixijs",
 *     "type": "texture",
 *     "name": "texture", - name for getting from AssetsManager
 *     "path": "assets/textures/", - path to asset's folder
 *     "fileName": "texture.png" - asset's file name
 *   }
 */
export default class TextureLoader extends BaseLoader {

  static name = "PixiTextureLoader";

  load(settings) {
    const {path, fileName} = settings;
    const loader = new PIXI.Loader();
    const url = this.manager.resolveURL(`${path}${fileName}`);
    super.load(url)

    loader.add(settings.name, url)
    loader.load((loader, resources) => this.onLoad(settings, resources[settings.name].texture));
  }
}
