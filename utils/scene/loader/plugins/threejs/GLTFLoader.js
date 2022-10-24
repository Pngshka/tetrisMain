import BaseLoader from "../BaseLoader";

export default class GLTFLoader extends BaseLoader {

  static name = "ThreeGLTFLoader"

  load(settings) {
    const {path, fileName} = settings;

    new THREE.GLTFLoader(this.manager).load(`${path}${fileName}`, (data) => {
      // Console.log("GLTF", object );
      //ThreeAssets.parseMaterialsAndTexturesFromSceneFile(object, params);
      //afterLoadActions.push({action: modifyScene, args: [object, fileData, params]});

      this.onLoad(settings, data.scene)
    })
  }
}
