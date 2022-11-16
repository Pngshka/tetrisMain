import BaseLoader from "../BaseLoader";


export default class GLTFLoader extends BaseLoader {

  static name = "BabylonGLTFLoader"

  load(settings) {
    const {path, fileName} = settings;
    const url = this.manager.resolveURL(path);

    super.load(url);

    BABYLON.SceneLoader.ImportMesh("", url, fileName, undefined,
      scene =>  this.onLoad(settings, scene),
    );

  }
}
