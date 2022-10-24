import BaseLoader from "../BaseLoader";



export default class GLTFLoader extends BaseLoader {

  static name = "BabylonGLTFLoader"

  load(settings) {
    const {path, fileName} = settings;
    super.load();

    BABYLON.SceneLoader.Append(this.manager.resolveURL(path), fileName, this.data.scene,
      scene => this.onLoad(settings, scene),
    );

  }
}
